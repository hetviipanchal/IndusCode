import json
import re

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

CAT_MAP = {
    'Screws & Bolts': {'slug': 'screws-bolts', 'prefix': 'SCW', 'desc': 'Industrial and construction wood screws, machine bolts, and hex fasteners.'},
    'Nuts, Washers & Pins': {'slug': 'nuts-washers-pins', 'prefix': 'NUT', 'desc': 'Standard and high tensile metric nuts, plain washers, spring washers, and dowel pins.'},
    'Anchors & Wall Plugs': {'slug': 'anchors-wall-plugs', 'prefix': 'ANC', 'desc': 'Nylon wall plugs, wedge anchors, sleeve anchors, and heavy load wall fixings.'},
    'Plumbing & Pipe Fittings': {'slug': 'plumbing-pipe-fittings', 'prefix': 'PIP', 'desc': 'PVC, CPVC, GI, and brass pipes, elbow fittings, tees, couplers, and valves.'},
    'Adhesives, Sealants & Abrasives': {'slug': 'adhesives-sealants-abrasives', 'prefix': 'ADH', 'desc': 'Epoxy adhesives, threadlockers, silicone sealants, cutting wheels, and abrasives.'},
    'Locks & General Hardware': {'slug': 'locks-general-hardware', 'prefix': 'LCK', 'desc': 'Brass and steel padlocks, mortise locks, handles, tower bolts, and latches.'},
    'Brackets, Hinges & Latches': {'slug': 'brackets-hinges-latches', 'prefix': 'HNG', 'desc': 'Heavy duty L-brackets, stainless steel butt hinges, corner braces, and latches.'},
    'Hand Tools': {'slug': 'hand-tools', 'prefix': 'TLS', 'desc': 'Precision screwdrivers, spanners, pliers, hammers, wrenches, and measurement tapes.'},
    'Power Tools & Accessories': {'slug': 'power-tools-accessories', 'prefix': 'PWR', 'desc': 'HSS drill bits, cutting discs, grinding discs, router bits, and power accessories.'},
    'Electrical Fittings': {'slug': 'electrical-fittings', 'prefix': 'ELC', 'desc': 'PVC insulated copper wires, conduit pipes, switchgear, junction boxes, and connectors.'},
}

