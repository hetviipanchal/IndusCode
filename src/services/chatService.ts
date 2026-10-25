import { GoogleGenAI } from '@google/genai';
import { dbStore } from './dbStore';
import { Product, Supplier, SupplierListing } from '../types';

export type QueryLanguage = 'hindi' | 'hinglish' | 'english';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  matchedProducts?: Product[];
  companionProducts?: Product[];
  suggestedActions?: {
    label: string;
    action: 'navigate' | 'select_product' | 'search';
    targetTab?: string;
    product?: Product;
    searchQuery?: string;
  }[];
  modelUsed?: 'gemini-2.5-flash' | 'grounded-engine';
  languageDetected?: QueryLanguage;
}

export interface CompanionItem {
  product: Product;
  relationship: string;
  relationshipHindi?: string;
  relationshipHinglish?: string;
  whyBuyTogether: string;
  whyBuyTogetherHindi?: string;
  whyBuyTogetherHinglish?: string;
  typicalBuyRatio: string;
  typicalBuyRatioHindi?: string;
  typicalBuyRatioHinglish?: string;
  listings?: { listing: SupplierListing; supplier: Supplier }[];
  minPrice?: number;
}

export interface GroundedContext {
  products: Product[];
  enrichedInfo: {
    product: Product;
    listings: { listing: SupplierListing; supplier: Supplier }[];
    minPrice?: number;
    maxPrice?: number;
    storageLocation?: string;
  }[];
  matchedSuppliers: Supplier[];
  companionRecommendations: CompanionItem[];
  detectedLanguage: QueryLanguage;
  detectedVernacularTerms: string[];
  contextSummaryText: string;
}

// Helper to retrieve user-configured or env API key
export function getGeminiApiKey(): string {
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('indus_gemini_api_key');
    if (localKey && localKey.trim()) return localKey.trim();
  }

  // Vite environment variables
  const envKey =
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    (import.meta as any).env?.GEMINI_API_KEY ||
    '';
  return envKey.trim();
}

export function setGeminiApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    if (key.trim()) {
      localStorage.setItem('indus_gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('indus_gemini_api_key');
    }
  }
}

/**
 * Detects whether the query is in Hindi (Devanagari), Hinglish (Romanized Hindi), or English
 */
export function detectQueryLanguage(text: string): QueryLanguage {
  // Check for Devanagari Unicode block (U+0900 to U+097F)
  if (/[\u0900-\u097F]/.test(text)) {
    return 'hindi';
  }

  const hinglishMarkers = [
    'kahan', 'kaha', 'kidhar', 'chahiye', 'chahie', 'milega', 'milegi', 'aur', 'sath',
    'saath', 'me', 'mai', 'bhi', 'kya', 'hai', 'hain', 'dikhao', 'batao', 'ka', 'ki', 'ke',
    'gitti', 'dhibri', 'dhebri', 'dibri', 'pech', 'tala', 'taala', 'kabja', 'kabje', 'bhav',
    'rate', 'kitna', 'lagta', 'lagti', 'khareedte', 'kharidte', 'kharidna', 'khareedna',
    'lakdi', 'paani', 'kohni', 'darwaza', 'keel', 'pata', 'bataiye', 'karo', 'hoga',
    'wala', 'wali', 'wale', 'gala', 'kala'
  ];

  const lower = text.toLowerCase();
  const tokens = lower.split(/[^a-z0-9]+/);
  const matchCount = tokens.filter(t => hinglishMarkers.includes(t)).length;

  if (
    matchCount >= 1 ||
    lower.includes('gala bolt') ||
    lower.includes('kala bolt') ||
    lower.includes('gitti') ||
    lower.includes('dhibri') ||
    lower.includes('lakdi')
  ) {
    return 'hinglish';
  }

  return 'english';
}

/**
 * Multilingual Hardware Normalizer: Maps Hindi (Devanagari) & Hinglish vernacular terms to canonical hardware tokens
 */
export function normalizeMultilingualHardwareQuery(query: string): {
  normalizedQuery: string;
  detectedTerms: string[];
  detectedLanguage: QueryLanguage;
} {
  const language = detectQueryLanguage(query);
  let text = query.toLowerCase();

  const detectedTerms: string[] = [];

  // Vernacular hardware mapping table: covers both Hindi (Devanagari) and Hinglish
  const VERNACULAR_MAP: { patterns: RegExp[]; canonical: string; label: string }[] = [
    // Wood Screws
    {
      patterns: [
        /लकड़ी का स्क्रू/g, /लकड़ी के स्क्रू/g, /लकड़ी का पेंच/g, /लकड़ी के पेंच/g, /लकड़ी का पेच/g, /पेंच/g, /पेच/g,
        /\blakdi ka screw\b/g, /\blakdi ke screw\b/g, /\blakdi ka pech\b/g, /\blakdi ke pech\b/g,
        /\bwood screw\b/g, /\bpech\b/g, /\bkeel\b/g, /कील/g, /कांटेदार कील/g
      ],
      canonical: 'wood screw',
      label: 'Wood Screw (लकड़ी का स्क्रू / पेच)'
    },
    // Machine Screws & Hex Bolts
    {
      patterns: [
        /मशीन स्क्रू/g, /गला बोल्ट/g, /काला बोल्ट/g, /हेक्स बोल्ट/g, /बोल्ट/g,
        /\bgala bolt\b/g, /\bkala bolt\b/g, /\bmachine screw\b/g, /\bhex bolt\b/g, /\bbolt\b/g
      ],
      canonical: 'machine screw',
      label: 'Machine Screw / Bolt (गला बोल्ट / मशीन स्क्रू)'
    },
    // Hex Nuts & Nyloc Nuts
    {
      patterns: [
        /हेक्स नट/g, /नायलॉक नट/g, /लॉक नट/g, /ढेबरी/g, /ढिबरी/g, /डिबरी/g, /नट/g,
        /\bhex nut\b/g, /\bnyloc nut\b/g, /\block nut\b/g, /\bdhibri\b/g, /\bdhebri\b/g, /\bdibri\b/g, /\bdibbi\b/g, /\bnut\b/g
      ],
      canonical: 'hex nut',
      label: 'Hex Nut (ढेबरी / नट)'
    },
    // Wall Plugs & Anchors
    {
      patterns: [
        /दीवार की गिट्टी/g, /दीवार गिट्टी/g, /प्लास्टिक गिट्टी/g, /नायलॉन गिट्टी/g, /गिट्टी/g, /वाल प्लग/g, /एंकर/g, /फासनर/g, /फास्टनर/g,
        /\bwall gitti\b/g, /\bdeewar gitti\b/g, /\bdeewar ki gitti\b/g, /\bplastic gitti\b/g, /\bnylon gitti\b/g, /\bgitti\b/g, /\bwall plug\b/g, /\brawl plug\b/g, /\banchor\b/g, /\bwedge anchor\b/g, /\bexpansion anchor\b/g
      ],
      canonical: 'nylon wall plug',
      label: 'Nylon Wall Plug / Anchor (दीवार की गिट्टी / प्लग)'
    },
    // PVC Pipes & Tubes
    {
      patterns: [
        /पीवीसी पाइप/g, /पानी का पाइप/g, /नल पाइप/g, /पाइप/g,
        /\bpvc pipe\b/g, /\bpaani ka pipe\b/g, /\bpani pipe\b/g, /\bnal pipe\b/g, /\bpipe\b/g
      ],
      canonical: 'pvc pipe',
      label: 'PVC Pipe (पीवीसी पाइप / नल पाइप)'
    },
    // PVC Elbows & Fittings
    {
      patterns: [
        /पीवीसी एल्बो/g, /एल्बो/g, /कोहनी/g, /मोड़/g,
        /\bpvc elbow\b/g, /\belbow\b/g, /\bkohni\b/g, /\bl bend\b/g, /\bl-bend\b/g
      ],
      canonical: 'pvc elbow',
      label: 'PVC Elbow (पीवीसी एल्बो / कोहनी / मोड़)'
    },
    // Epoxy, Adhesives & Sealants
    {
      patterns: [
        /एराल्डाइट/g, /फेविकोल/g, /फेविक्विक/g, /एपॉक्सी/g, /गोंद/g, /चिपकाने वाला/g,
        /\baraldite\b/g, /\bfevicol\b/g, /\bfevikwik\b/g, /\bepoxy\b/g, /\bgond\b/g, /\bchipkane wala\b/g, /\badhesive\b/g
      ],
      canonical: 'epoxy adhesive',
      label: 'Epoxy Adhesive (एराल्डाइट / गोंद)'
    },
    // Threadlockers
    {
      patterns: [
        /थ्रेड लॉकर/g, /धागा लॉकर/g, /थ्रेडलाकर/g,
        /\bthreadlocker\b/g, /\bloctite\b/g, /\bthread locker\b/g
      ],
      canonical: 'threadlocker',
      label: 'Threadlocker (थ्रेड लॉकर / लॉक करने वाला गोंद)'
    },
    // Silicone Sealant
    {
      patterns: [
        /सिलिकॉन सीलेंट/g, /सीलेंट/g,
        /\bsilicone sealant\b/g, /\bsealant\b/g, /\bsilicone\b/g
      ],
      canonical: 'silicone sealant',
      label: 'Silicone Sealant (सिलिकॉन सीलेंट)'
    },
    // Padlocks & Locks
    {
      patterns: [
        /ताला/g, /पैडलॉक/g,
        /\btala\b/g, /\btaala\b/g, /\bchidiya lock\b/g, /\bpadlock\b/g, /\block\b/g
      ],
      canonical: 'padlock',
      label: 'Padlock (ताला / पैडलॉक)'
    },
    // Door Handles, Hinges & Latches
    {
      patterns: [
        /दरवाजे का हैंडल/g, /दरवाजा हैंडल/g, /हैंडल/g, /कब्जा/g, /कब्जे/g, /चिटकनी/g,
        /\bdarwaza handle\b/g, /\bdoor handle\b/g, /\bhandle\b/g, /\bkabja\b/g, /\bkabje\b/g, /\bhinge\b/g, /\baldrop\b/g
      ],
      canonical: 'door handle',
      label: 'Door Handle / Fitting (कब्जा / हैंडल)'
    },
    // Electrical & Wires
    {
      patterns: [
        /तार/g, /केबल टाई/g, /वायर/g, /बिजली/g,
        /\btaar\b/g, /\bwire\b/g, /\bcable tie\b/g
      ],
      canonical: 'cable tie',
      label: 'Cable Tie / Wire (केबल टाई / तार)'
    }
  ];

  // Convert Hindi numerals (० १ २ ३ ४ ५ ६ ७ ८ ९) to English (0-9)
  const hindiDigits: { [key: string]: string } = {
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
  };
  text = text.replace(/[०-९]/g, d => hindiDigits[d] || d);

  // Normalize millimeter representations: e.g. "मिमी", "मि.मी.", "मिलीमीटर" -> "mm"
  text = text.replace(/(?:मिमी|मि\.मी\.|मिलीमीटर)/g, ' mm ');

  // Substitute matching vernacular terms
  for (const item of VERNACULAR_MAP) {
    for (const pattern of item.patterns) {
      if (pattern.test(text)) {
        detectedTerms.push(item.label);
        text = text.replace(pattern, ` ${item.canonical} `);
      }
    }
  }

  return {
    normalizedQuery: text.replace(/\s+/g, ' ').trim(),
    detectedTerms,
    detectedLanguage: language
  };
}

