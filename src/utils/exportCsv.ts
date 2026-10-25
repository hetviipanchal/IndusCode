import { Product } from '../types';

export function exportCatalogToCsv(products: Product[], filename = 'indus_code_catalog.csv'): void {
  const headers = [
    'Indus Code',
    'Canonical Name',
    'Category ID',
    'Status',
    'Manufacturer Part Number',
    'Standards',
    'Specifications (JSON)',
    'Created At',
  ];

  const rows = products.map(p => [
    `"${p.indusCode}"`,
    `"${p.canonicalName.replace(/"/g, '""')}"`,
    `"${p.categoryId}"`,
    `"${p.status}"`,
    `"${(p.manufacturerPartNumber || '').replace(/"/g, '""')}"`,
    `"${(p.standards || []).join('; ').replace(/"/g, '""')}"`,
    `"${JSON.stringify(p.specifications || {}).replace(/"/g, '""')}"`,
    `"${p.createdAt}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