SUPPLIERS = [
    {
        'id': 'sup-1',
        'ownerUserId': 'user-sup-1',
        'businessName': 'Apex Fasteners & Hardware India',
        'businessType': 'manufacturer',
        'description': 'Leading manufacturer of industrial metric fasteners, high tensile bolts, and engineered screws.',
        'email': 'sales@apexfasteners.in',
        'phone': '+91 98250 11223',
        'address': 'Plot 44, GIDC Industrial Estate, Phase 2',
        'city': 'Rajkot',
        'state': 'Gujarat',
        'pinCode': '360002',
        'verificationStatus': 'verified',
        'gstNumber': '24AAACA9876Q1Z0',
        'createdAt': '2026-01-01T00:00:00.000Z',
        'updatedAt': '2026-01-01T00:00:00.000Z',
    },
    {
        'id': 'sup-2',
        'ownerUserId': 'user-sup-2',
        'businessName': 'Punjab Precision Tools & Engineering',
        'businessType': 'manufacturer',
        'description': 'Industrial forged hand tools, cutting discs, drill bits, and maintenance accessories.',
        'email': 'contact@punjabprecision.com',
        'phone': '+91 98140 44556',
        'address': 'Focal Point Industrial Area, Sector 5',
        'city': 'Ludhiana',
        'state': 'Punjab',
        'pinCode': '141010',
        'verificationStatus': 'verified',
        'gstNumber': '03AABCP1122A1Z5',
        'createdAt': '2026-01-02T00:00:00.000Z',
        'updatedAt': '2026-01-02T00:00:00.000Z',
    },
    {
        'id': 'sup-3',
        'ownerUserId': 'user-sup-3',
        'businessName': 'Coimbatore Industrial Piping & Valves',
        'businessType': 'wholesaler',
        'description': 'Major wholesale distributor of uPVC pressure pipes, fittings, flanges, and valves for South India.',
        'email': 'orders@coimbatorepipe.co.in',
        'phone': '+91 94430 77889',
        'address': '128 Trichy Road, Singanallur',
        'city': 'Coimbatore',
        'state': 'Tamil Nadu',
        'pinCode': '641005',
        'verificationStatus': 'verified',
        'gstNumber': '33AABCC5566D1Z2',
        'createdAt': '2026-01-03T00:00:00.000Z',
        'updatedAt': '2026-01-03T00:00:00.000Z',
    },
    {
        'id': 'sup-4',
        'ownerUserId': 'user-sup-4',
        'businessName': 'Bharat Electricals & Switchgear Wholesalers',
        'businessType': 'wholesaler',
        'description': 'Master distributor for industrial wires, circuit breakers, conduit fittings, and electrical hardware.',
        'email': 'info@bharatelectricals.in',
        'phone': '+91 98200 33445',
        'address': 'Lohar Chawl, Kalbadevi',
        'city': 'Mumbai',
        'state': 'Maharashtra',
        'pinCode': '400002',
        'verificationStatus': 'verified',
        'gstNumber': '27AAACB3344E1Z8',
        'createdAt': '2026-01-04T00:00:00.000Z',
        'updatedAt': '2026-01-04T00:00:00.000Z',
    },
    {
        'id': 'sup-5',
        'ownerUserId': 'user-sup-5',
        'businessName': 'National Architectural Locks & Latches',
        'businessType': 'distributor',
        'description': 'Direct distributor for premium brass and stainless steel butt hinges, padlocks, and architectural hardware.',
        'email': 'contact@nationallocks.in',
        'phone': '+91 98400 99881',
        'address': ' Broadway, George Town',
        'city': 'Chennai',
        'state': 'Tamil Nadu',
        'pinCode': '600108',
        'verificationStatus': 'verified',
        'gstNumber': '33AAACN9988G1Z4',
        'createdAt': '2026-01-05T00:00:00.000Z',
        'updatedAt': '2026-01-05T00:00:00.000Z',
    },
]