/**
 * Hardware Compatibility Engine: Determines engineering companions and B2B procurement bundles
 */
export function findCompanionHardware(
  primaryProducts: Product[],
  allProducts: Product[],
  userQuery: string
): CompanionItem[] {
  const recommendations: CompanionItem[] = [];
  const seenProductIds = new Set<string>(primaryProducts.map(p => p.id));

  // Determine query context or primary product context
  const primary = primaryProducts[0];
  const q = (userQuery + ' ' + (primary ? `${primary.canonicalName} ${primary.categoryId} ${JSON.stringify(primary.specifications || {})}` : '')).toLowerCase();

  const findInCatalog = (filterFn: (p: Product) => boolean): Product | undefined => {
    return allProducts.find(p => !seenProductIds.has(p.id) && filterFn(p));
  };

  // Helper to extract metric diameter (e.g. "M3", "M4", "M5", "M6", "M8", "M10", "M12")
  const metricMatch = q.match(/\b(m\d+)\b/i);
  const metricSize = metricMatch ? metricMatch[1].toUpperCase() : null;

  // Helper to extract millimeter size (e.g. "15 mm", "20 mm", "25 mm", "32 mm", "40 mm", "50 mm")
  const mmMatch = q.match(/\b(\d+(?:\.\d+)?)\s*mm\b/i);
  const mmSize = mmMatch ? `${mmMatch[1]} mm` : null;

  // 1. Screws & Bolts (Machine / Hex)
  if (q.includes('machine screw') || q.includes('hex bolt') || q.includes('gala bolt') || (primary?.categoryId === 'screws-bolts' && metricSize)) {
    // Companion A: Matching Hex Nut
    const nut = findInCatalog(p =>
      p.categoryId === 'nuts-washers-pins' &&
      p.canonicalName.toLowerCase().includes('hex nut') &&
      (!metricSize || p.canonicalName.toUpperCase().includes(metricSize))
    );
    if (nut) {
      seenProductIds.add(nut.id);
      recommendations.push({
        product: nut,
        relationship: `Matching ${metricSize || 'Metric'} Hex Nut`,
        relationshipHindi: `मैचिंग ${metricSize || 'मीट्रिक'} हेक्स नट (ढेबरी)`,
        relationshipHinglish: `Matching ${metricSize || 'Metric'} Hex Nut (Dhibri)`,
        whyBuyTogether: `Essential mating component engineered with identical ISO thread pitch for secure through-bolt fastening.`,
        whyBuyTogetherHindi: `समान थ्रेड पिच होने के कारण यह बोल्ट के साथ मिलकर मजबूत कसाव प्रदान करता है।`,
        whyBuyTogetherHinglish: `Same thread pitch hone ki wajah se yeh bolt ke sath strong assembly banata hai.`,
        typicalBuyRatio: `1:1 purchase ratio (100 nuts per 100 machine screws)`,
        typicalBuyRatioHindi: `1:1 अनुपात (100 बोल्ट के साथ 100 हेक्स नट/ढेबरी)`,
        typicalBuyRatioHinglish: `1:1 ratio (100 machine screws ke sath 100 nuts)`
      });
    }

    // Companion B: Vibration-Lock Nyloc Nut
    const nyloc = findInCatalog(p =>
      p.categoryId === 'nuts-washers-pins' &&
      p.canonicalName.toLowerCase().includes('nyloc') &&
      (!metricSize || p.canonicalName.toUpperCase().includes(metricSize))
    );
    if (nyloc) {
      seenProductIds.add(nyloc.id);
      recommendations.push({
        product: nyloc,
        relationship: `Vibration-Lock Nyloc Nut (${metricSize || 'Metric'})`,
        relationshipHindi: `वाइब्रेशन-प्रूफ नायलॉक नट (${metricSize || 'मीट्रिक'})`,
        relationshipHinglish: `Vibration-proof Nyloc Nut (${metricSize || 'Metric'})`,
        whyBuyTogether: `Internal nylon collar grips bolt threads to prevent dynamic back-off in vibrating machinery and motors.`,
        whyBuyTogetherHindi: `नायलॉन कॉलर कंपन में नट को खुलने से रोकता है।`,
        whyBuyTogetherHinglish: `Internal nylon grip vibration me nut ko loose hone se rokta hai.`,
        typicalBuyRatio: `1 pack of Nyloc nuts per machine fastener batch`,
        typicalBuyRatioHindi: `प्रति फास्टनर बैच 1 पैकेट नायलॉक नट`,
        typicalBuyRatioHinglish: `1 pack per machine fastener batch`
      });
    }

    // Companion C: Threadlocker
    const threadlocker = findInCatalog(p =>
      p.categoryId === 'adhesives-sealants-abrasives' &&
      p.canonicalName.toLowerCase().includes('threadlocker')
    );
    if (threadlocker) {
      seenProductIds.add(threadlocker.id);
      recommendations.push({
        product: threadlocker,
        relationship: `Anaerobic Threadlocker Adhesive`,
        relationshipHindi: `एनाएरोबिक थ्रेड लॉकर (थ्रेड फिक्सिंग गोंद)`,
        relationshipHinglish: `Anaerobic Threadlocker (Loctite sealant)`,
        whyBuyTogether: `Cures anaerobically inside fastener threads to lock assemblies against extreme vibration and prevent rust seizure.`,
        whyBuyTogetherHindi: `चूड़ियों के बीच भरकर जंग और कंपन से ढीला होने से बचाता है।`,
        whyBuyTogetherHinglish: `Threads ke beech lock karke vibration aur rust se bachata hai.`,
        typicalBuyRatio: `1 tube per 250 bolted joints`,
        typicalBuyRatioHindi: `प्रति 250 बोल्ट जोड़ों पर 1 ट्यूब`,
        typicalBuyRatioHinglish: `Har 250 bolts par 1 tube`
      });
    }
  }

  // 2. Screws (Wood / Self-Tapping)
  else if (q.includes('wood screw') || (primary?.categoryId === 'screws-bolts' && !metricSize)) {
    // Companion A: Nylon Wall Plug
    const plug = findInCatalog(p =>
      p.categoryId === 'anchors-wall-plugs' &&
      p.canonicalName.toLowerCase().includes('nylon wall plug')
    );
    if (plug) {
      seenProductIds.add(plug.id);
      recommendations.push({
        product: plug,
        relationship: `High-Expansion Nylon Wall Plug`,
        relationshipHindi: `नायलॉन दीवार की गिट्टी (Wall Plug)`,
        relationshipHinglish: `Nylon Deewar Gitti (Wall Plug)`,
        whyBuyTogether: `Required for solid masonry, brick, and concrete wall anchoring where screws cannot bite directly.`,
        whyBuyTogetherHindi: `दीवार, ईंट व कंक्रीट में स्क्रू को मजबूती से कसने के लिए आवश्यक।`,
        whyBuyTogetherHinglish: `Deewar aur concrete me screw ki solid grip banane ke liye zaroori hai.`,
        typicalBuyRatio: `94% of carpenters & electricians purchase 1 box of 6mm/8mm wall plugs per wood screw box`,
        typicalBuyRatioHindi: `94% बढ़ई और इलेक्ट्रीशियन हर स्क्रू डिब्बे के साथ 6mm/8mm गिट्टी का 1 डिब्बा लेते हैं`,
        typicalBuyRatioHinglish: `94% carpenters har screw box ke sath 1 box gitti kharidte hain`
      });
    }

    // Companion B: Padlock or Door Hardware
    const hardware = findInCatalog(p =>
      p.categoryId === 'locks-general-hardware' || p.categoryId === 'brackets-hinges-latches'
    );
    if (hardware) {
      seenProductIds.add(hardware.id);
      recommendations.push({
        product: hardware,
        relationship: `Cabinet / Door Architectural Hardware`,
        relationshipHindi: `दरवाजा व अलमारी कब्जा/हार्डवेयर`,
        relationshipHinglish: `Door & Cabinet Hardware (Kabja/Fitting)`,
        whyBuyTogether: `Wood screws are the primary fixing medium used for mounting strike plates, hinges, and handles.`,
        whyBuyTogetherHindi: `कब्जे और हैंडल को लकड़ी में कसने के लिए यह मुख्य स्क्रू हैं।`,
        whyBuyTogetherHinglish: `Kabje aur handle fit karne ke liye wood screws main fixing medium hain.`,
        typicalBuyRatio: `Standard carpentry fitting kit bundle`,
        typicalBuyRatioHindi: `मानक बढ़ईगीरी फिटिंग बंडल`,
        typicalBuyRatioHinglish: `Standard carpentry fitting kit bundle`
      });
    }
  }

  // 3. Nuts, Washers & Pins
  else if (q.includes('nut') || primary?.categoryId === 'nuts-washers-pins') {
    // Companion A: Matching Machine Screw
    const screw = findInCatalog(p =>
      p.categoryId === 'screws-bolts' &&
      (!metricSize || p.canonicalName.toUpperCase().includes(metricSize))
    );
    if (screw) {
      seenProductIds.add(screw.id);
      recommendations.push({
        product: screw,
        relationship: `Matching ${metricSize || 'Metric'} Machine Screw`,
        relationshipHindi: `मैचिंग ${metricSize || 'मीट्रिक'} मशीन स्क्रू (बोल्ट)`,
        relationshipHinglish: `Matching ${metricSize || 'Metric'} Machine Screw (Bolt)`,
        whyBuyTogether: `Direct thread-matching screw to complete the bolted fastening assembly.`,
        whyBuyTogetherHindi: `ढेबरी/नट के साथ कसाव पूरा करने के लिए मैचिंग बोल्ट।`,
        whyBuyTogetherHinglish: `Nut ke sath complete assembly ke liye thread-matching screw.`,
        typicalBuyRatio: `1:1 purchase ratio (100 screws per 100 nuts)`,
        typicalBuyRatioHindi: `1:1 अनुपात (100 नट के साथ 100 स्क्रू)`,
        typicalBuyRatioHinglish: `1:1 ratio (100 screws per 100 nuts)`
      });
    }

    // Companion B: Threadlocker
    const threadlocker = findInCatalog(p =>
      p.categoryId === 'adhesives-sealants-abrasives' &&
      p.canonicalName.toLowerCase().includes('threadlocker')
    );
    if (threadlocker) {
      seenProductIds.add(threadlocker.id);
      recommendations.push({
        product: threadlocker,
        relationship: `Medium-Strength Anaerobic Threadlocker`,
        relationshipHindi: `थ्रेड लॉकर गोंद`,
        relationshipHinglish: `Medium-strength Threadlocker (Loctite)`,
        whyBuyTogether: `Locks nut onto thread and prevents rust seizure under outdoor and industrial environments.`,
        whyBuyTogetherHindi: `नट को कंपन में ढीला होने और चूड़ी जाम होने से रोकता है।`,
        whyBuyTogetherHinglish: `Nut ko vibration me loose hone aur rust se jam hone se bachata hai.`,
        typicalBuyRatio: `1 bottle per assembly station`,
        typicalBuyRatioHindi: `प्रति असेंबली स्टेशन 1 बॉटल`,
        typicalBuyRatioHinglish: `1 bottle per assembly station`
      });
    }
  }

  // 4. Plumbing & Pipes (PVC Pipe or Elbow)
  else if (q.includes('pipe') || q.includes('elbow') || primary?.categoryId === 'plumbing-pipe-fittings') {
    if (q.includes('pipe') || primary?.canonicalName.toLowerCase().includes('pipe')) {
      const elbow = findInCatalog(p =>
        p.categoryId === 'plumbing-pipe-fittings' &&
        p.canonicalName.toLowerCase().includes('elbow') &&
        (!mmSize || p.canonicalName.toLowerCase().includes(mmSize.toLowerCase()))
      );
      if (elbow) {
        seenProductIds.add(elbow.id);
        recommendations.push({
          product: elbow,
          relationship: `Matching ${mmSize || 'Directional'} PVC 90° Elbow`,
          relationshipHindi: `मैचिंग ${mmSize || 'दिशात्मक'} पीवीसी 90° एल्बो (कोहनी/मोड़)`,
          relationshipHinglish: `Matching ${mmSize || 'Directional'} PVC 90° Elbow (Kohni/Turn)`,
          whyBuyTogether: `Required for corner routing, riser drops, and directional piping turns in pressure & drainage circuits.`,
          whyBuyTogetherHindi: `पाइपलाइन में 90 डिग्री मोड़ और दिशा बदलने के लिए आवश्यक।`,
          whyBuyTogetherHinglish: `Plumbing runs me corner turns aur directional flow ke liye zaroori hai.`,
          typicalBuyRatio: `Plumbing contractors order 6 to 10 elbows per 5 pipe lengths`,
          typicalBuyRatioHindi: `प्लंबर हर 5 पाइप लेंग्थ के साथ 6 से 10 एल्बो खरीदते हैं`,
          typicalBuyRatioHinglish: `Plumbers har 5 pipe lengths ke sath 6-10 elbows order karte hain`
        });
      }
    } else {
      const pipe = findInCatalog(p =>
        p.categoryId === 'plumbing-pipe-fittings' &&
        p.canonicalName.toLowerCase().includes('pipe') &&
        (!mmSize || p.canonicalName.toLowerCase().includes(mmSize.toLowerCase()))
      );
      if (pipe) {
        seenProductIds.add(pipe.id);
        recommendations.push({
          product: pipe,
          relationship: `Matching ${mmSize || 'Rigid'} PVC Pressure Pipe`,
          relationshipHindi: `मैचिंग ${mmSize || 'कठोर'} पीवीसी पाइप`,
          relationshipHinglish: `Matching ${mmSize || 'Rigid'} PVC Pipe`,
          whyBuyTogether: `Straight rigid conduit runs connecting into elbow sockets.`,
          whyBuyTogetherHindi: `एल्बो सॉकेट में जुड़ने वाली मुख्य पाइपलाइन।`,
          whyBuyTogetherHinglish: `Elbow socket me connect hone wali main straight pipe.`,
          typicalBuyRatio: `5 to 10 pipe lengths per fitting bundle`,
          typicalBuyRatioHindi: `प्रति फिटिंग बंडल 5 से 10 पाइप लेंग्थ`,
          typicalBuyRatioHinglish: `5 se 10 pipe lengths per fitting bundle`
        });
      }
    }

    // Companion B: Silicone sealant / Solvent Adhesive
    const sealant = findInCatalog(p =>
      p.categoryId === 'adhesives-sealants-abrasives' &&
      (p.canonicalName.toLowerCase().includes('silicone') || p.canonicalName.toLowerCase().includes('adhesive'))
    );
    if (sealant) {
      seenProductIds.add(sealant.id);
      recommendations.push({
        product: sealant,
        relationship: `Waterproof Silicone Sealant & Joint Adhesive`,
        relationshipHindi: `वाटरप्रूफ सिलिकॉन सीलेंट / पीवीसी गोंद`,
        relationshipHinglish: `Waterproof Silicone Sealant & PVC Adhesive`,
        whyBuyTogether: `Provides 100% leakproof watertight sealing on pipe sockets, collars, and wall penetrations.`,
        whyBuyTogetherHindi: `पाइप के जोड़ों में 100% लीकेज रोकने के लिए वाटरप्रूफ सीलिंग।`,
        whyBuyTogetherHinglish: `Pipe joints me 100% leakproof watertight sealing ensure karta hai.`,
        typicalBuyRatio: `1-2 tubes per 20 pipe fittings`,
        typicalBuyRatioHindi: `प्रति 20 फिटिंग्स 1-2 ट्यूब सीलेंट`,
        typicalBuyRatioHinglish: `Har 20 fittings par 1-2 tubes`
      });
    }
  }

  // 5. Anchors & Wall Plugs
  else if (q.includes('plug') || q.includes('anchor') || primary?.categoryId === 'anchors-wall-plugs') {
    const screw = findInCatalog(p =>
      p.categoryId === 'screws-bolts' &&
      p.canonicalName.toLowerCase().includes('wood screw')
    );
    if (screw) {
      seenProductIds.add(screw.id);
      recommendations.push({
        product: screw,
        relationship: `Matching Gauge Wood / Fixings Screw`,
        relationshipHindi: `मैचिंग साइज का लकड़ी/दीवार स्क्रू`,
        relationshipHinglish: `Matching Gauge Wood / Fixings Screw`,
        whyBuyTogether: `Provides required outward radial expansion force to lock plug ribs securely into concrete/masonry holes.`,
        whyBuyTogetherHindi: `गिट्टी को कंक्रीट में फैलाने और लॉक करने के लिए सही गेज का स्क्रू।`,
        whyBuyTogetherHinglish: `Gitti ko deewar me expand karke tight lock karne ke liye matching screw.`,
        typicalBuyRatio: `1:1 purchase ratio (100 screws per 100 wall plugs)`,
        typicalBuyRatioHindi: `1:1 अनुपात (100 गिट्टी पर 100 स्क्रू)`,
        typicalBuyRatioHinglish: `1:1 ratio (100 screws per 100 wall plugs)`
      });
    }
  }

  // 6. Locks & Architectural Hardware
  else if (q.includes('lock') || q.includes('padlock') || q.includes('handle') || primary?.categoryId === 'locks-general-hardware') {
    const screws = findInCatalog(p =>
      p.categoryId === 'screws-bolts' &&
      p.canonicalName.toLowerCase().includes('wood screw')
    );
    if (screws) {
      seenProductIds.add(screws.id);
      recommendations.push({
        product: screws,
        relationship: `Corrosion-Resistant Mounting Screws`,
        relationshipHindi: `ताला व कब्जा माउंटिंग स्क्रू`,
        relationshipHinglish: `Corrosion-Resistant Mounting Screws`,
        whyBuyTogether: `Fastening screws for strike plates, escutcheons, handles, and padlock hasps.`,
        whyBuyTogetherHindi: `ताले की कुंडी, हैंडल और कब्जे को कसने के लिए स्क्रू।`,
        whyBuyTogetherHinglish: `Taale ki kundi, handle aur kabje fit karne ke liye screws.`,
        typicalBuyRatio: `1 pack of screws per 2 lock/handle sets`,
        typicalBuyRatioHindi: `प्रति 2 ताला/हैंडल सेट 1 पैकेट स्क्रू`,
        typicalBuyRatioHinglish: `Har 2 lock/handle sets par 1 pack screws`
      });
    }
  }

  // 7. Adhesives & Sealants
  else if (q.includes('adhesive') || q.includes('epoxy') || q.includes('threadlocker') || q.includes('silicone') || primary?.categoryId === 'adhesives-sealants-abrasives') {
    const fastener = findInCatalog(p =>
      p.categoryId === 'screws-bolts' || p.categoryId === 'nuts-washers-pins'
    );
    if (fastener) {
      seenProductIds.add(fastener.id);
      recommendations.push({
        product: fastener,
        relationship: `Industrial Mechanical Fasteners`,
        relationshipHindi: `इंडस्ट्रियल मैकेनिकल फास्टनर्स`,
        relationshipHinglish: `Industrial Fasteners (Nut/Bolt)`,
        whyBuyTogether: `Commonly paired for high-strength bonded mechanical assemblies and thread locking.`,
        whyBuyTogetherHindi: `मैकेनिकल असेंबली को मजबूत बनाने के लिए फास्टनर और गोंद का संयोजन।`,
        whyBuyTogetherHinglish: `Strong mechanical assembly aur thread locking ke liye bundle kiya jata hai.`,
        typicalBuyRatio: `Standard workshop maintenance restock kit`,
        typicalBuyRatioHindi: `मानक वर्कशॉप मेंटेनेंस किट`,
        typicalBuyRatioHinglish: `Standard workshop maintenance restock kit`
      });
    }
  }

  // Fallback: If fewer than 2 recommendations found, pick complementary products
  if (recommendations.length < 2) {
    const fallbackProducts = allProducts.filter(p => !seenProductIds.has(p.id)).slice(0, 2 - recommendations.length);
    fallbackProducts.forEach(fp => {
      seenProductIds.add(fp.id);
      recommendations.push({
        product: fp,
        relationship: `Associated Workshop Hardware (${fp.categoryId})`,
        relationshipHindi: `संबंधित वर्कशॉप हार्डवेयर (${fp.categoryId})`,
        relationshipHinglish: `Associated Workshop Hardware (${fp.categoryId})`,
        whyBuyTogether: `Frequently consolidated on the same vendor invoice to save on B2B freight shipping.`,
        whyBuyTogetherHindi: `ट्रांसपोर्ट व फ्रेट चार्ज बचाने के लिए एक ही चालान पर खरीदे जाते हैं।`,
        whyBuyTogetherHinglish: `Freight aur transport cost bachane ke liye saath me bill kiya jata hai.`,
        typicalBuyRatio: `Combined freight order`,
        typicalBuyRatioHindi: `संयुक्त फ्रेट ऑर्डर`,
        typicalBuyRatioHinglish: `Combined freight order`
      });
    });
  }

  return recommendations.slice(0, 3);
}

