/**
 * Pure logic for Indus Code formatting, validation, and generation rules
 * Standard format: IDC-CAT-000001
 * Prefix: 3 uppercase letters
 * Sequence: 6 digits zero-padded
 */

export const CODE_REGEX = /^IDC-[A-Z]{3}-[0-9]{6}$/;

export function isValidIndusCode(code: string): boolean {
  if (!code || typeof code !== 'string') return false;
  return CODE_REGEX.test(code.trim().toUpperCase());
}

export function formatIndusCode(categoryPrefix: string, sequenceNumber: number): string {
  const cleanPrefix = (categoryPrefix || 'GEN')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 3)
    .padEnd(3, 'X');

  const paddedSeq = Math.max(1, Math.floor(sequenceNumber))
    .toString()
    .padStart(6, '0');

  return `IDC-${cleanPrefix}-${paddedSeq}`;
}

export function extractCodeParts(code: string): { prefix: string; sequence: number } | null {
  if (!isValidIndusCode(code)) return null;
  const parts = code.trim().toUpperCase().split('-');
  return {
    prefix: parts[1],
    sequence: parseInt(parts[2], 10),
  };
}
