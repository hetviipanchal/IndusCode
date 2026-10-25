import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidIndusCode,
  formatIndusCode,
  extractCodeParts,
} from './codeGeneratorLogic.ts';
import {
  normalizeProductName,
  tokenSimilarity,
  evaluateDuplicateCandidate,
} from './matchingLogic.ts';

test('Indus Code formatting produces compliant code format', () => {
  const code1 = formatIndusCode('FST', 1);
  assert.equal(code1, 'IDC-FST-000001');
  assert.equal(isValidIndusCode(code1), true);

  const code2 = formatIndusCode('pip', 42);
  assert.equal(code2, 'IDC-PIP-000042');
  assert.equal(isValidIndusCode(code2), true);

  const code3 = formatIndusCode('FASTENERS', 999999);
  assert.equal(code3, 'IDC-FAS-999999');
  assert.equal(isValidIndusCode(code3), true);
});

test('Indus Code validation rejects invalid formats', () => {
  assert.equal(isValidIndusCode(''), false);
  assert.equal(isValidIndusCode('INVALID-CODE'), false);
  assert.equal(isValidIndusCode('IDC-FST-1'), false);
  assert.equal(isValidIndusCode('IDC-FST-00001'), false); // 5 digits
  assert.equal(isValidIndusCode('IDC-FST-0000001'), false); // 7 digits
  assert.equal(isValidIndusCode('INDUS-FST-000001'), false);
  assert.equal(isValidIndusCode('IDC-FST-000001 '), true); // trim handles whitespace
});

test('extractCodeParts parses prefix and sequence number', () => {
  const parsed = extractCodeParts('IDC-BRG-000123');
  assert.notEqual(parsed, null);
  assert.equal(parsed?.prefix, 'BRG');
  assert.equal(parsed?.sequence, 123);

  assert.equal(extractCodeParts('bad-code'), null);
});

test('normalizeProductName standardizes common hardware terms and dimensions', () => {
  const norm1 = normalizeProductName('Hex Bolt M10 x 50mm, Stainless Steel 304');
  const norm2 = normalizeProductName('hex bolt m10 x 50 mm ss 304');
  assert.equal(norm1, 'hex bolt m10 x 50mm ss 304');
  assert.equal(norm2, 'hex bolt m10 x 50mm ss 304');
  assert.equal(norm1, norm2);

  const sim = tokenSimilarity(norm1, norm2);
  assert.equal(sim, 1.0);
});

test('evaluateDuplicateCandidate flags exact and high-similarity submissions', () => {
  const existingProduct = {
    id: 'prod-1',
    indusCode: 'IDC-FST-000001',
    canonicalName: 'Hex Head Bolt M10 x 50mm Grade 8.8 Full Thread',
    categoryId: 'fasteners',
    manufacturerPartNumber: 'HB-M10-50-88',
    specifications: {
      material: 'Carbon Steel',
      grade: '8.8',
      thread: 'M10',
    },
    aliases: ['M10x50 Machine Bolt', '10mm Full Thread Bolt'],
  };

  // Exact MPN match + category match
  const duplicateSubmission = {
    name: 'Hexagonal Bolt 10mm x 50mm High Tensile',
    categoryId: 'fasteners',
    mpn: 'HB-M10-50-88',
  };
  const result1 = evaluateDuplicateCandidate(duplicateSubmission, existingProduct);
  assert.ok(result1.score >= 70);
  assert.equal(result1.isLikelyDuplicate, true);
  assert.ok(result1.matchedFields.includes('MPN Match'));

  // Unrelated product
  const unrelatedSubmission = {
    name: 'PVC Plumbing Elbow 90 Degree 25mm',
    categoryId: 'pipes',
    mpn: 'PVC-ELB-25',
  };
  const result2 = evaluateDuplicateCandidate(unrelatedSubmission, existingProduct);
  assert.ok(result2.score < 30);
  assert.equal(result2.isLikelyDuplicate, false);
});
