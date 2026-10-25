/**
 * Pure logic for product duplicate detection, string normalization,
 * and specification attribute matching.
 */

export interface CandidateProduct {
  id: string;
  indusCode: string;
  canonicalName: string;
  categoryId: string;
  specifications?: Record<string, any>;
  manufacturerPartNumber?: string;
  aliases?: string[];
}

export interface MatchResult {
  candidate: CandidateProduct;
  score: number; // 0 to 100
  matchedFields: string[];
  isLikelyDuplicate: boolean;
  explanation: string;
}

/**
 * Normalizes a product title by removing punctuation, converting common hardware units,
 * and collapsing whitespace.
 */
export function normalizeProductName(name: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/[,\-_/\\()[\]{}|]/g, ' ')
    .replace(/\b(millimeter|millimetre|mms|mm)\b/g, 'mm')
    .replace(/\b(centimeter|centimetre|cms|cm)\b/g, 'cm')
    .replace(/\b(inch|inches|in|\b\"|\b\')\b/g, 'inch')
    .replace(/\b(stainless steel|s\.s\.|ss)\b/g, 'ss')
    .replace(/\b(mild steel|m\.s\.|ms)\b/g, 'ms')
    .replace(/(\d+)\s+(mm|cm|inch)\b/g, '$1$2')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculates token-based Jaccard similarity between two strings
 */
export function tokenSimilarity(strA: string, strB: string): number {
  const normA = normalizeProductName(strA);
  const normB = normalizeProductName(strB);
  if (!normA || !normB) return 0;
  if (normA === normB) return 1.0;

  const setA = new Set(normA.split(' '));
  const setB = new Set(normB.split(' '));

  let intersection = 0;
  for (const token of setA) {
    if (setB.has(token)) {
      intersection++;
    }
  }

  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Evaluates duplicate probability against existing catalog items
 */
export function evaluateDuplicateCandidate(
  proposed: {
    name: string;
    categoryId: string;
    specifications?: Record<string, any>;
    mpn?: string;
  },
  existing: CandidateProduct
): MatchResult {
  let score = 0;
  const matchedFields: string[] = [];

  // 1. MPN match is a very strong signal
  if (
    proposed.mpn &&
    existing.manufacturerPartNumber &&
    proposed.mpn.trim().toLowerCase() === existing.manufacturerPartNumber.trim().toLowerCase()
  ) {
    score += 50;
    matchedFields.push('MPN Match');
  }

  // 2. Category match gives base confidence
  const isSameCategory = proposed.categoryId && existing.categoryId && proposed.categoryId === existing.categoryId;
  if (isSameCategory) {
    score += 15;
    matchedFields.push('Category Match');
  }

  // 3. Name token similarity
  const sim = tokenSimilarity(proposed.name, existing.canonicalName);
  score += Math.round(sim * 45);
  if (sim >= 0.7) {
    matchedFields.push(`High Name Similarity (${Math.round(sim * 100)}%)`);
  } else if (sim >= 0.4) {
    matchedFields.push(`Partial Name Similarity (${Math.round(sim * 100)}%)`);
  }

  // 4. Aliases match
  if (existing.aliases && existing.aliases.length > 0) {
    const proposedNorm = normalizeProductName(proposed.name);
    for (const alias of existing.aliases) {
      if (normalizeProductName(alias) === proposedNorm) {
        score += 30;
        matchedFields.push(`Exact Alias Match: "${alias}"`);
        break;
      }
    }
  }

  // 5. Specification comparison
  if (proposed.specifications && existing.specifications) {
    let specMatches = 0;
    let specKeysChecked = 0;
    for (const [key, val] of Object.entries(proposed.specifications)) {
      if (val && existing.specifications[key]) {
        specKeysChecked++;
        const pVal = String(val).trim().toLowerCase();
        const eVal = String(existing.specifications[key]).trim().toLowerCase();
        if (pVal === eVal) {
          specMatches++;
        }
      }
    }
    if (specKeysChecked > 0) {
      const specRatio = specMatches / specKeysChecked;
      score += Math.round(specRatio * 20);
      if (specRatio > 0.5) {
        matchedFields.push(`Matching Specs (${specMatches}/${specKeysChecked})`);
      }
    }
  }

  const boundedScore = Math.min(100, Math.max(0, score));
  const isLikelyDuplicate = boundedScore >= 70;

  let explanation = '';
  if (boundedScore >= 85) {
    explanation = 'High probability this product already exists in the Indus Code catalog.';
  } else if (boundedScore >= 70) {
    explanation = 'Possible duplicate detected based on title, category and technical attributes.';
  } else if (boundedScore >= 40) {
    explanation = 'Partial similarity with an existing product in this category.';
  } else {
    explanation = 'Low similarity with existing items.';
  }

  return {
    candidate: existing,
    score: boundedScore,
    matchedFields,
    isLikelyDuplicate,
    explanation,
  };
}