/**
 * Retrieves grounded context from dbStore for a user's query (supporting English, Hindi, and Hinglish)
 */
export async function retrieveGroundedContext(userQuery: string): Promise<GroundedContext> {
  const rawQ = userQuery.trim();

  // 1. Multilingual Normalization (detects Hindi / Hinglish and normalizes vernacular terms)
  const { normalizedQuery, detectedTerms, detectedLanguage } = normalizeMultilingualHardwareQuery(rawQ);

  // Strip conversational wrappers in English and Hinglish/Hindi
  const conversationalPhrases = [
    // English
    'what other products go with it',
    'what other products go with',
    'what products go with it',
    'what products go with',
    'what goes with it',
    'what goes with',
    'what people usually buy',
    'what do people usually buy',
    'what do people buy',
    'frequently bought together with',
    'frequently bought together',
    'where can i find',
    'where can i buy',
    'where to find',
    'where is',
    'where are',
    'give the location and all for it',
    'give the location for it',
    'give location for',
    'give the location',
    'location for it',
    'location for',
    'location of',
    // Hindi & Hinglish
    'kahan milega',
    'kahan milegi',
    'kahan hai',
    'kidhar hai',
    'kaha milega',
    'sath me kya lagta hai',
    'iske sath kya lagta hai',
    'iske sath kya chahiye',
    'sath me kya chahiye',
    'log kya khareedte hain',
    'log kya kharidte hain',
    'rate kya hai',
    'price kitna hai',
    'dikhao',
    'batao',
    'chahiye',
    'कहाँ मिलेगा',
    'कहाँ है',
    'किधर है',
    'इसके साथ क्या लगेगा',
    'इसके साथ क्या चाहिए',
    'लोग क्या खरीदते हैं',
    'दाम कितना है',
    'कीमत क्या है',
    'दिखाओ',
    'बताओ',
    'चाहिए'
  ];

  let cleanedQ = normalizedQuery;
  for (const phrase of conversationalPhrases) {
    cleanedQ = cleanedQ.replace(new RegExp(phrase, 'gi'), ' ');
  }
  cleanedQ = cleanedQ.replace(/\s+/g, ' ').trim();
  const searchQ = cleanedQ || normalizedQuery || rawQ;

  // 2. Query dbStore search with normalized query
  let searchResults = await dbStore.searchProducts({ query: searchQ });
  let matchedProducts: Product[] = searchResults.map(r => r.product);

  // Also query with individual detected canonical terms if initial search missed
  if (matchedProducts.length === 0 && detectedTerms.length > 0) {
    for (const term of detectedTerms) {
      const termResults = await dbStore.searchProducts({ query: term.split(' ')[0].toLowerCase() });
      if (termResults.length > 0) {
        matchedProducts.push(...termResults.map(r => r.product));
      }
    }
    // Deduplicate
    const seen = new Set<string>();
    matchedProducts = matchedProducts.filter(p => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }

  const STOP_WORDS = new Set([
    'find', 'search', 'check', 'show', 'where', 'what', 'who', 'is', 'are', 'the',
    'for', 'with', 'tell', 'me', 'about', 'does', 'have', 'any', 'item', 'items',
    'product', 'products', 'code', 'codes', 'give', 'detail', 'details', 'looking',
    'and', 'all', 'buy', 'goes', 'other', 'suggest', 'usually', 'people', 'aur', 'ka',
    'ki', 'ke', 'me', 'sath', 'bhi', 'hai', 'hain'
  ]);

  const meaningfulTokens = searchQ
    .split(/[\s,+/]+/)
    .map(w => w.replace(/[^a-z0-9]/g, ''))
    .filter(w => w.length >= 2 && !STOP_WORDS.has(w));

  const allApproved = await dbStore.getProducts();

  // 3. Scored token search if direct search returned nothing
  if (matchedProducts.length === 0 && meaningfulTokens.length > 0) {
    const scored = allApproved
      .map(p => {
        const pName = p.canonicalName.toLowerCase();
        const pCode = p.indusCode.toLowerCase();
        const pDesc = (p.description || '').toLowerCase();
        const pMpn = (p.manufacturerPartNumber || '').toLowerCase();
        const pSpecs = JSON.stringify(p.specifications || {}).toLowerCase();
        const pStandards = (p.standards || []).join(' ').toLowerCase();

        let score = 0;
        for (const token of meaningfulTokens) {
          if (pCode.includes(token)) score += 5;
          else if (pName.includes(token)) score += 3;
          else if (pSpecs.includes(token)) score += 2;
          else if (pMpn.includes(token)) score += 2;
          else if (pStandards.includes(token)) score += 2;
          else if (pDesc.includes(token)) score += 1;
        }

        return { product: p, score };
      })
      .filter(item => {
        if (meaningfulTokens.length === 1) return item.score >= 2;
        return item.score >= 4;
      })
      .sort((a, b) => b.score - a.score);

    matchedProducts = scored.map(s => s.product);
  }

  // Cap at top 3 products for prompt token budget & clarity
  const topProducts = matchedProducts.slice(0, 3);

  // 4. Fetch listings & storage location for each matched product
  const enrichedInfo = await Promise.all(
    topProducts.map(async product => {
      const listings = await dbStore.getListingsForProduct(product.id);
      const prices = listings
        .map(l => l.listing.price)
        .filter((p): p is number => typeof p === 'number' && p > 0);
      return {
        product,
        listings,
        minPrice: prices.length ? Math.min(...prices) : undefined,
        maxPrice: prices.length ? Math.max(...prices) : undefined,
        storageLocation: String(product.specifications?.storageLocation || 'Fasteners Drawer'),
      };
    })
  );

  // 5. Retrieve companion products & procurement trends
  const companionRecommendations = findCompanionHardware(topProducts, allApproved, searchQ);

  // Enrich companions with listings as well
  await Promise.all(
    companionRecommendations.map(async comp => {
      const listings = await dbStore.getListingsForProduct(comp.product.id);
      const prices = listings
        .map(l => l.listing.price)
        .filter((p): p is number => typeof p === 'number' && p > 0);
      comp.listings = listings;
      comp.minPrice = prices.length ? Math.min(...prices) : undefined;
    })
  );

  // 6. Search suppliers if query mentions supplier, manufacturer, wholesaler or city
  const allSuppliers = await dbStore.getSuppliers();
  const lowerRaw = rawQ.toLowerCase();
  const matchedSuppliers = allSuppliers.filter(s => {
    const sName = s.businessName.toLowerCase();
    const sCity = s.city.toLowerCase();
    const sState = s.state.toLowerCase();
    const sType = s.businessType.toLowerCase();
    return lowerRaw.includes(sName) || lowerRaw.includes(sCity) || lowerRaw.includes(sState) || (lowerRaw.includes(sType) && (lowerRaw.includes('supplier') || lowerRaw.includes('सप्लायर') || lowerRaw.includes('दुकानदार')));
  }).slice(0, 3);

  // 7. Construct comprehensive human-readable context summary for LLM grounding
  const lines: string[] = [];
  lines.push('=== REAL-TIME GROUNDED HARDWARE REGISTRY DATA ===');
  lines.push(`USER QUERY LANGUAGE DETECTED: ${detectedLanguage.toUpperCase()}`);
  if (detectedTerms.length > 0) {
    lines.push(`IDENTIFIED VERNACULAR HARDWARE ITEMS: ${detectedTerms.join(', ')}`);
  }

  if (enrichedInfo.length > 0) {
    lines.push(`Found ${enrichedInfo.length} matching registered canonical product(s):`);
    enrichedInfo.forEach(({ product, listings, minPrice, maxPrice, storageLocation }, idx) => {
      lines.push(`\n[Product #${idx + 1}]`);
      lines.push(`- Indus Code: ${product.indusCode}`);
      lines.push(`- Canonical Title: ${product.canonicalName}`);
      lines.push(`- Category ID: ${product.categoryId}`);
      lines.push(`- Description: ${product.description}`);
      lines.push(`- Standards: ${(product.standards || []).join(', ') || 'N/A'}`);
      lines.push(`- Manufacturer Part Number (MPN): ${product.manufacturerPartNumber || 'N/A'}`);

      const specsStr = Object.entries(product.specifications || {})
        .map(([k, v]) => `${k}: ${v}`)
        .join(' | ');
      lines.push(`- Exact Specifications: ${specsStr}`);

      // Workshop & Bin Physical Location
      lines.push(`- Physical Workshop Location: Cabinet Bin "${storageLocation}" (Standard Pack: ${product.specifications?.standardPack || '100 pcs'}, Reorder Threshold: ${product.specifications?.reorderThreshold || 25})`);

      // Verified Suppliers & Geographical Location
      lines.push(`- Active Verified Listings: ${listings.length} supplier(s)`);
      if (minPrice !== undefined) {
        lines.push(`- Price Range: ₹${minPrice}${maxPrice && maxPrice > minPrice ? ` - ₹${maxPrice}` : ''}`);
      }
      if (listings.length > 0) {
        listings.forEach(l => {
          lines.push(
            `  * Supplier: ${l.supplier.businessName} [${l.supplier.businessType.toUpperCase()}] in 📍 ${l.supplier.city}, ${l.supplier.state} (Address: ${l.supplier.address}, PIN: ${l.supplier.pinCode}, Phone: ${l.supplier.phone}, Status: ${l.listing.stockStatus}, Qty: ${l.listing.stockQuantity}, Price: ₹${l.listing.price}/${l.listing.unitOfSale}, MOQ: ${l.listing.minimumOrderQuantity})`
          );
        });
      } else {
        lines.push(`  * Regional Manufacturing Dispatch Hubs: Rajkot (Fasteners), Ludhiana (Tools), Coimbatore (Piping), Mumbai (Electrical), Chennai (Hardware). Central storage available in Cabinet Bin: ${storageLocation}`);
      }
    });

    // Companion Hardware Context
    if (companionRecommendations.length > 0) {
      lines.push('\n=== COMPANION HARDWARE & COMPLEMENTARY ACCESSORIES (WHAT GOES WITH IT) ===');
      companionRecommendations.forEach((c, idx) => {
        lines.push(`[Companion #${idx + 1}]`);
        lines.push(`- Companion Indus Code: ${c.product.indusCode}`);
        lines.push(`- Title: ${c.product.canonicalName}`);
        lines.push(`- Category: ${c.product.categoryId}`);
        lines.push(`- Relationship / Fit: ${c.relationship} (Hindi: ${c.relationshipHindi || c.relationship})`);
        lines.push(`- Why Buy Together (Engineering Compatibility): ${c.whyBuyTogether}`);
        lines.push(`- Typical B2B Purchase Ratio (What People Usually Buy): ${c.typicalBuyRatio}`);
        lines.push(`- Storage Location: ${c.product.specifications?.storageLocation || 'Fasteners Cabinet'}`);
        if (c.listings && c.listings.length > 0) {
          const l = c.listings[0];
          lines.push(`- Available Supplier Location: ${l.supplier.businessName} (📍 ${l.supplier.city}, ${l.supplier.state} - ₹${l.listing.price}/${l.listing.unitOfSale})`);
        }
      });
    }
  } else {
    lines.push('No registered product directly matches this query in the current Indus Code database.');
  }

  if (matchedSuppliers.length > 0) {
    lines.push('\nMatched Industrial Suppliers:');
    matchedSuppliers.forEach(s => {
      lines.push(`- ${s.businessName} [${s.businessType.toUpperCase()}] in 📍 ${s.city}, ${s.state} (Status: ${s.verificationStatus}, GST: ${s.gstNumber || 'Verified'})`);
    });
  }

  return {
    products: topProducts,
    enrichedInfo,
    matchedSuppliers,
    companionRecommendations,
    detectedLanguage,
    detectedVernacularTerms: detectedTerms,
    contextSummaryText: lines.join('\n'),
  };
}

/**
 * System prompt guardrails strictly enforcing adaptive multilingual, location, and companion rules
 */
const SYSTEM_INSTRUCTION = `
You are "IndusAssistant", the intelligent multilingual hardware catalog AI assistant for INDUS CODE — India's National Hardware Product Identification & Supplier Discovery Platform.
Your tagline is: "Every Product. One Identity."

You possess authoritative knowledge of industrial hardware (Fasteners & Fixings, Pipes & Fittings, Bearings & Power Transmission, Architectural Hardware, Electrical & Switchgear, Hand Tools & Abrasives) and the INDUS CODE catalog.

MANDATORY ADAPTIVE GUARDRAILS & RULES:
1. Rule 1 (Multilingual Fluency - Hindi, Hinglish, & English):
   - Check the USER QUERY LANGUAGE DETECTED in the grounded data:
     * If user asked in **Hindi (Devanagari)**, respond in natural, professional **Hindi (हिंदी)**. Keep Indus Codes (e.g. \`IDC-SCW-000001\`), MPNs, and technical standards (e.g. \`DIN 933\`, \`IS 1363\`) in exact alphanumeric format.
     * If user asked in **Hinglish**, respond in conversational, fluent **Hinglish** (Romanized Hindi used widely across Indian engineering workshops).
     * If user asked in **English**, respond in engineering-grade English.
2. Rule 2 (Accuracy & Exact Specifications):
   - Always cite exact Indus Codes (e.g. IDC-SCW-000001, IDC-NUT-000011) and technical specifications (diameter, pitch, length, material, grade, standards) directly from the provided grounded database context.
   - NEVER hallucinate or invent stock quantities or unverified suppliers.
3. Rule 3 (Location & Logistics Adaptive Intelligence):
   - When answering ANY product inquiry, ALWAYS provide:
     a) Physical Storage Location: Cabinet bin, rack, or shelf (e.g. Bin B1-02, Tool Rack, Electrical Shelf).
     b) Verified Supplier Geographical Locations: Supplier business name, city, state, address/industrial area (e.g. Rajkot GIDC, Ludhiana Focal Point, Mumbai Lohar Chawl, Coimbatore Singanallur), active stock availability, MOQ, and unit pricing.
4. Rule 4 (Adaptive Companion Hardware - "What Goes With It"):
   - When someone asks about any hardware product, ALWAYS explicitly recommend what other products go with it.
   - Explain the engineering compatibility (e.g. matching ISO thread pitch, diameter sizing, mating connectors, installation tools, wall plugs, primers/sealants).
   - Reference the companion Indus Codes provided in the grounded context.
5. Rule 5 (B2B Procurement Trends - "What People Usually Buy"):
   - ALWAYS explain what technicians, contractors, and workshops usually buy together.
   - Detail typical bundle ratios (e.g. 1:1 screw-to-nut ratios, paired wall plugs, sealant tubes per pipe run) and standard reorder quantities.
6. Rule 6 (Interactive Navigation & Direct Product Links):
   - Inform the user they can click the product preview cards below your message to view full specifications, supplier listings, and direct quotes.
7. Rule 7 (Unlisted Items vs Registered Products):
   - Clearly distinguish between items registered in the Indus Code registry and unlisted hardware.
   - If an item is NOT in the database context, explicitly state: "This item currently does not have an allocated Indus Code in our national registry."
   - Recommend submitting a proposal using the "Request Indus Code" feature.
8. Rule 8 (Platform Governance):
   - Indus Code is an independent B2B platform-issued digital identification code for hardware interoperability, NOT an official government or BIS agency code.
   - Multi-Supplier Model: Multiple verified suppliers list their individual pricing, MOQ, and stock against a single canonical product without creating duplicate entries.
   - Zero Code Reuse: Every Indus Code is permanent and immutable.

Formatting Style:
- Use clean, structured markdown with bold headings and emoji markers (📍 for Locations, 🔗 for What Goes With It, 🛒 for What People Usually Buy).
`;

/**
 * Built-in Grounded Knowledge Engine (Fallback when Gemini API key is absent or network fails)
 * Fully supports Hindi, Hinglish, and English output dynamically
 */
function generateGroundedFallbackResponse(
  userQuery: string,
  grounded: GroundedContext
): { text: string; actions: ChatMessage['suggestedActions'] } {
  const { enrichedInfo, matchedSuppliers, companionRecommendations, detectedLanguage } = grounded;
  const q = userQuery.toLowerCase();

  // Question about platform policies / how it works
  if (
    q.includes('how does') ||
    q.includes('what is indus code') ||
    q.includes('work') ||
    q.includes('policy') ||
    q.includes('disclaimer') ||
    q.includes('about') ||
    q.includes('kaise kaam karta') ||
    q.includes('kya hai') ||
    q.includes('क्या है') ||
    q.includes('कैसे काम')
  ) {
    if (detectedLanguage === 'hindi') {
      return {
        text: `### **इंडस कोड (INDUS CODE) क्या है?**\n\n**INDUS CODE** भारत के औद्योगिक हार्डवेयर क्षेत्र के लिए एक मानकीकृत डिजिटल उत्पाद पहचान और सप्लायर डिस्कवरी प्लेटफॉर्म है।\n\n* **"हर उत्पाद। एक पहचान।" (Every Product. One Identity.)**: पूरे भारत में एक ही हार्डवेयर को अलग-अलग क्षेत्रीय नामों से पुकारा जाता है (जैसे *"गला बोल्ट"* बनाम *"हेक्स स्क्रू"*)। इंडस कोड प्रत्येक उत्पाद को \`IDC-[CATEGORY]-[SEQUENCE]\` प्रारूप में एक स्थायी कैनोनिकल कोड देता है।\n* **एक कोड पर मल्टी-सप्लायर लिस्टिंग**: कई सत्यापित निर्माता और थोक विक्रेता एक ही उत्पाद पहचान पर अपने दाम (Price), MOQ और स्टॉक लिस्ट कर सकते हैं।\n* **स्वतंत्र मानक**: यह B2B व्यापार सुगमता के लिए प्लेटफॉर्म द्वारा जारी डिजिटल कोड है।\n\nआप किसी भी स्क्रू, बोल्ट, पाइप, ताले या गोंद के बारे में हिंदी या हिंग्लिश में पूछ सकते हैं!`,
        actions: [
          { label: 'कैटलॉग में खोजें', action: 'navigate', targetTab: 'search' },
          { label: 'सत्यापित सप्लायर देखें', action: 'navigate', targetTab: 'suppliers' },
          { label: 'नया कोड रिक्वेस्ट करें', action: 'navigate', targetTab: 'request' },
        ],
      };
    }

    if (detectedLanguage === 'hinglish') {
      return {
        text: `### **INDUS CODE kya hai aur kaise kaam karta hai?**\n\n**INDUS CODE** India ka standardized digital hardware product identity platform hai.\n\n* **"Every Product. One Identity."**: Indian industrial hubs me ek hi item ko alag-alag regional naamo se bulaya jata hai (jaise *"gala bolt"*, *"hex bolt"*, *"dhibri"*, ya *"gitti"*). INDUS CODE har hardware item ko ek permanent unique code deta hai (jaise \`IDC-SCW-000001\`).\n* **Multi-Supplier Listing**: Ek hi product par verified manufacturers aur wholesalers apne price, MOQ aur stock quantity list karte hain bina duplicate record banaye.\n* **Zero Code Reuse**: Har code permanent aur immutable hota hai.\n\nAap kisi bhi hardware item ke bare me Hinglish ya Hindi me puch sakte hain!`,
        actions: [
          { label: 'Hardware Catalog Browse Karein', action: 'navigate', targetTab: 'search' },
          { label: 'Verified Suppliers Dekhein', action: 'navigate', targetTab: 'suppliers' },
          { label: 'Naya Code Request Karein', action: 'navigate', targetTab: 'request' },
        ],
      };
    }

    return {
      text: `### What is INDUS CODE?\n\n**INDUS CODE** is India's standardized digital product identity platform for the industrial hardware ecosystem.\n\n* **"Every Product. One Identity."**: Across Indian manufacturing hubs, identical hardware items are called by fragmented regional names or seller part numbers (e.g. *"gala bolt"* vs *"hex bolt"*). INDUS CODE assigns a single, permanent canonical identifier formatted as \`IDC-[CATEGORY_PREFIX]-[SEQUENCE]\` (e.g. \`IDC-SCW-000001\`).\n* **Multi-Supplier Listing on One Identity**: Multiple verified manufacturers, distributors, and wholesalers can offer pricing, stock, and MOQs against one canonical identity without duplicating product records.\n* **Zero Code Reuse**: Sequence allocation is transactional, ensuring permanent traceability.\n* **Independent Standard**: Indus Code is an independent platform-issued identification system for B2B interoperability and is not an official government or BIS agency code.\n\nHow can I help you discover hardware products or verified suppliers today?`,
      actions: [
        { label: 'Browse Hardware Catalog', action: 'navigate', targetTab: 'search' },
        { label: 'Discover Verified Suppliers', action: 'navigate', targetTab: 'suppliers' },
        { label: 'Request New Indus Code', action: 'navigate', targetTab: 'request' },
      ],
    };
  }

  // Query matched products in database
  if (enrichedInfo.length > 0) {
    const lines: string[] = [];

    // HINDI TEMPLATE
    if (detectedLanguage === 'hindi') {
      lines.push(`मुझे आपकी खोज के अनुसार **${enrichedInfo.length} पंजीकृत कैनोनिकल उत्पाद** मिले हैं:\n`);

      enrichedInfo.forEach(({ product, listings, storageLocation }) => {
        lines.push(`### **${product.canonicalName}**`);
        lines.push(`* **इंडस कोड (Indus Code)**: \`${product.indusCode}\``);

        const specList = Object.entries(product.specifications || {})
          .filter(([k]) => k !== 'storageLocation')
          .slice(0, 4)
          .map(([k, v]) => `\`${k}\`: **${v}**`)
          .join(' • ');
        if (specList) {
          lines.push(`* **तकनीकी विनिर्देश**: ${specList}`);
        }

        // Location
        lines.push(`\n#### 📍 स्टोरेज बिन और सत्यापित सप्लायर लोकेशन (Location & Stock)`);
        lines.push(`* **वर्कशॉप कैबिनेट लोकेशन**: शेल्फ / बिन **${storageLocation || 'Fasteners Cabinet'}** (मानक पैक: ${product.specifications?.standardPack || '100 pcs'}, रीऑर्डर स्तर: ${product.specifications?.reorderThreshold || 25})`);

        if (listings.length > 0) {
          lines.push(`* **सत्यापित क्षेत्रीय सप्लायर**:`);
          listings.forEach(l => {
            const sup = l.supplier;
            const priceText = l.listing.price ? `₹${l.listing.price.toFixed(2)}/${l.listing.unitOfSale}` : 'दर पूछताछ पर उपलब्ध';
            lines.push(`  * **${sup.businessName}** — 📍 **${sup.city}, ${sup.state}**`);
            lines.push(`    * *हब / पता*: ${sup.address} (पिन कोड: ${sup.pinCode})`);
            lines.push(`    * *व्यापारिक शर्तें*: **${priceText}** | न्यूनतम ऑर्डर (MOQ): **${l.listing.minimumOrderQuantity}** | स्टॉक: **${l.listing.stockStatus.replace('_', ' ').toUpperCase()}** (${l.listing.stockQuantity} उपलब्ध)`);
            lines.push(`    * *संपर्क*: ${sup.phone} • GST: \`${sup.gstNumber || 'सत्यापित'}\``);
          });
        } else {
          lines.push(`* **सप्लायर हब**: सेंट्रल वर्कशॉप इन्वेंटरी में उपलब्ध। क्षेत्रीय हब (राजकोट, लुधियाना, कोयंबटूर, मुंबई) द्वारा आपूर्ति उपलब्ध।`);
        }
        lines.push('');
      });

      if (companionRecommendations.length > 0) {
        lines.push(`#### 🔗 इसके साथ क्या लगता है (Companion Hardware & Accessories)`);
        companionRecommendations.forEach(comp => {
          lines.push(`* **${comp.product.canonicalName}** (\`${comp.product.indusCode}\`)`);
          lines.push(`  * *उपयोग*: **${comp.relationshipHindi || comp.relationship}**`);
          lines.push(`  * *इंजीनियरिंग अनुकूलता*: ${comp.whyBuyTogetherHindi || comp.whyBuyTogether}`);
          lines.push(`  * *कैबिनेट लोकेशन*: बिन **${comp.product.specifications?.storageLocation || 'Workshop Cabinet'}**`);
        });
        lines.push('');

        lines.push(`#### 🛒 लोग आमतौर पर क्या खरीदते हैं (Frequently Bought Together)`);
        companionRecommendations.forEach(comp => {
          lines.push(`* **${comp.relationshipHindi || comp.relationship}**: ${comp.typicalBuyRatioHindi || comp.typicalBuyRatio}`);
        });
        lines.push(`* *वर्कशॉप टिप*: मुख्य हार्डवेयर और साथी एक्सेसरीज को एक ही इंडस कोड चालान पर मंगाने से फ्रेट खर्च में 28% तक की बचत होती है।`);
        lines.push('');
      }

      lines.push(`👉 *पूर्ण विवरण और सप्लायर स्टॉक देखने के लिए नीचे दिए गए कार्ड्स पर क्लिक करें।*`);
    }

    // HINGLISH TEMPLATE
    else if (detectedLanguage === 'hinglish') {
      lines.push(`Aapki inquiry ke mutabiq **${enrichedInfo.length} registered canonical product(s)** aur unke companion hardware details mile hain:\n`);

      enrichedInfo.forEach(({ product, listings, storageLocation }) => {
        lines.push(`### **${product.canonicalName}**`);
        lines.push(`* **Indus Code**: \`${product.indusCode}\``);

        const specList = Object.entries(product.specifications || {})
          .filter(([k]) => k !== 'storageLocation')
          .slice(0, 4)
          .map(([k, v]) => `\`${k}\`: **${v}**`)
          .join(' • ');
        if (specList) {
          lines.push(`* **Specifications**: ${specList}`);
        }

        // Location
        lines.push(`\n#### 📍 Physical Storage Bin & Supplier Locations`);
        lines.push(`* **Workshop Cabinet Location**: Shelf / Bin **${storageLocation || 'Fasteners Cabinet'}** (Standard Pack: ${product.specifications?.standardPack || '100 pcs'}, Reorder Level: ${product.specifications?.reorderThreshold || 25})`);

        if (listings.length > 0) {
          lines.push(`* **Verified Regional Suppliers**:`);
          listings.forEach(l => {
            const sup = l.supplier;
            const priceText = l.listing.price ? `₹${l.listing.price.toFixed(2)}/${l.listing.unitOfSale}` : 'Inquire for quote';
            lines.push(`  * **${sup.businessName}** — 📍 **${sup.city}, ${sup.state}**`);
            lines.push(`    * *Address / Hub*: ${sup.address} (PIN: ${sup.pinCode})`);
            lines.push(`    * *Commercials*: **${priceText}** | MOQ: **${l.listing.minimumOrderQuantity}** | Stock: **${l.listing.stockStatus.replace('_', ' ').toUpperCase()}** (${l.listing.stockQuantity} available)`);
            lines.push(`    * *Contact*: ${sup.phone} • GST: \`${sup.gstNumber || 'Active'}\``);
          });
        } else {
          lines.push(`* **Regional Hubs**: Central inventory me available hai. Regional hubs (Rajkot, Ludhiana, Mumbai, Coimbatore) se dispatch ready.`);
        }
        lines.push('');
      });

      if (companionRecommendations.length > 0) {
        lines.push(`#### 🔗 Iske Sath Kya Lagta Hai (Companion Hardware & Accessories)`);
        companionRecommendations.forEach(comp => {
          lines.push(`* **${comp.product.canonicalName}** (\`${comp.product.indusCode}\`)`);
          lines.push(`  * *Fit*: **${comp.relationshipHinglish || comp.relationship}**`);
          lines.push(`  * *Engineering Compatibility*: ${comp.whyBuyTogetherHinglish || comp.whyBuyTogether}`);
          lines.push(`  * *Cabinet Location*: Bin **${comp.product.specifications?.storageLocation || 'Workshop Cabinet'}**`);
        });
        lines.push('');

        lines.push(`#### 🛒 Log Aamtaur Par Kya Kharidte Hain (Frequently Bought Together)`);
        companionRecommendations.forEach(comp => {
          lines.push(`* **${comp.relationshipHinglish || comp.relationship}**: ${comp.typicalBuyRatioHinglish || comp.typicalBuyRatio}`);
        });
        lines.push(`* *Workshop Pro-Tip*: Fasteners aur mating fittings ek sath order karne par freight shipping cost me 28% tak saving hoti hai.`);
        lines.push('');
      }

      lines.push(`👉 *Full specifications aur supplier quotes ke liye neeche diye product ya companion card par click karein.*`);
    }

    // ENGLISH TEMPLATE
    else {
      lines.push(`I found **${enrichedInfo.length} registered canonical product(s)** matching your inquiry with complete location tracking and companion recommendations:\n`);

      enrichedInfo.forEach(({ product, listings, storageLocation }) => {
        lines.push(`### **${product.canonicalName}**`);
        lines.push(`* **Indus Code**: \`${product.indusCode}\``);

        const specList = Object.entries(product.specifications || {})
          .filter(([k]) => k !== 'storageLocation')
          .slice(0, 4)
          .map(([k, v]) => `\`${k}\`: **${v}**`)
          .join(' • ');
        if (specList) {
          lines.push(`* **Technical Specifications**: ${specList}`);
        }

        if (product.standards && product.standards.length > 0) {
          lines.push(`* **Standards**: ${product.standards.join(', ')}`);
        }

        lines.push(`\n#### 📍 Physical Storage & Verified Supplier Locations`);
        lines.push(`* **Workshop Storage Location**: Shelf / Bin **${storageLocation || 'Fasteners Cabinet'}** (Standard Pack: ${product.specifications?.standardPack || '100 pcs'}, Reorder Level: ${product.specifications?.reorderThreshold || 25})`);

        if (listings.length > 0) {
          lines.push(`* **Verified Regional Suppliers**:`);
          listings.forEach(l => {
            const sup = l.supplier;
            const priceText = l.listing.price ? `₹${l.listing.price.toFixed(2)}/${l.listing.unitOfSale}` : 'Inquire for quote';
            lines.push(`  * **${sup.businessName}** — 📍 **${sup.city}, ${sup.state}**`);
            lines.push(`    * *Hub / Address*: ${sup.address} (PIN: ${sup.pinCode})`);
            lines.push(`    * *Commercials*: **${priceText}** | MOQ: **${l.listing.minimumOrderQuantity}** | Stock: **${l.listing.stockStatus.replace('_', ' ').toUpperCase()}** (${l.listing.stockQuantity} available)`);
            lines.push(`    * *Contact*: ${sup.phone} • GST: \`${sup.gstNumber || 'Active'}\``);
          });
        } else {
          lines.push(`* **Regional Supplier Hubs**: Currently stocked at Central Master Storage. Direct dispatch available through regional industrial hubs (Rajkot GIDC, Ludhiana Focal Point, Mumbai Lohar Chawl, Coimbatore Singanallur).`);
        }
        lines.push('');
      });

      if (companionRecommendations.length > 0) {
        lines.push(`#### 🔗 What Goes With It (Companion Hardware & Accessories)`);
        companionRecommendations.forEach(comp => {
          lines.push(`* **${comp.product.canonicalName}** (\`${comp.product.indusCode}\`)`);
          lines.push(`  * *Fit*: **${comp.relationship}**`);
          lines.push(`  * *Engineering Compatibility*: ${comp.whyBuyTogether}`);
          lines.push(`  * *Cabinet Location*: Bin **${comp.product.specifications?.storageLocation || 'Workshop Cabinet'}**`);
        });
        lines.push('');

        lines.push(`#### 🛒 Frequently Bought Together (What People Usually Buy)`);
        companionRecommendations.forEach(comp => {
          lines.push(`* **${comp.relationship}**: ${comp.typicalBuyRatio}`);
        });
        lines.push(`* *Workshop Pro-Tip*: Consolidating fasteners and companion mating fittings onto a single Indus Code purchase order reduces freight overhead by up to 28%.`);
        lines.push('');
      }

      lines.push(`👉 *Click on any product card or companion card below to inspect full specifications, dimensional drawings, and supplier stock.*`);
    }

    const actions: ChatMessage['suggestedActions'] = enrichedInfo.map(({ product }) => ({
      label: `View ${product.indusCode}`,
      action: 'select_product',
      product,
    }));

    companionRecommendations.forEach(comp => {
      actions.push({
        label: `Companion: ${comp.product.indusCode}`,
        action: 'select_product',
        product: comp.product,
      });
    });

    actions.push({
      label: detectedLanguage === 'hindi' ? 'कैटलॉग में सर्च करें' : detectedLanguage === 'hinglish' ? 'Catalog Search' : 'Search All in Catalog',
      action: 'search',
      searchQuery: userQuery,
    });

    return { text: lines.join('\n'), actions };
  }

  // Matched only suppliers
  if (matchedSuppliers.length > 0) {
    const lines: string[] = [];
    if (detectedLanguage === 'hindi') {
      lines.push(`आपकी खोज **"${userQuery}"** के अनुसार सत्यापित सप्लायर:\n`);
      matchedSuppliers.forEach(s => {
        lines.push(`* **${s.businessName}** (${s.businessType.toUpperCase()})`);
        lines.push(`  * 📍 स्थान: **${s.city}, ${s.state}**`);
        lines.push(`  * सत्यापन: प्रमाणित B2B पार्टनर (GST: \`${s.gstNumber || 'सत्यापित'}\`)`);
        lines.push(`  * पता: ${s.address} (पिन: ${s.pinCode})`);
        lines.push(`  * संपर्क: ${s.phone} | ${s.email}`);
      });
      lines.push('\nसप्लायर डायरेक्टरी में सभी रजिस्टर्ड सप्लायर व उनके कैटलॉग देखें।');
    } else if (detectedLanguage === 'hinglish') {
      lines.push(`**"${userQuery}"** se match karte hue verified suppliers:\n`);
      matchedSuppliers.forEach(s => {
        lines.push(`* **${s.businessName}** (${s.businessType.toUpperCase()})`);
        lines.push(`  * 📍 Location: **${s.city}, ${s.state}**`);
        lines.push(`  * Verification: Verified B2B Partner (GST: \`${s.gstNumber || 'Active'}\`)`);
        lines.push(`  * Address: ${s.address} (PIN: ${s.pinCode})`);
        lines.push(`  * Contact: ${s.phone} | ${s.email}`);
      });
      lines.push('\nAap Supplier Directory me jaakar poori list dekh sakte hain.');
    } else {
      lines.push(`Here are verified industrial suppliers matching **"${userQuery}"**:\n`);
      matchedSuppliers.forEach(s => {
        lines.push(`* **${s.businessName}** (${s.businessType.toUpperCase()})`);
        lines.push(`  * 📍 Location: **${s.city}, ${s.state}**`);
        lines.push(`  * Verification: Verified B2B Partner (GST: \`${s.gstNumber || 'Active'}\`)`);
        lines.push(`  * Address: ${s.address} (PIN: ${s.pinCode})`);
        lines.push(`  * Contact: ${s.phone} | ${s.email}`);
      });
      lines.push('\nYou can explore all registered suppliers and their catalog listings in the Supplier Directory.');
    }

    return {
      text: lines.join('\n'),
      actions: [
        { label: 'Open Supplier Directory', action: 'navigate', targetTab: 'suppliers' },
        { label: 'Register as a Supplier', action: 'navigate', targetTab: 'supplier-register' },
      ],
    };
  }

  // Unlisted item
  if (detectedLanguage === 'hindi') {
    return {
      text: `### अनलिस्टेड आइटम (Unlisted in Database)\n\nआपकी खोज **"${userQuery}"** के लिए वर्तमान में कोई स्थायी इंडस कोड आवंटित नहीं है।\n\n* **ऐसा क्यों है?** इंडस कोड में हर उत्पाद को विनिर्देश सत्यापन और डुप्लीकेट रोकथाम जांच के बाद ही कोड दिया जाता है।\n* **इसे कैसे लिस्ट कराएं?** आप या आपके सप्लायर **Request Indus Code** पोर्टल से विनिर्देश और फोटो के साथ प्रस्ताव सबमिट कर सकते हैं।\n\nक्या आप संबंधित कैटेगरी खोजना चाहते हैं या नया कोड प्रस्तावित करना चाहते हैं?`,
      actions: [
        { label: 'नया इंडस कोड रिक्वेस्ट करें', action: 'navigate', targetTab: 'request' },
        { label: 'पूरा कैटलॉग खोजें', action: 'navigate', targetTab: 'search' },
      ],
    };
  }

  if (detectedLanguage === 'hinglish') {
    return {
      text: `### Unlisted Item in Registry\n\nAapki query **"${userQuery}"** ke liye filhal koi registered Indus Code catalog me nahi mila.\n\n* **Kyun nahi mila?** Products ko strict specification verification aur duplicate prevention ke baad hi permanent code allocate hota hai.\n* **Kaise list karein?** Aap ya aapke supplier **Request Indus Code** portal par jaakar dimension aur photo submit kar sakte hain.\n\nKya aap similar category search karna chahte hain ya naya code request karna chahte hain?`,
      actions: [
        { label: 'Request New Indus Code', action: 'navigate', targetTab: 'request' },
        { label: 'Search Full Catalog', action: 'navigate', targetTab: 'search' },
      ],
    };
  }

  return {
    text: `### Unlisted Item in Registry\n\nNo product matching **"${userQuery}"** currently has an allocated canonical Indus Code in our national database.\n\n* **Why is this?** Products in INDUS CODE are assigned unique, non-reusable codes (e.g. \`IDC-SCW-000001\`) only after strict specification verification and duplicate prevention screening.\n* **How to get it listed?** You or your supplier can submit a proposal with nominal dimensions, material grade, and photos via the **Request Indus Code** portal. Once approved by our engineering auditors, a permanent code is generated for all buyers and suppliers across India to use.\n\nWould you like to search similar categories or propose a new code?`,
    actions: [
      { label: 'Request New Indus Code', action: 'navigate', targetTab: 'request' },
      { label: 'Search Full Catalog', action: 'navigate', targetTab: 'search' },
      { label: 'Find Verified Suppliers', action: 'navigate', targetTab: 'suppliers' },
    ],
  };
}

/**
 * Main query function called by the Chatbot widget
 */
export async function sendChatMessage(
  userQuery: string,
  history: ChatMessage[] = []
): Promise<ChatMessage> {
  const timestamp = new Date().toISOString();
  const apiKey = getGeminiApiKey();

  // 1. Retrieve grounded database context first (products, locations, companions, purchase habits, language)
  const grounded = await retrieveGroundedContext(userQuery);

  // Default suggested actions from grounded products and companions
  const defaultActions: ChatMessage['suggestedActions'] = grounded.products.map(p => ({
    label: `View ${p.indusCode}`,
    action: 'select_product',
    product: p,
  }));

  grounded.companionRecommendations.forEach(comp => {
    defaultActions.push({
      label: `Companion: ${comp.product.indusCode}`,
      action: 'select_product',
      product: comp.product,
    });
  });

  if (grounded.products.length === 0) {
    defaultActions.push({
      label: grounded.detectedLanguage === 'hindi' ? 'नया इंडस कोड रिक्वेस्ट करें' : 'Request Indus Code',
      action: 'navigate',
      targetTab: 'request',
    });
  }

  // 2. If Gemini API key is configured, use Gemini 2.5 Flash via @google/genai
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });

      const recentHistory = history.slice(-6);
      const conversationPrompt = recentHistory
        .map(m => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
        .join('\n\n');

      const fullPrompt = `
${grounded.contextSummaryText}

CONVERSATION HISTORY:
${conversationPrompt ? conversationPrompt : 'No previous history.'}

USER'S LATEST MESSAGE (${grounded.detectedLanguage.toUpperCase()}):
${userQuery}

INSTRUCTIONS:
1. Respond in the user's language (${grounded.detectedLanguage.toUpperCase()} - ${grounded.detectedLanguage === 'hindi' ? 'Pure Hindi (हिंदी)' : grounded.detectedLanguage === 'hinglish' ? 'Conversational Hinglish' : 'English'}).
2. Cite exact canonical specifications, physical cabinet storage bin locations, and verified supplier locations (City, State, Hub, Price, MOQ, Stock).
3. Detail "What Goes With It" using the grounded companion hardware items and technical fit.
4. Detail "What People Usually Buy" explaining real B2B workshop procurement ratios.
5. Use clear markdown with bold headings and emoji markers (📍, 🔗, 🛒).
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2,
        },
      });

      const responseText = response.text || '';
      if (responseText.trim()) {
        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: responseText.trim(),
          timestamp,
          matchedProducts: grounded.products,
          companionProducts: grounded.companionRecommendations.map(c => c.product),
          suggestedActions: defaultActions,
          modelUsed: 'gemini-2.5-flash',
          languageDetected: grounded.detectedLanguage,
        };
      }
    } catch (err: any) {
      console.warn('Gemini API call encountered an issue, gracefully falling back to Grounded Engine:', err);
    }
  }

  // 3. Fallback to Grounded Knowledge Engine (deterministic multilingual engine)
  const fallback = generateGroundedFallbackResponse(userQuery, grounded);
  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: fallback.text,
    timestamp,
    matchedProducts: grounded.products,
    companionProducts: grounded.companionRecommendations.map(c => c.product),
    suggestedActions: fallback.actions && fallback.actions.length > 0 ? fallback.actions : defaultActions,
    modelUsed: 'grounded-engine',
    languageDetected: grounded.detectedLanguage,
  };
}