def main():
    with open('data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    categories = []
    for cat_name, info in CAT_MAP.items():
        categories.append({
            'id': info['slug'],
            'name': cat_name,
            'slug': info['slug'],
            'codePrefix': info['prefix'],
            'description': info['desc'],
            'active': True,
            'createdAt': '2026-01-01T00:00:00.000Z',
            'updatedAt': '2026-01-01T00:00:00.000Z',
        })

    products = []
    listings = []
    aliases = []

    # Verified featured photos for high-visibility items
    PHOTO_MAP = {
        'SCW': 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
        'NUT': 'https://images.unsplash.com/photo-1618090584176-7132b9911657?auto=format&fit=crop&w=800&q=80',
        'ANC': 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
        'PIP': 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80',
        'ADH': 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
        'LCK': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
        'HNG': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
        'TLS': 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
        'PWR': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        'ELC': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    }

    item_seq = 1
    listing_seq = 1
    alias_seq = 1

    for sheet_name, rows in data.items():
        if sheet_name == 'Read Me' or sheet_name not in CAT_MAP:
            continue
        cat_info = CAT_MAP[sheet_name]
        cat_id = cat_info['slug']
        prefix = cat_info['prefix']

        for r in rows:
            raw_code = str(r.get('Item Code') or r.get('Unnamed: 0') or '').strip()
            desc = str(r.get('Item / Description') or '').strip()
            if not raw_code or not desc or raw_code.lower() == 'none' or desc.lower() == 'none':
                continue

            spec = str(r.get('Specification / Size') or '').strip()
            mat = str(r.get('Material / Finish') or 'Standard').strip()
            unit = str(r.get('Unit') or 'pcs').strip()
            qty = int(float(r.get('Quantity on Hand') or 100))
            reorder = int(float(r.get('Reorder Level') or 20))
            storage_bin = str(r.get('Storage Bin') or 'Bin-01').strip()
            sup_name = str(r.get('Supplier') or 'Registered Industrial Supplier').strip()
            notes = str(r.get('Notes') or '').strip()

            indus_code = f"IDC-{prefix}-{item_seq:06d}"
            prod_id = f"prod-{slugify(raw_code)}"

            canonical_name = f"{desc} {spec} ({mat})".strip()
            if not spec:
                canonical_name = f"{desc} ({mat})".strip()

            # Assign photo for first few items in category, fallback for rest
            photo_url = PHOTO_MAP.get(prefix) if item_seq % 3 == 0 or item_seq <= 10 else None

            prod = {
                'id': prod_id,
                'indusCode': indus_code,
                'canonicalName': canonical_name,
                'description': f"Standardized {desc} conforming to national hardware registry specifications. Nominal dimension: {spec or 'Standard'}; Material/Finish: {mat}; Storage Bin: {storage_bin}.",
                'categoryId': cat_id,
                'specifications': {
                    'specification': spec or 'Standard',
                    'material': mat,
                    'unitOfMeasure': unit,
                    'storageLocation': storage_bin,
                    'reorderThreshold': reorder,
                    'standardPack': f"100 {unit}",
                },
                'manufacturerPartNumber': raw_code,
                'standards': ['IS / ISO Conforming' if 'iso' in notes.lower() else 'National Hardware Standard'],
                'status': 'approved',
                'createdBy': 'json_registry_ingest',
                'approvedBy': 'admin_audit',
                'createdAt': '2026-01-15T10:00:00.000Z',
                'updatedAt': '2026-01-15T10:00:00.000Z',
            }
            if photo_url:
                prod['primaryImageUrl'] = photo_url
            products.append(prod)

            # Generate Supplier Listing from the row's quantity and supplier
            sup_idx = (item_seq % len(SUPPLIERS))
            assigned_sup = SUPPLIERS[sup_idx]

            # Price estimation based on unit & category
            base_price = 4.50 if unit == 'pcs' else 45.00 if unit == 'lengths' else 120.00
            price = round(base_price + ((item_seq * 3.7) % 35), 2)

            listing = {
                'id': f"list-{listing_seq:06d}",
                'supplierId': assigned_sup['id'],
                'productId': prod_id,
                'sellerProductName': f"{assigned_sup['businessName']} - {canonical_name}",
                'sellerPartNumber': f"{assigned_sup['businessName'][:3].upper()}-{raw_code}",
                'price': price,
                'currency': 'INR',
                'unitOfSale': unit,
                'minimumOrderQuantity': 50 if unit == 'pcs' else 5,
                'stockStatus': 'in_stock' if qty > reorder else 'limited_stock',
                'stockQuantity': qty,
                'listingStatus': 'approved',
                'createdAt': '2026-01-15T12:00:00.000Z',
                'updatedAt': '2026-01-15T12:00:00.000Z',
            }
            listings.append(listing)
            listing_seq += 1

            # Alias for raw item code search
            aliases.append({
                'id': f"alias-{alias_seq}",
                'productId': prod_id,
                'alias': raw_code,
                'aliasType': 'trade_name',
                'status': 'approved',
                'createdAt': '2026-01-15T12:00:00.000Z',
            })
            alias_seq += 1

            item_seq += 1

    # Output to TypeScript
    ts_code = f"""import {{ Category, Product, ProductAlias, Supplier, SupplierListing }} from '../types';

export const SEED_CATEGORIES: Category[] = {json.dumps(categories, indent=2)};

export const SEED_SUPPLIERS: Supplier[] = {json.dumps(SUPPLIERS, indent=2)};

export const SEED_PRODUCTS: Product[] = {json.dumps(products, indent=2)};

export const SEED_LISTINGS: SupplierListing[] = {json.dumps(listings, indent=2)};

export const SEED_ALIASES: ProductAlias[] = {json.dumps(aliases, indent=2)};
"""

    with open('src/data/seedHardwareData.ts', 'w', encoding='utf-8') as out_f:
        out_f.write(ts_code)

    print(f"Generated seedHardwareData.ts successfully:")
    print(f"- Categories : {len(categories)}")
    print(f"- Products   : {len(products)}")
    print(f"- Suppliers  : {len(SUPPLIERS)}")
    print(f"- Listings   : {len(listings)}")
    print(f"- Aliases    : {len(aliases)}")

if __name__ == '__main__':
    main()
