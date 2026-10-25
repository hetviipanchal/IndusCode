import { Category, Product, ProductAlias, Supplier, SupplierListing } from '../types';

export const SEED_CATEGORIES: Category[] = [
  {
    "id": "screws-bolts",
    "name": "Screws & Bolts",
    "slug": "screws-bolts",
    "codePrefix": "SCW",
    "description": "Industrial and construction wood screws, machine bolts, and hex fasteners.",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "nuts-washers-pins",
    "name": "Nuts, Washers & Pins",
    "slug": "nuts-washers-pins",
    "codePrefix": "NUT",
    "description": "Standard and high tensile metric nuts, plain washers, spring washers, and dowel pins.",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "anchors-wall-plugs",
    "name": "Anchors & Wall Plugs",
    "slug": "anchors-wall-plugs",
    "codePrefix": "ANC",
    "description": "Nylon wall plugs, wedge anchors, sleeve anchors, and heavy load wall fixings.",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "plumbing-pipe-fittings",
    "name": "Plumbing & Pipe Fittings",
    "slug": "plumbing-pipe-fittings",
    "codePrefix": "PIP",
    "description": "PVC, CPVC, GI, and brass pipes, elbow fittings, tees, couplers, and valves.",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "adhesives-sealants-abrasives",
    "name": "Adhesives, Sealants & Abrasives",
    "slug": "adhesives-sealants-abrasives",
    "codePrefix": "ADH",
    "description": "Epoxy adhesives, threadlockers, silicone sealants, cutting wheels, and abrasives.",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "locks-general-hardware",
    "name": "Locks & General Hardware",
    "slug": "locks-general-hardware",
    "codePrefix": "LCK",
    "description": "Brass and steel padlocks, mortise locks, handles, tower bolts, and latches.",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brackets-hinges-latches",
    "name": "Brackets, Hinges & Latches",
    "slug": "brackets-hinges-latches",
    "codePrefix": "HNG",
    "description": "Heavy duty L-brackets, stainless steel butt hinges, corner braces, and latches.",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "hand-tools",
    "name": "Hand Tools",
    "slug": "hand-tools",
    "codePrefix": "TLS",
    "description": "Precision screwdrivers, spanners, pliers, hammers, wrenches, and measurement tapes.",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "power-tools-accessories",
    "name": "Power Tools & Accessories",
    "slug": "power-tools-accessories",
    "codePrefix": "PWR",
    "description": "HSS drill bits, cutting discs, grinding discs, router bits, and power accessories.",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "electrical-fittings",
    "name": "Electrical Fittings",
    "slug": "electrical-fittings",
    "codePrefix": "ELC",
    "description": "PVC insulated copper wires, conduit pipes, switchgear, junction boxes, and connectors.",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
];

export const SEED_SUPPLIERS: Supplier[] = [
  {
    "id": "sup-1",
    "ownerUserId": "user-sup-1",
    "businessName": "Apex Fasteners & Hardware India",
    "businessType": "manufacturer",
    "description": "Leading manufacturer of industrial metric fasteners, high tensile bolts, and engineered screws.",
    "email": "sales@apexfasteners.in",
    "phone": "+91 98250 11223",
    "address": "Plot 44, GIDC Industrial Estate, Phase 2",
    "city": "Rajkot",
    "state": "Gujarat",
    "pinCode": "360002",
    "verificationStatus": "verified",
    "gstNumber": "24AAACA9876Q1Z0",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "sup-2",
    "ownerUserId": "user-sup-2",
    "businessName": "Punjab Precision Tools & Engineering",
    "businessType": "manufacturer",
    "description": "Industrial forged hand tools, cutting discs, drill bits, and maintenance accessories.",
    "email": "contact@punjabprecision.com",
    "phone": "+91 98140 44556",
    "address": "Focal Point Industrial Area, Sector 5",
    "city": "Ludhiana",
    "state": "Punjab",
    "pinCode": "141010",
    "verificationStatus": "verified",
    "gstNumber": "03AABCP1122A1Z5",
    "createdAt": "2026-01-02T00:00:00.000Z",
    "updatedAt": "2026-01-02T00:00:00.000Z"
  },
  {
    "id": "sup-3",
    "ownerUserId": "user-sup-3",
    "businessName": "Coimbatore Industrial Piping & Valves",
    "businessType": "wholesaler",
    "description": "Major wholesale distributor of uPVC pressure pipes, fittings, flanges, and valves for South India.",
    "email": "orders@coimbatorepipe.co.in",
    "phone": "+91 94430 77889",
    "address": "128 Trichy Road, Singanallur",
    "city": "Coimbatore",
    "state": "Tamil Nadu",
    "pinCode": "641005",
    "verificationStatus": "verified",
    "gstNumber": "33AABCC5566D1Z2",
    "createdAt": "2026-01-03T00:00:00.000Z",
    "updatedAt": "2026-01-03T00:00:00.000Z"
  },
  {
    "id": "sup-4",
    "ownerUserId": "user-sup-4",
    "businessName": "Bharat Electricals & Switchgear Wholesalers",
    "businessType": "wholesaler",
    "description": "Master distributor for industrial wires, circuit breakers, conduit fittings, and electrical hardware.",
    "email": "info@bharatelectricals.in",
    "phone": "+91 98200 33445",
    "address": "Lohar Chawl, Kalbadevi",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pinCode": "400002",
    "verificationStatus": "verified",
    "gstNumber": "27AAACB3344E1Z8",
    "createdAt": "2026-01-04T00:00:00.000Z",
    "updatedAt": "2026-01-04T00:00:00.000Z"
  },
  {
    "id": "sup-5",
    "ownerUserId": "user-sup-5",
    "businessName": "National Architectural Locks & Latches",
    "businessType": "distributor",
    "description": "Direct distributor for premium brass and stainless steel butt hinges, padlocks, and architectural hardware.",
    "email": "contact@nationallocks.in",
    "phone": "+91 98400 99881",
    "address": " Broadway, George Town",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "pinCode": "600108",
    "verificationStatus": "verified",
    "gstNumber": "33AAACN9988G1Z4",
    "createdAt": "2026-01-05T00:00:00.000Z",
    "updatedAt": "2026-01-05T00:00:00.000Z"
  }
];

export const SEED_PRODUCTS: Product[] = [
  {
    "id": "prod-sc-0001",
    "indusCode": "IDC-SCW-000001",
    "canonicalName": "Wood screw 3\u00d712 mm (Mixed / standard)",
    "description": "Standardized Wood screw conforming to national hardware registry specifications. Nominal dimension: 3\u00d712 mm; Material/Finish: Mixed / standard; Storage Bin: Electrical Shelf.",
    "categoryId": "screws-bolts",
    "specifications": {
      "specification": "3\u00d712 mm",
      "material": "Mixed / standard",
      "unitOfMeasure": "pcs",
      "storageLocation": "Electrical Shelf",
      "reorderThreshold": 33,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "SC-0001",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-sc-0002",
    "indusCode": "IDC-SCW-000002",
    "canonicalName": "Wood screw 3\u00d720 mm (As supplied)",
    "description": "Standardized Wood screw conforming to national hardware registry specifications. Nominal dimension: 3\u00d720 mm; Material/Finish: As supplied; Storage Bin: B1-02.",
    "categoryId": "screws-bolts",
    "specifications": {
      "specification": "3\u00d720 mm",
      "material": "As supplied",
      "unitOfMeasure": "pcs",
      "storageLocation": "B1-02",
      "reorderThreshold": 29,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "SC-0002",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-sc-0003",
    "indusCode": "IDC-SCW-000003",
    "canonicalName": "Wood screw 3.5\u00d725 mm (Standard)",
    "description": "Standardized Wood screw conforming to national hardware registry specifications. Nominal dimension: 3.5\u00d725 mm; Material/Finish: Standard; Storage Bin: C1-01.",
    "categoryId": "screws-bolts",
    "specifications": {
      "specification": "3.5\u00d725 mm",
      "material": "Standard",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-01",
      "reorderThreshold": 57,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "SC-0003",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-sc-0004",
    "indusCode": "IDC-SCW-000004",
    "canonicalName": "Wood screw 4\u00d730 mm (Zinc plated)",
    "description": "Standardized Wood screw conforming to national hardware registry specifications. Nominal dimension: 4\u00d730 mm; Material/Finish: Zinc plated; Storage Bin: C1-02.",
    "categoryId": "screws-bolts",
    "specifications": {
      "specification": "4\u00d730 mm",
      "material": "Zinc plated",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-02",
      "reorderThreshold": 10,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "SC-0004",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-sc-0005",
    "indusCode": "IDC-SCW-000005",
    "canonicalName": "Wood screw 4\u00d740 mm (PVC)",
    "description": "Standardized Wood screw conforming to national hardware registry specifications. Nominal dimension: 4\u00d740 mm; Material/Finish: PVC; Storage Bin: Plumbing Shelf.",
    "categoryId": "screws-bolts",
    "specifications": {
      "specification": "4\u00d740 mm",
      "material": "PVC",
      "unitOfMeasure": "pcs",
      "storageLocation": "Plumbing Shelf",
      "reorderThreshold": 49,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "SC-0005",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-sc-0006",
    "indusCode": "IDC-SCW-000006",
    "canonicalName": "Wood screw 5\u00d750 mm (As supplied)",
    "description": "Standardized Wood screw conforming to national hardware registry specifications. Nominal dimension: 5\u00d750 mm; Material/Finish: As supplied; Storage Bin: A1-02.",
    "categoryId": "screws-bolts",
    "specifications": {
      "specification": "5\u00d750 mm",
      "material": "As supplied",
      "unitOfMeasure": "pcs",
      "storageLocation": "A1-02",
      "reorderThreshold": 34,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "SC-0006",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-sc-0007",
    "indusCode": "IDC-SCW-000007",
    "canonicalName": "Wood screw 6\u00d760 mm (As supplied)",
    "description": "Standardized Wood screw conforming to national hardware registry specifications. Nominal dimension: 6\u00d760 mm; Material/Finish: As supplied; Storage Bin: C1-01.",
    "categoryId": "screws-bolts",
    "specifications": {
      "specification": "6\u00d760 mm",
      "material": "As supplied",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-01",
      "reorderThreshold": 57,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "SC-0007",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-sc-0008",
    "indusCode": "IDC-SCW-000008",
    "canonicalName": "Machine screw M3\u00d76 (As supplied)",
    "description": "Standardized Machine screw conforming to national hardware registry specifications. Nominal dimension: M3\u00d76; Material/Finish: As supplied; Storage Bin: Tool Rack.",
    "categoryId": "screws-bolts",
    "specifications": {
      "specification": "M3\u00d76",
      "material": "As supplied",
      "unitOfMeasure": "pcs",
      "storageLocation": "Tool Rack",
      "reorderThreshold": 12,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "SC-0008",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-sc-0009",
    "indusCode": "IDC-SCW-000009",
    "canonicalName": "Machine screw M3\u00d710 (Black oxide)",
    "description": "Standardized Machine screw conforming to national hardware registry specifications. Nominal dimension: M3\u00d710; Material/Finish: Black oxide; Storage Bin: A1-02.",
    "categoryId": "screws-bolts",
    "specifications": {
      "specification": "M3\u00d710",
      "material": "Black oxide",
      "unitOfMeasure": "pcs",
      "storageLocation": "A1-02",
      "reorderThreshold": 47,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "SC-0009",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-sc-0010",
    "indusCode": "IDC-SCW-000010",
    "canonicalName": "Machine screw M4\u00d710 (Zinc plated)",
    "description": "Standardized Machine screw conforming to national hardware registry specifications. Nominal dimension: M4\u00d710; Material/Finish: Zinc plated; Storage Bin: Fasteners Drawer.",
    "categoryId": "screws-bolts",
    "specifications": {
      "specification": "M4\u00d710",
      "material": "Zinc plated",
      "unitOfMeasure": "pcs",
      "storageLocation": "Fasteners Drawer",
      "reorderThreshold": 11,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "SC-0010",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-nu-0001",
    "indusCode": "IDC-NUT-000011",
    "canonicalName": "Hex nut M3 (Stainless steel)",
    "description": "Standardized Hex nut conforming to national hardware registry specifications. Nominal dimension: M3; Material/Finish: Stainless steel; Storage Bin: A2-01.",
    "categoryId": "nuts-washers-pins",
    "specifications": {
      "specification": "M3",
      "material": "Stainless steel",
      "unitOfMeasure": "pcs",
      "storageLocation": "A2-01",
      "reorderThreshold": 32,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "NU-0001",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-nu-0002",
    "indusCode": "IDC-NUT-000012",
    "canonicalName": "Hex nut M4 (As supplied)",
    "description": "Standardized Hex nut conforming to national hardware registry specifications. Nominal dimension: M4; Material/Finish: As supplied; Storage Bin: A2-01.",
    "categoryId": "nuts-washers-pins",
    "specifications": {
      "specification": "M4",
      "material": "As supplied",
      "unitOfMeasure": "pcs",
      "storageLocation": "A2-01",
      "reorderThreshold": 25,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "NU-0002",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1618090584176-7132b9911657?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-nu-0003",
    "indusCode": "IDC-NUT-000013",
    "canonicalName": "Hex nut M5 (Stainless steel)",
    "description": "Standardized Hex nut conforming to national hardware registry specifications. Nominal dimension: M5; Material/Finish: Stainless steel; Storage Bin: C1-02.",
    "categoryId": "nuts-washers-pins",
    "specifications": {
      "specification": "M5",
      "material": "Stainless steel",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-02",
      "reorderThreshold": 16,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "NU-0003",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-nu-0004",
    "indusCode": "IDC-NUT-000014",
    "canonicalName": "Hex nut M6 (As supplied)",
    "description": "Standardized Hex nut conforming to national hardware registry specifications. Nominal dimension: M6; Material/Finish: As supplied; Storage Bin: B2-01.",
    "categoryId": "nuts-washers-pins",
    "specifications": {
      "specification": "M6",
      "material": "As supplied",
      "unitOfMeasure": "pcs",
      "storageLocation": "B2-01",
      "reorderThreshold": 54,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "NU-0004",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-nu-0005",
    "indusCode": "IDC-NUT-000015",
    "canonicalName": "Hex nut M8 (Galvanised)",
    "description": "Standardized Hex nut conforming to national hardware registry specifications. Nominal dimension: M8; Material/Finish: Galvanised; Storage Bin: C1-01.",
    "categoryId": "nuts-washers-pins",
    "specifications": {
      "specification": "M8",
      "material": "Galvanised",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-01",
      "reorderThreshold": 64,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "NU-0005",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1618090584176-7132b9911657?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-nu-0006",
    "indusCode": "IDC-NUT-000016",
    "canonicalName": "Hex nut M10 (Rubber)",
    "description": "Standardized Hex nut conforming to national hardware registry specifications. Nominal dimension: M10; Material/Finish: Rubber; Storage Bin: Plumbing Shelf.",
    "categoryId": "nuts-washers-pins",
    "specifications": {
      "specification": "M10",
      "material": "Rubber",
      "unitOfMeasure": "pcs",
      "storageLocation": "Plumbing Shelf",
      "reorderThreshold": 47,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "NU-0006",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-nu-0007",
    "indusCode": "IDC-NUT-000017",
    "canonicalName": "Hex nut M12 (Zinc plated)",
    "description": "Standardized Hex nut conforming to national hardware registry specifications. Nominal dimension: M12; Material/Finish: Zinc plated; Storage Bin: Electrical Shelf.",
    "categoryId": "nuts-washers-pins",
    "specifications": {
      "specification": "M12",
      "material": "Zinc plated",
      "unitOfMeasure": "pcs",
      "storageLocation": "Electrical Shelf",
      "reorderThreshold": 36,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "NU-0007",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-nu-0008",
    "indusCode": "IDC-NUT-000018",
    "canonicalName": "Nyloc nut M4 (PVC)",
    "description": "Standardized Nyloc nut conforming to national hardware registry specifications. Nominal dimension: M4; Material/Finish: PVC; Storage Bin: A2-02.",
    "categoryId": "nuts-washers-pins",
    "specifications": {
      "specification": "M4",
      "material": "PVC",
      "unitOfMeasure": "pcs",
      "storageLocation": "A2-02",
      "reorderThreshold": 15,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "NU-0008",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1618090584176-7132b9911657?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-nu-0009",
    "indusCode": "IDC-NUT-000019",
    "canonicalName": "Nyloc nut M5 (Mixed / standard)",
    "description": "Standardized Nyloc nut conforming to national hardware registry specifications. Nominal dimension: M5; Material/Finish: Mixed / standard; Storage Bin: C1-01.",
    "categoryId": "nuts-washers-pins",
    "specifications": {
      "specification": "M5",
      "material": "Mixed / standard",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-01",
      "reorderThreshold": 11,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "NU-0009",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-nu-0010",
    "indusCode": "IDC-NUT-000020",
    "canonicalName": "Nyloc nut M6 (Zinc plated)",
    "description": "Standardized Nyloc nut conforming to national hardware registry specifications. Nominal dimension: M6; Material/Finish: Zinc plated; Storage Bin: B1-02.",
    "categoryId": "nuts-washers-pins",
    "specifications": {
      "specification": "M6",
      "material": "Zinc plated",
      "unitOfMeasure": "pcs",
      "storageLocation": "B1-02",
      "reorderThreshold": 41,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "NU-0010",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-an-0001",
    "indusCode": "IDC-ANC-000021",
    "canonicalName": "Nylon wall plug 5 mm (As supplied)",
    "description": "Standardized Nylon wall plug conforming to national hardware registry specifications. Nominal dimension: 5 mm; Material/Finish: As supplied; Storage Bin: C1-02.",
    "categoryId": "anchors-wall-plugs",
    "specifications": {
      "specification": "5 mm",
      "material": "As supplied",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-02",
      "reorderThreshold": 59,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "AN-0001",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-an-0002",
    "indusCode": "IDC-ANC-000022",
    "canonicalName": "Nylon wall plug 6 mm (Nylon)",
    "description": "Standardized Nylon wall plug conforming to national hardware registry specifications. Nominal dimension: 6 mm; Material/Finish: Nylon; Storage Bin: Plumbing Shelf.",
    "categoryId": "anchors-wall-plugs",
    "specifications": {
      "specification": "6 mm",
      "material": "Nylon",
      "unitOfMeasure": "pcs",
      "storageLocation": "Plumbing Shelf",
      "reorderThreshold": 54,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "AN-0002",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-an-0003",
    "indusCode": "IDC-ANC-000023",
    "canonicalName": "Nylon wall plug 8 mm (Rubber)",
    "description": "Standardized Nylon wall plug conforming to national hardware registry specifications. Nominal dimension: 8 mm; Material/Finish: Rubber; Storage Bin: B1-01.",
    "categoryId": "anchors-wall-plugs",
    "specifications": {
      "specification": "8 mm",
      "material": "Rubber",
      "unitOfMeasure": "pcs",
      "storageLocation": "B1-01",
      "reorderThreshold": 29,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "AN-0003",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-an-0004",
    "indusCode": "IDC-ANC-000024",
    "canonicalName": "Nylon wall plug 10 mm (Rubber)",
    "description": "Standardized Nylon wall plug conforming to national hardware registry specifications. Nominal dimension: 10 mm; Material/Finish: Rubber; Storage Bin: C1-02.",
    "categoryId": "anchors-wall-plugs",
    "specifications": {
      "specification": "10 mm",
      "material": "Rubber",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-02",
      "reorderThreshold": 24,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "AN-0004",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-an-0005",
    "indusCode": "IDC-ANC-000025",
    "canonicalName": "Nylon wall plug 12 mm (As supplied)",
    "description": "Standardized Nylon wall plug conforming to national hardware registry specifications. Nominal dimension: 12 mm; Material/Finish: As supplied; Storage Bin: Workshop Cabinet.",
    "categoryId": "anchors-wall-plugs",
    "specifications": {
      "specification": "12 mm",
      "material": "As supplied",
      "unitOfMeasure": "pcs",
      "storageLocation": "Workshop Cabinet",
      "reorderThreshold": 10,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "AN-0005",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-an-0006",
    "indusCode": "IDC-ANC-000026",
    "canonicalName": "Expansion anchor M6\u00d750 (Stainless steel)",
    "description": "Standardized Expansion anchor conforming to national hardware registry specifications. Nominal dimension: M6\u00d750; Material/Finish: Stainless steel; Storage Bin: B1-01.",
    "categoryId": "anchors-wall-plugs",
    "specifications": {
      "specification": "M6\u00d750",
      "material": "Stainless steel",
      "unitOfMeasure": "pcs",
      "storageLocation": "B1-01",
      "reorderThreshold": 24,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "AN-0006",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-an-0007",
    "indusCode": "IDC-ANC-000027",
    "canonicalName": "Expansion anchor M8\u00d760 (Galvanised)",
    "description": "Standardized Expansion anchor conforming to national hardware registry specifications. Nominal dimension: M8\u00d760; Material/Finish: Galvanised; Storage Bin: Fasteners Drawer.",
    "categoryId": "anchors-wall-plugs",
    "specifications": {
      "specification": "M8\u00d760",
      "material": "Galvanised",
      "unitOfMeasure": "pcs",
      "storageLocation": "Fasteners Drawer",
      "reorderThreshold": 57,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "AN-0007",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-an-0008",
    "indusCode": "IDC-ANC-000028",
    "canonicalName": "Expansion anchor M10\u00d775 (Rubber)",
    "description": "Standardized Expansion anchor conforming to national hardware registry specifications. Nominal dimension: M10\u00d775; Material/Finish: Rubber; Storage Bin: B1-02.",
    "categoryId": "anchors-wall-plugs",
    "specifications": {
      "specification": "M10\u00d775",
      "material": "Rubber",
      "unitOfMeasure": "pcs",
      "storageLocation": "B1-02",
      "reorderThreshold": 16,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "AN-0008",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-an-0009",
    "indusCode": "IDC-ANC-000029",
    "canonicalName": "Expansion anchor M12\u00d7100 (As supplied)",
    "description": "Standardized Expansion anchor conforming to national hardware registry specifications. Nominal dimension: M12\u00d7100; Material/Finish: As supplied; Storage Bin: Electrical Shelf.",
    "categoryId": "anchors-wall-plugs",
    "specifications": {
      "specification": "M12\u00d7100",
      "material": "As supplied",
      "unitOfMeasure": "pcs",
      "storageLocation": "Electrical Shelf",
      "reorderThreshold": 35,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "AN-0009",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-an-0010",
    "indusCode": "IDC-ANC-000030",
    "canonicalName": "Wedge anchor M8\u00d775 (Black oxide)",
    "description": "Standardized Wedge anchor conforming to national hardware registry specifications. Nominal dimension: M8\u00d775; Material/Finish: Black oxide; Storage Bin: C1-02.",
    "categoryId": "anchors-wall-plugs",
    "specifications": {
      "specification": "M8\u00d775",
      "material": "Black oxide",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-02",
      "reorderThreshold": 32,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "AN-0010",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-pl-0001",
    "indusCode": "IDC-PIP-000031",
    "canonicalName": "PVC pipe 15 mm (Nylon)",
    "description": "Standardized PVC pipe conforming to national hardware registry specifications. Nominal dimension: 15 mm; Material/Finish: Nylon; Storage Bin: B1-02.",
    "categoryId": "plumbing-pipe-fittings",
    "specifications": {
      "specification": "15 mm",
      "material": "Nylon",
      "unitOfMeasure": "lengths",
      "storageLocation": "B1-02",
      "reorderThreshold": 65,
      "standardPack": "100 lengths"
    },
    "manufacturerPartNumber": "PL-0001",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-pl-0002",
    "indusCode": "IDC-PIP-000032",
    "canonicalName": "PVC pipe 20 mm (PVC)",
    "description": "Standardized PVC pipe conforming to national hardware registry specifications. Nominal dimension: 20 mm; Material/Finish: PVC; Storage Bin: A1-02.",
    "categoryId": "plumbing-pipe-fittings",
    "specifications": {
      "specification": "20 mm",
      "material": "PVC",
      "unitOfMeasure": "lengths",
      "storageLocation": "A1-02",
      "reorderThreshold": 42,
      "standardPack": "100 lengths"
    },
    "manufacturerPartNumber": "PL-0002",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-pl-0003",
    "indusCode": "IDC-PIP-000033",
    "canonicalName": "PVC pipe 25 mm (PVC)",
    "description": "Standardized PVC pipe conforming to national hardware registry specifications. Nominal dimension: 25 mm; Material/Finish: PVC; Storage Bin: C1-02.",
    "categoryId": "plumbing-pipe-fittings",
    "specifications": {
      "specification": "25 mm",
      "material": "PVC",
      "unitOfMeasure": "lengths",
      "storageLocation": "C1-02",
      "reorderThreshold": 22,
      "standardPack": "100 lengths"
    },
    "manufacturerPartNumber": "PL-0003",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-pl-0004",
    "indusCode": "IDC-PIP-000034",
    "canonicalName": "PVC pipe 32 mm (Rubber)",
    "description": "Standardized PVC pipe conforming to national hardware registry specifications. Nominal dimension: 32 mm; Material/Finish: Rubber; Storage Bin: A1-02.",
    "categoryId": "plumbing-pipe-fittings",
    "specifications": {
      "specification": "32 mm",
      "material": "Rubber",
      "unitOfMeasure": "lengths",
      "storageLocation": "A1-02",
      "reorderThreshold": 49,
      "standardPack": "100 lengths"
    },
    "manufacturerPartNumber": "PL-0004",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-pl-0005",
    "indusCode": "IDC-PIP-000035",
    "canonicalName": "PVC pipe 40 mm (PVC)",
    "description": "Standardized PVC pipe conforming to national hardware registry specifications. Nominal dimension: 40 mm; Material/Finish: PVC; Storage Bin: A1-02.",
    "categoryId": "plumbing-pipe-fittings",
    "specifications": {
      "specification": "40 mm",
      "material": "PVC",
      "unitOfMeasure": "lengths",
      "storageLocation": "A1-02",
      "reorderThreshold": 65,
      "standardPack": "100 lengths"
    },
    "manufacturerPartNumber": "PL-0005",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-pl-0006",
    "indusCode": "IDC-PIP-000036",
    "canonicalName": "PVC pipe 50 mm (As supplied)",
    "description": "Standardized PVC pipe conforming to national hardware registry specifications. Nominal dimension: 50 mm; Material/Finish: As supplied; Storage Bin: C1-02.",
    "categoryId": "plumbing-pipe-fittings",
    "specifications": {
      "specification": "50 mm",
      "material": "As supplied",
      "unitOfMeasure": "lengths",
      "storageLocation": "C1-02",
      "reorderThreshold": 36,
      "standardPack": "100 lengths"
    },
    "manufacturerPartNumber": "PL-0006",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-pl-0007",
    "indusCode": "IDC-PIP-000037",
    "canonicalName": "PVC elbow 15 mm (PVC)",
    "description": "Standardized PVC elbow conforming to national hardware registry specifications. Nominal dimension: 15 mm; Material/Finish: PVC; Storage Bin: Electrical Shelf.",
    "categoryId": "plumbing-pipe-fittings",
    "specifications": {
      "specification": "15 mm",
      "material": "PVC",
      "unitOfMeasure": "pcs",
      "storageLocation": "Electrical Shelf",
      "reorderThreshold": 26,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "PL-0007",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-pl-0008",
    "indusCode": "IDC-PIP-000038",
    "canonicalName": "PVC elbow 20 mm (PVC)",
    "description": "Standardized PVC elbow conforming to national hardware registry specifications. Nominal dimension: 20 mm; Material/Finish: PVC; Storage Bin: C1-02.",
    "categoryId": "plumbing-pipe-fittings",
    "specifications": {
      "specification": "20 mm",
      "material": "PVC",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-02",
      "reorderThreshold": 34,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "PL-0008",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-pl-0009",
    "indusCode": "IDC-PIP-000039",
    "canonicalName": "PVC elbow 25 mm (Rubber)",
    "description": "Standardized PVC elbow conforming to national hardware registry specifications. Nominal dimension: 25 mm; Material/Finish: Rubber; Storage Bin: C1-02.",
    "categoryId": "plumbing-pipe-fittings",
    "specifications": {
      "specification": "25 mm",
      "material": "Rubber",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-02",
      "reorderThreshold": 17,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "PL-0009",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-pl-0010",
    "indusCode": "IDC-PIP-000040",
    "canonicalName": "PVC elbow 32 mm (As supplied)",
    "description": "Standardized PVC elbow conforming to national hardware registry specifications. Nominal dimension: 32 mm; Material/Finish: As supplied; Storage Bin: A2-02.",
    "categoryId": "plumbing-pipe-fittings",
    "specifications": {
      "specification": "32 mm",
      "material": "As supplied",
      "unitOfMeasure": "pcs",
      "storageLocation": "A2-02",
      "reorderThreshold": 55,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "PL-0010",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-ad-0001",
    "indusCode": "IDC-ADH-000041",
    "canonicalName": "Epoxy adhesive 5 minute  araldite-type (As supplied)",
    "description": "Standardized Epoxy adhesive conforming to national hardware registry specifications. Nominal dimension: 5 minute  araldite-type; Material/Finish: As supplied; Storage Bin: C1-01.",
    "categoryId": "adhesives-sealants-abrasives",
    "specifications": {
      "specification": "5 minute  araldite-type",
      "material": "As supplied",
      "unitOfMeasure": "packs",
      "storageLocation": "C1-01",
      "reorderThreshold": 26,
      "standardPack": "100 packs"
    },
    "manufacturerPartNumber": "AD-0001",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-ad-0002",
    "indusCode": "IDC-ADH-000042",
    "canonicalName": "Epoxy adhesive clear 2-part (Mixed / standard)",
    "description": "Standardized Epoxy adhesive conforming to national hardware registry specifications. Nominal dimension: clear 2-part; Material/Finish: Mixed / standard; Storage Bin: C1-02.",
    "categoryId": "adhesives-sealants-abrasives",
    "specifications": {
      "specification": "clear 2-part",
      "material": "Mixed / standard",
      "unitOfMeasure": "packs",
      "storageLocation": "C1-02",
      "reorderThreshold": 38,
      "standardPack": "100 packs"
    },
    "manufacturerPartNumber": "AD-0002",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-ad-0003",
    "indusCode": "IDC-ADH-000043",
    "canonicalName": "Epoxy adhesive metal repair (Brass)",
    "description": "Standardized Epoxy adhesive conforming to national hardware registry specifications. Nominal dimension: metal repair; Material/Finish: Brass; Storage Bin: A2-02.",
    "categoryId": "adhesives-sealants-abrasives",
    "specifications": {
      "specification": "metal repair",
      "material": "Brass",
      "unitOfMeasure": "packs",
      "storageLocation": "A2-02",
      "reorderThreshold": 12,
      "standardPack": "100 packs"
    },
    "manufacturerPartNumber": "AD-0003",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-ad-0004",
    "indusCode": "IDC-ADH-000044",
    "canonicalName": "Threadlocker low strength (Mixed / standard)",
    "description": "Standardized Threadlocker conforming to national hardware registry specifications. Nominal dimension: low strength; Material/Finish: Mixed / standard; Storage Bin: C1-01.",
    "categoryId": "adhesives-sealants-abrasives",
    "specifications": {
      "specification": "low strength",
      "material": "Mixed / standard",
      "unitOfMeasure": "bottles",
      "storageLocation": "C1-01",
      "reorderThreshold": 61,
      "standardPack": "100 bottles"
    },
    "manufacturerPartNumber": "AD-0004",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-ad-0005",
    "indusCode": "IDC-ADH-000045",
    "canonicalName": "Threadlocker medium strength (As supplied)",
    "description": "Standardized Threadlocker conforming to national hardware registry specifications. Nominal dimension: medium strength; Material/Finish: As supplied; Storage Bin: A1-01.",
    "categoryId": "adhesives-sealants-abrasives",
    "specifications": {
      "specification": "medium strength",
      "material": "As supplied",
      "unitOfMeasure": "bottles",
      "storageLocation": "A1-01",
      "reorderThreshold": 17,
      "standardPack": "100 bottles"
    },
    "manufacturerPartNumber": "AD-0005",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-ad-0006",
    "indusCode": "IDC-ADH-000046",
    "canonicalName": "Threadlocker high strength (Mixed / standard)",
    "description": "Standardized Threadlocker conforming to national hardware registry specifications. Nominal dimension: high strength; Material/Finish: Mixed / standard; Storage Bin: C1-02.",
    "categoryId": "adhesives-sealants-abrasives",
    "specifications": {
      "specification": "high strength",
      "material": "Mixed / standard",
      "unitOfMeasure": "bottles",
      "storageLocation": "C1-02",
      "reorderThreshold": 44,
      "standardPack": "100 bottles"
    },
    "manufacturerPartNumber": "AD-0006",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-ad-0007",
    "indusCode": "IDC-ADH-000047",
    "canonicalName": "Silicone sealant clear (PVC)",
    "description": "Standardized Silicone sealant conforming to national hardware registry specifications. Nominal dimension: clear; Material/Finish: PVC; Storage Bin: A1-01.",
    "categoryId": "adhesives-sealants-abrasives",
    "specifications": {
      "specification": "clear",
      "material": "PVC",
      "unitOfMeasure": "tubes",
      "storageLocation": "A1-01",
      "reorderThreshold": 21,
      "standardPack": "100 tubes"
    },
    "manufacturerPartNumber": "AD-0007",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-ad-0008",
    "indusCode": "IDC-ADH-000048",
    "canonicalName": "Silicone sealant white (PVC)",
    "description": "Standardized Silicone sealant conforming to national hardware registry specifications. Nominal dimension: white; Material/Finish: PVC; Storage Bin: Plumbing Shelf.",
    "categoryId": "adhesives-sealants-abrasives",
    "specifications": {
      "specification": "white",
      "material": "PVC",
      "unitOfMeasure": "tubes",
      "storageLocation": "Plumbing Shelf",
      "reorderThreshold": 16,
      "standardPack": "100 tubes"
    },
    "manufacturerPartNumber": "AD-0008",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-ad-0009",
    "indusCode": "IDC-ADH-000049",
    "canonicalName": "Silicone sealant black (Rubber)",
    "description": "Standardized Silicone sealant conforming to national hardware registry specifications. Nominal dimension: black; Material/Finish: Rubber; Storage Bin: Workshop Cabinet.",
    "categoryId": "adhesives-sealants-abrasives",
    "specifications": {
      "specification": "black",
      "material": "Rubber",
      "unitOfMeasure": "tubes",
      "storageLocation": "Workshop Cabinet",
      "reorderThreshold": 6,
      "standardPack": "100 tubes"
    },
    "manufacturerPartNumber": "AD-0009",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-ad-0010",
    "indusCode": "IDC-ADH-000050",
    "canonicalName": "Silicone sealant grey (PVC)",
    "description": "Standardized Silicone sealant conforming to national hardware registry specifications. Nominal dimension: grey; Material/Finish: PVC; Storage Bin: Fasteners Drawer.",
    "categoryId": "adhesives-sealants-abrasives",
    "specifications": {
      "specification": "grey",
      "material": "PVC",
      "unitOfMeasure": "tubes",
      "storageLocation": "Fasteners Drawer",
      "reorderThreshold": 40,
      "standardPack": "100 tubes"
    },
    "manufacturerPartNumber": "AD-0010",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-lo-0001",
    "indusCode": "IDC-LCK-000051",
    "canonicalName": "Padlock 20 mm (PVC)",
    "description": "Standardized Padlock conforming to national hardware registry specifications. Nominal dimension: 20 mm; Material/Finish: PVC; Storage Bin: A2-01.",
    "categoryId": "locks-general-hardware",
    "specifications": {
      "specification": "20 mm",
      "material": "PVC",
      "unitOfMeasure": "pcs",
      "storageLocation": "A2-01",
      "reorderThreshold": 27,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "LO-0001",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-lo-0002",
    "indusCode": "IDC-LCK-000052",
    "canonicalName": "Padlock 30 mm (As supplied)",
    "description": "Standardized Padlock conforming to national hardware registry specifications. Nominal dimension: 30 mm; Material/Finish: As supplied; Storage Bin: C1-02.",
    "categoryId": "locks-general-hardware",
    "specifications": {
      "specification": "30 mm",
      "material": "As supplied",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-02",
      "reorderThreshold": 19,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "LO-0002",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-lo-0003",
    "indusCode": "IDC-LCK-000053",
    "canonicalName": "Padlock 40 mm (Brass)",
    "description": "Standardized Padlock conforming to national hardware registry specifications. Nominal dimension: 40 mm; Material/Finish: Brass; Storage Bin: Tool Rack.",
    "categoryId": "locks-general-hardware",
    "specifications": {
      "specification": "40 mm",
      "material": "Brass",
      "unitOfMeasure": "pcs",
      "storageLocation": "Tool Rack",
      "reorderThreshold": 17,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "LO-0003",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-lo-0004",
    "indusCode": "IDC-LCK-000054",
    "canonicalName": "Padlock 50 mm (Rubber)",
    "description": "Standardized Padlock conforming to national hardware registry specifications. Nominal dimension: 50 mm; Material/Finish: Rubber; Storage Bin: Plumbing Shelf.",
    "categoryId": "locks-general-hardware",
    "specifications": {
      "specification": "50 mm",
      "material": "Rubber",
      "unitOfMeasure": "pcs",
      "storageLocation": "Plumbing Shelf",
      "reorderThreshold": 12,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "LO-0004",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-lo-0005",
    "indusCode": "IDC-LCK-000055",
    "canonicalName": "Door handle lever set (As supplied)",
    "description": "Standardized Door handle conforming to national hardware registry specifications. Nominal dimension: lever set; Material/Finish: As supplied; Storage Bin: B2-01.",
    "categoryId": "locks-general-hardware",
    "specifications": {
      "specification": "lever set",
      "material": "As supplied",
      "unitOfMeasure": "sets",
      "storageLocation": "B2-01",
      "reorderThreshold": 58,
      "standardPack": "100 sets"
    },
    "manufacturerPartNumber": "LO-0005",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-lo-0006",
    "indusCode": "IDC-LCK-000056",
    "canonicalName": "Door handle knob set (As supplied)",
    "description": "Standardized Door handle conforming to national hardware registry specifications. Nominal dimension: knob set; Material/Finish: As supplied; Storage Bin: Plumbing Shelf.",
    "categoryId": "locks-general-hardware",
    "specifications": {
      "specification": "knob set",
      "material": "As supplied",
      "unitOfMeasure": "sets",
      "storageLocation": "Plumbing Shelf",
      "reorderThreshold": 8,
      "standardPack": "100 sets"
    },
    "manufacturerPartNumber": "LO-0006",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-lo-0007",
    "indusCode": "IDC-LCK-000057",
    "canonicalName": "Door handle pull handle 150 mm (PVC)",
    "description": "Standardized Door handle conforming to national hardware registry specifications. Nominal dimension: pull handle 150 mm; Material/Finish: PVC; Storage Bin: Electrical Shelf.",
    "categoryId": "locks-general-hardware",
    "specifications": {
      "specification": "pull handle 150 mm",
      "material": "PVC",
      "unitOfMeasure": "sets",
      "storageLocation": "Electrical Shelf",
      "reorderThreshold": 42,
      "standardPack": "100 sets"
    },
    "manufacturerPartNumber": "LO-0007",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-lo-0008",
    "indusCode": "IDC-LCK-000058",
    "canonicalName": "Door handle pull handle 300 mm (Galvanised)",
    "description": "Standardized Door handle conforming to national hardware registry specifications. Nominal dimension: pull handle 300 mm; Material/Finish: Galvanised; Storage Bin: A2-01.",
    "categoryId": "locks-general-hardware",
    "specifications": {
      "specification": "pull handle 300 mm",
      "material": "Galvanised",
      "unitOfMeasure": "sets",
      "storageLocation": "A2-01",
      "reorderThreshold": 55,
      "standardPack": "100 sets"
    },
    "manufacturerPartNumber": "LO-0008",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-lo-0009",
    "indusCode": "IDC-LCK-000059",
    "canonicalName": "Mortise lock 60 mm (Mixed / standard)",
    "description": "Standardized Mortise lock conforming to national hardware registry specifications. Nominal dimension: 60 mm; Material/Finish: Mixed / standard; Storage Bin: B1-01.",
    "categoryId": "locks-general-hardware",
    "specifications": {
      "specification": "60 mm",
      "material": "Mixed / standard",
      "unitOfMeasure": "pcs",
      "storageLocation": "B1-01",
      "reorderThreshold": 15,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "LO-0009",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-lo-0010",
    "indusCode": "IDC-LCK-000060",
    "canonicalName": "Mortise lock 70 mm (Black oxide)",
    "description": "Standardized Mortise lock conforming to national hardware registry specifications. Nominal dimension: 70 mm; Material/Finish: Black oxide; Storage Bin: A1-01.",
    "categoryId": "locks-general-hardware",
    "specifications": {
      "specification": "70 mm",
      "material": "Black oxide",
      "unitOfMeasure": "pcs",
      "storageLocation": "A1-01",
      "reorderThreshold": 39,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "LO-0010",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-br-0001",
    "indusCode": "IDC-HNG-000061",
    "canonicalName": "L-bracket 25\u00d725 mm (Mixed / standard)",
    "description": "Standardized L-bracket conforming to national hardware registry specifications. Nominal dimension: 25\u00d725 mm; Material/Finish: Mixed / standard; Storage Bin: Tool Rack.",
    "categoryId": "brackets-hinges-latches",
    "specifications": {
      "specification": "25\u00d725 mm",
      "material": "Mixed / standard",
      "unitOfMeasure": "pcs",
      "storageLocation": "Tool Rack",
      "reorderThreshold": 52,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "BR-0001",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-br-0002",
    "indusCode": "IDC-HNG-000062",
    "canonicalName": "L-bracket 40\u00d740 mm (Galvanised)",
    "description": "Standardized L-bracket conforming to national hardware registry specifications. Nominal dimension: 40\u00d740 mm; Material/Finish: Galvanised; Storage Bin: Fasteners Drawer.",
    "categoryId": "brackets-hinges-latches",
    "specifications": {
      "specification": "40\u00d740 mm",
      "material": "Galvanised",
      "unitOfMeasure": "pcs",
      "storageLocation": "Fasteners Drawer",
      "reorderThreshold": 6,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "BR-0002",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-br-0003",
    "indusCode": "IDC-HNG-000063",
    "canonicalName": "L-bracket 50\u00d750 mm (PVC)",
    "description": "Standardized L-bracket conforming to national hardware registry specifications. Nominal dimension: 50\u00d750 mm; Material/Finish: PVC; Storage Bin: A1-02.",
    "categoryId": "brackets-hinges-latches",
    "specifications": {
      "specification": "50\u00d750 mm",
      "material": "PVC",
      "unitOfMeasure": "pcs",
      "storageLocation": "A1-02",
      "reorderThreshold": 16,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "BR-0003",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-br-0004",
    "indusCode": "IDC-HNG-000064",
    "canonicalName": "L-bracket 75\u00d775 mm (Stainless steel)",
    "description": "Standardized L-bracket conforming to national hardware registry specifications. Nominal dimension: 75\u00d775 mm; Material/Finish: Stainless steel; Storage Bin: A2-01.",
    "categoryId": "brackets-hinges-latches",
    "specifications": {
      "specification": "75\u00d775 mm",
      "material": "Stainless steel",
      "unitOfMeasure": "pcs",
      "storageLocation": "A2-01",
      "reorderThreshold": 49,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "BR-0004",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-br-0005",
    "indusCode": "IDC-HNG-000065",
    "canonicalName": "L-bracket 100\u00d7100 mm (PVC)",
    "description": "Standardized L-bracket conforming to national hardware registry specifications. Nominal dimension: 100\u00d7100 mm; Material/Finish: PVC; Storage Bin: A2-02.",
    "categoryId": "brackets-hinges-latches",
    "specifications": {
      "specification": "100\u00d7100 mm",
      "material": "PVC",
      "unitOfMeasure": "pcs",
      "storageLocation": "A2-02",
      "reorderThreshold": 9,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "BR-0005",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-br-0006",
    "indusCode": "IDC-HNG-000066",
    "canonicalName": "Flat corner brace 25 mm (Stainless steel)",
    "description": "Standardized Flat corner brace conforming to national hardware registry specifications. Nominal dimension: 25 mm; Material/Finish: Stainless steel; Storage Bin: A2-02.",
    "categoryId": "brackets-hinges-latches",
    "specifications": {
      "specification": "25 mm",
      "material": "Stainless steel",
      "unitOfMeasure": "pcs",
      "storageLocation": "A2-02",
      "reorderThreshold": 40,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "BR-0006",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-br-0007",
    "indusCode": "IDC-HNG-000067",
    "canonicalName": "Flat corner brace 40 mm (Brass)",
    "description": "Standardized Flat corner brace conforming to national hardware registry specifications. Nominal dimension: 40 mm; Material/Finish: Brass; Storage Bin: B1-01.",
    "categoryId": "brackets-hinges-latches",
    "specifications": {
      "specification": "40 mm",
      "material": "Brass",
      "unitOfMeasure": "pcs",
      "storageLocation": "B1-01",
      "reorderThreshold": 13,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "BR-0007",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-br-0008",
    "indusCode": "IDC-HNG-000068",
    "canonicalName": "Flat corner brace 50 mm (As supplied)",
    "description": "Standardized Flat corner brace conforming to national hardware registry specifications. Nominal dimension: 50 mm; Material/Finish: As supplied; Storage Bin: B1-02.",
    "categoryId": "brackets-hinges-latches",
    "specifications": {
      "specification": "50 mm",
      "material": "As supplied",
      "unitOfMeasure": "pcs",
      "storageLocation": "B1-02",
      "reorderThreshold": 53,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "BR-0008",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-br-0009",
    "indusCode": "IDC-HNG-000069",
    "canonicalName": "Flat corner brace 75 mm (PVC)",
    "description": "Standardized Flat corner brace conforming to national hardware registry specifications. Nominal dimension: 75 mm; Material/Finish: PVC; Storage Bin: Electrical Shelf.",
    "categoryId": "brackets-hinges-latches",
    "specifications": {
      "specification": "75 mm",
      "material": "PVC",
      "unitOfMeasure": "pcs",
      "storageLocation": "Electrical Shelf",
      "reorderThreshold": 57,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "BR-0009",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-br-0010",
    "indusCode": "IDC-HNG-000070",
    "canonicalName": "T-plate 50 mm (Brass)",
    "description": "Standardized T-plate conforming to national hardware registry specifications. Nominal dimension: 50 mm; Material/Finish: Brass; Storage Bin: A2-02.",
    "categoryId": "brackets-hinges-latches",
    "specifications": {
      "specification": "50 mm",
      "material": "Brass",
      "unitOfMeasure": "pcs",
      "storageLocation": "A2-02",
      "reorderThreshold": 9,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "BR-0010",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-ha-0001",
    "indusCode": "IDC-TLS-000071",
    "canonicalName": "Screwdriver slotted 3 mm (Zinc plated)",
    "description": "Standardized Screwdriver conforming to national hardware registry specifications. Nominal dimension: slotted 3 mm; Material/Finish: Zinc plated; Storage Bin: Electrical Shelf.",
    "categoryId": "hand-tools",
    "specifications": {
      "specification": "slotted 3 mm",
      "material": "Zinc plated",
      "unitOfMeasure": "pcs",
      "storageLocation": "Electrical Shelf",
      "reorderThreshold": 40,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "HA-0001",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-ha-0002",
    "indusCode": "IDC-TLS-000072",
    "canonicalName": "Screwdriver slotted 5 mm (Rubber)",
    "description": "Standardized Screwdriver conforming to national hardware registry specifications. Nominal dimension: slotted 5 mm; Material/Finish: Rubber; Storage Bin: B2-01.",
    "categoryId": "hand-tools",
    "specifications": {
      "specification": "slotted 5 mm",
      "material": "Rubber",
      "unitOfMeasure": "pcs",
      "storageLocation": "B2-01",
      "reorderThreshold": 59,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "HA-0002",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-ha-0003",
    "indusCode": "IDC-TLS-000073",
    "canonicalName": "Screwdriver slotted 6 mm (As supplied)",
    "description": "Standardized Screwdriver conforming to national hardware registry specifications. Nominal dimension: slotted 6 mm; Material/Finish: As supplied; Storage Bin: A1-01.",
    "categoryId": "hand-tools",
    "specifications": {
      "specification": "slotted 6 mm",
      "material": "As supplied",
      "unitOfMeasure": "pcs",
      "storageLocation": "A1-01",
      "reorderThreshold": 28,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "HA-0003",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-ha-0004",
    "indusCode": "IDC-TLS-000074",
    "canonicalName": "Screwdriver Phillips PH0 (Black oxide)",
    "description": "Standardized Screwdriver conforming to national hardware registry specifications. Nominal dimension: Phillips PH0; Material/Finish: Black oxide; Storage Bin: Plumbing Shelf.",
    "categoryId": "hand-tools",
    "specifications": {
      "specification": "Phillips PH0",
      "material": "Black oxide",
      "unitOfMeasure": "pcs",
      "storageLocation": "Plumbing Shelf",
      "reorderThreshold": 49,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "HA-0004",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-ha-0005",
    "indusCode": "IDC-TLS-000075",
    "canonicalName": "Screwdriver Phillips PH1 (Brass)",
    "description": "Standardized Screwdriver conforming to national hardware registry specifications. Nominal dimension: Phillips PH1; Material/Finish: Brass; Storage Bin: Plumbing Shelf.",
    "categoryId": "hand-tools",
    "specifications": {
      "specification": "Phillips PH1",
      "material": "Brass",
      "unitOfMeasure": "pcs",
      "storageLocation": "Plumbing Shelf",
      "reorderThreshold": 17,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "HA-0005",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-ha-0006",
    "indusCode": "IDC-TLS-000076",
    "canonicalName": "Screwdriver Phillips PH2 (Stainless steel)",
    "description": "Standardized Screwdriver conforming to national hardware registry specifications. Nominal dimension: Phillips PH2; Material/Finish: Stainless steel; Storage Bin: C1-02.",
    "categoryId": "hand-tools",
    "specifications": {
      "specification": "Phillips PH2",
      "material": "Stainless steel",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-02",
      "reorderThreshold": 65,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "HA-0006",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-ha-0007",
    "indusCode": "IDC-TLS-000077",
    "canonicalName": "Screwdriver Pozidriv PZ2 (Stainless steel)",
    "description": "Standardized Screwdriver conforming to national hardware registry specifications. Nominal dimension: Pozidriv PZ2; Material/Finish: Stainless steel; Storage Bin: Workshop Cabinet.",
    "categoryId": "hand-tools",
    "specifications": {
      "specification": "Pozidriv PZ2",
      "material": "Stainless steel",
      "unitOfMeasure": "pcs",
      "storageLocation": "Workshop Cabinet",
      "reorderThreshold": 49,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "HA-0007",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-ha-0008",
    "indusCode": "IDC-TLS-000078",
    "canonicalName": "Combination plier 150 mm (Galvanised)",
    "description": "Standardized Combination plier conforming to national hardware registry specifications. Nominal dimension: 150 mm; Material/Finish: Galvanised; Storage Bin: B2-01.",
    "categoryId": "hand-tools",
    "specifications": {
      "specification": "150 mm",
      "material": "Galvanised",
      "unitOfMeasure": "pcs",
      "storageLocation": "B2-01",
      "reorderThreshold": 8,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "HA-0008",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-ha-0009",
    "indusCode": "IDC-TLS-000079",
    "canonicalName": "Combination plier 180 mm (Mixed / standard)",
    "description": "Standardized Combination plier conforming to national hardware registry specifications. Nominal dimension: 180 mm; Material/Finish: Mixed / standard; Storage Bin: Electrical Shelf.",
    "categoryId": "hand-tools",
    "specifications": {
      "specification": "180 mm",
      "material": "Mixed / standard",
      "unitOfMeasure": "pcs",
      "storageLocation": "Electrical Shelf",
      "reorderThreshold": 36,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "HA-0009",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-ha-0010",
    "indusCode": "IDC-TLS-000080",
    "canonicalName": "Combination plier 200 mm (Black oxide)",
    "description": "Standardized Combination plier conforming to national hardware registry specifications. Nominal dimension: 200 mm; Material/Finish: Black oxide; Storage Bin: A1-02.",
    "categoryId": "hand-tools",
    "specifications": {
      "specification": "200 mm",
      "material": "Black oxide",
      "unitOfMeasure": "pcs",
      "storageLocation": "A1-02",
      "reorderThreshold": 31,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "HA-0010",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-po-0001",
    "indusCode": "IDC-PWR-000081",
    "canonicalName": "Drill bit - HSS 2 mm (PVC)",
    "description": "Standardized Drill bit - HSS conforming to national hardware registry specifications. Nominal dimension: 2 mm; Material/Finish: PVC; Storage Bin: Plumbing Shelf.",
    "categoryId": "power-tools-accessories",
    "specifications": {
      "specification": "2 mm",
      "material": "PVC",
      "unitOfMeasure": "pcs",
      "storageLocation": "Plumbing Shelf",
      "reorderThreshold": 24,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "PO-0001",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-po-0002",
    "indusCode": "IDC-PWR-000082",
    "canonicalName": "Drill bit - HSS 3 mm (PVC)",
    "description": "Standardized Drill bit - HSS conforming to national hardware registry specifications. Nominal dimension: 3 mm; Material/Finish: PVC; Storage Bin: A1-01.",
    "categoryId": "power-tools-accessories",
    "specifications": {
      "specification": "3 mm",
      "material": "PVC",
      "unitOfMeasure": "pcs",
      "storageLocation": "A1-01",
      "reorderThreshold": 36,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "PO-0002",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-po-0003",
    "indusCode": "IDC-PWR-000083",
    "canonicalName": "Drill bit - HSS 4 mm (Black oxide)",
    "description": "Standardized Drill bit - HSS conforming to national hardware registry specifications. Nominal dimension: 4 mm; Material/Finish: Black oxide; Storage Bin: Tool Rack.",
    "categoryId": "power-tools-accessories",
    "specifications": {
      "specification": "4 mm",
      "material": "Black oxide",
      "unitOfMeasure": "pcs",
      "storageLocation": "Tool Rack",
      "reorderThreshold": 25,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "PO-0003",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-po-0004",
    "indusCode": "IDC-PWR-000084",
    "canonicalName": "Drill bit - HSS 5 mm (PVC)",
    "description": "Standardized Drill bit - HSS conforming to national hardware registry specifications. Nominal dimension: 5 mm; Material/Finish: PVC; Storage Bin: Electrical Shelf.",
    "categoryId": "power-tools-accessories",
    "specifications": {
      "specification": "5 mm",
      "material": "PVC",
      "unitOfMeasure": "pcs",
      "storageLocation": "Electrical Shelf",
      "reorderThreshold": 51,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "PO-0004",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-po-0005",
    "indusCode": "IDC-PWR-000085",
    "canonicalName": "Drill bit - HSS 6 mm (Mixed / standard)",
    "description": "Standardized Drill bit - HSS conforming to national hardware registry specifications. Nominal dimension: 6 mm; Material/Finish: Mixed / standard; Storage Bin: Plumbing Shelf.",
    "categoryId": "power-tools-accessories",
    "specifications": {
      "specification": "6 mm",
      "material": "Mixed / standard",
      "unitOfMeasure": "pcs",
      "storageLocation": "Plumbing Shelf",
      "reorderThreshold": 63,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "PO-0005",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-po-0006",
    "indusCode": "IDC-PWR-000086",
    "canonicalName": "Drill bit - HSS 8 mm (Zinc plated)",
    "description": "Standardized Drill bit - HSS conforming to national hardware registry specifications. Nominal dimension: 8 mm; Material/Finish: Zinc plated; Storage Bin: C1-02.",
    "categoryId": "power-tools-accessories",
    "specifications": {
      "specification": "8 mm",
      "material": "Zinc plated",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-02",
      "reorderThreshold": 24,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "PO-0006",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-po-0007",
    "indusCode": "IDC-PWR-000087",
    "canonicalName": "Drill bit - HSS 10 mm (Rubber)",
    "description": "Standardized Drill bit - HSS conforming to national hardware registry specifications. Nominal dimension: 10 mm; Material/Finish: Rubber; Storage Bin: B2-01.",
    "categoryId": "power-tools-accessories",
    "specifications": {
      "specification": "10 mm",
      "material": "Rubber",
      "unitOfMeasure": "pcs",
      "storageLocation": "B2-01",
      "reorderThreshold": 64,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "PO-0007",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-po-0008",
    "indusCode": "IDC-PWR-000088",
    "canonicalName": "Masonry drill bit 4 mm (Brass)",
    "description": "Standardized Masonry drill bit conforming to national hardware registry specifications. Nominal dimension: 4 mm; Material/Finish: Brass; Storage Bin: A1-02.",
    "categoryId": "power-tools-accessories",
    "specifications": {
      "specification": "4 mm",
      "material": "Brass",
      "unitOfMeasure": "pcs",
      "storageLocation": "A1-02",
      "reorderThreshold": 43,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "PO-0008",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-po-0009",
    "indusCode": "IDC-PWR-000089",
    "canonicalName": "Masonry drill bit 5 mm (As supplied)",
    "description": "Standardized Masonry drill bit conforming to national hardware registry specifications. Nominal dimension: 5 mm; Material/Finish: As supplied; Storage Bin: B2-01.",
    "categoryId": "power-tools-accessories",
    "specifications": {
      "specification": "5 mm",
      "material": "As supplied",
      "unitOfMeasure": "pcs",
      "storageLocation": "B2-01",
      "reorderThreshold": 49,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "PO-0009",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-po-0010",
    "indusCode": "IDC-PWR-000090",
    "canonicalName": "Masonry drill bit 6 mm (Galvanised)",
    "description": "Standardized Masonry drill bit conforming to national hardware registry specifications. Nominal dimension: 6 mm; Material/Finish: Galvanised; Storage Bin: A1-02.",
    "categoryId": "power-tools-accessories",
    "specifications": {
      "specification": "6 mm",
      "material": "Galvanised",
      "unitOfMeasure": "pcs",
      "storageLocation": "A1-02",
      "reorderThreshold": 15,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "PO-0010",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-el-0001",
    "indusCode": "IDC-ELC-000091",
    "canonicalName": "PVC insulated wire 0.75 sq mm red (PVC)",
    "description": "Standardized PVC insulated wire conforming to national hardware registry specifications. Nominal dimension: 0.75 sq mm red; Material/Finish: PVC; Storage Bin: B1-02.",
    "categoryId": "electrical-fittings",
    "specifications": {
      "specification": "0.75 sq mm red",
      "material": "PVC",
      "unitOfMeasure": "m",
      "storageLocation": "B1-02",
      "reorderThreshold": 49,
      "standardPack": "100 m"
    },
    "manufacturerPartNumber": "EL-0001",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-el-0002",
    "indusCode": "IDC-ELC-000092",
    "canonicalName": "PVC insulated wire 0.75 sq mm black (Rubber)",
    "description": "Standardized PVC insulated wire conforming to national hardware registry specifications. Nominal dimension: 0.75 sq mm black; Material/Finish: Rubber; Storage Bin: Workshop Cabinet.",
    "categoryId": "electrical-fittings",
    "specifications": {
      "specification": "0.75 sq mm black",
      "material": "Rubber",
      "unitOfMeasure": "m",
      "storageLocation": "Workshop Cabinet",
      "reorderThreshold": 8,
      "standardPack": "100 m"
    },
    "manufacturerPartNumber": "EL-0002",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-el-0003",
    "indusCode": "IDC-ELC-000093",
    "canonicalName": "PVC insulated wire 1 sq mm red (Rubber)",
    "description": "Standardized PVC insulated wire conforming to national hardware registry specifications. Nominal dimension: 1 sq mm red; Material/Finish: Rubber; Storage Bin: Tool Rack.",
    "categoryId": "electrical-fittings",
    "specifications": {
      "specification": "1 sq mm red",
      "material": "Rubber",
      "unitOfMeasure": "m",
      "storageLocation": "Tool Rack",
      "reorderThreshold": 51,
      "standardPack": "100 m"
    },
    "manufacturerPartNumber": "EL-0003",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-el-0004",
    "indusCode": "IDC-ELC-000094",
    "canonicalName": "PVC insulated wire 1 sq mm black (Nylon)",
    "description": "Standardized PVC insulated wire conforming to national hardware registry specifications. Nominal dimension: 1 sq mm black; Material/Finish: Nylon; Storage Bin: B1-01.",
    "categoryId": "electrical-fittings",
    "specifications": {
      "specification": "1 sq mm black",
      "material": "Nylon",
      "unitOfMeasure": "m",
      "storageLocation": "B1-01",
      "reorderThreshold": 47,
      "standardPack": "100 m"
    },
    "manufacturerPartNumber": "EL-0004",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-el-0005",
    "indusCode": "IDC-ELC-000095",
    "canonicalName": "PVC insulated wire 1.5 sq mm red (As supplied)",
    "description": "Standardized PVC insulated wire conforming to national hardware registry specifications. Nominal dimension: 1.5 sq mm red; Material/Finish: As supplied; Storage Bin: B1-02.",
    "categoryId": "electrical-fittings",
    "specifications": {
      "specification": "1.5 sq mm red",
      "material": "As supplied",
      "unitOfMeasure": "m",
      "storageLocation": "B1-02",
      "reorderThreshold": 65,
      "standardPack": "100 m"
    },
    "manufacturerPartNumber": "EL-0005",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-el-0006",
    "indusCode": "IDC-ELC-000096",
    "canonicalName": "PVC insulated wire 1.5 sq mm black (As supplied)",
    "description": "Standardized PVC insulated wire conforming to national hardware registry specifications. Nominal dimension: 1.5 sq mm black; Material/Finish: As supplied; Storage Bin: Fasteners Drawer.",
    "categoryId": "electrical-fittings",
    "specifications": {
      "specification": "1.5 sq mm black",
      "material": "As supplied",
      "unitOfMeasure": "m",
      "storageLocation": "Fasteners Drawer",
      "reorderThreshold": 39,
      "standardPack": "100 m"
    },
    "manufacturerPartNumber": "EL-0006",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-el-0007",
    "indusCode": "IDC-ELC-000097",
    "canonicalName": "PVC insulated wire 2.5 sq mm red (Nylon)",
    "description": "Standardized PVC insulated wire conforming to national hardware registry specifications. Nominal dimension: 2.5 sq mm red; Material/Finish: Nylon; Storage Bin: Electrical Shelf.",
    "categoryId": "electrical-fittings",
    "specifications": {
      "specification": "2.5 sq mm red",
      "material": "Nylon",
      "unitOfMeasure": "m",
      "storageLocation": "Electrical Shelf",
      "reorderThreshold": 8,
      "standardPack": "100 m"
    },
    "manufacturerPartNumber": "EL-0007",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-el-0008",
    "indusCode": "IDC-ELC-000098",
    "canonicalName": "PVC insulated wire 2.5 sq mm black (PVC)",
    "description": "Standardized PVC insulated wire conforming to national hardware registry specifications. Nominal dimension: 2.5 sq mm black; Material/Finish: PVC; Storage Bin: B1-01.",
    "categoryId": "electrical-fittings",
    "specifications": {
      "specification": "2.5 sq mm black",
      "material": "PVC",
      "unitOfMeasure": "m",
      "storageLocation": "B1-01",
      "reorderThreshold": 10,
      "standardPack": "100 m"
    },
    "manufacturerPartNumber": "EL-0008",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "prod-el-0009",
    "indusCode": "IDC-ELC-000099",
    "canonicalName": "Cable tie 100\u00d72.5 mm (Rubber)",
    "description": "Standardized Cable tie conforming to national hardware registry specifications. Nominal dimension: 100\u00d72.5 mm; Material/Finish: Rubber; Storage Bin: C1-01.",
    "categoryId": "electrical-fittings",
    "specifications": {
      "specification": "100\u00d72.5 mm",
      "material": "Rubber",
      "unitOfMeasure": "pcs",
      "storageLocation": "C1-01",
      "reorderThreshold": 18,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "EL-0009",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z",
    "primaryImageUrl": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prod-el-0010",
    "indusCode": "IDC-ELC-000100",
    "canonicalName": "Cable tie 150\u00d73.6 mm (Rubber)",
    "description": "Standardized Cable tie conforming to national hardware registry specifications. Nominal dimension: 150\u00d73.6 mm; Material/Finish: Rubber; Storage Bin: B1-02.",
    "categoryId": "electrical-fittings",
    "specifications": {
      "specification": "150\u00d73.6 mm",
      "material": "Rubber",
      "unitOfMeasure": "pcs",
      "storageLocation": "B1-02",
      "reorderThreshold": 34,
      "standardPack": "100 pcs"
    },
    "manufacturerPartNumber": "EL-0010",
    "standards": [
      "National Hardware Standard"
    ],
    "status": "approved",
    "createdBy": "json_registry_ingest",
    "approvedBy": "admin_audit",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  }
];

export const SEED_LISTINGS: SupplierListing[] = [
  {
    "id": "list-000001",
    "supplierId": "sup-2",
    "productId": "prod-sc-0001",
    "sellerProductName": "Punjab Precision Tools & Engineering - Wood screw 3\u00d712 mm (Mixed / standard)",
    "sellerPartNumber": "PUN-SC-0001",
    "price": 8.2,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 180,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000002",
    "supplierId": "sup-3",
    "productId": "prod-sc-0002",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Wood screw 3\u00d720 mm (As supplied)",
    "sellerPartNumber": "COI-SC-0002",
    "price": 11.9,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 187,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000003",
    "supplierId": "sup-4",
    "productId": "prod-sc-0003",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Wood screw 3.5\u00d725 mm (Standard)",
    "sellerPartNumber": "BHA-SC-0003",
    "price": 15.6,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "limited_stock",
    "stockQuantity": 8,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000004",
    "supplierId": "sup-5",
    "productId": "prod-sc-0004",
    "sellerProductName": "National Architectural Locks & Latches - Wood screw 4\u00d730 mm (Zinc plated)",
    "sellerPartNumber": "NAT-SC-0004",
    "price": 19.3,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 83,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000005",
    "supplierId": "sup-1",
    "productId": "prod-sc-0005",
    "sellerProductName": "Apex Fasteners & Hardware India - Wood screw 4\u00d740 mm (PVC)",
    "sellerPartNumber": "APE-SC-0005",
    "price": 23.0,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "limited_stock",
    "stockQuantity": 10,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000006",
    "supplierId": "sup-2",
    "productId": "prod-sc-0006",
    "sellerProductName": "Punjab Precision Tools & Engineering - Wood screw 5\u00d750 mm (As supplied)",
    "sellerPartNumber": "PUN-SC-0006",
    "price": 26.7,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 64,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000007",
    "supplierId": "sup-3",
    "productId": "prod-sc-0007",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Wood screw 6\u00d760 mm (As supplied)",
    "sellerPartNumber": "COI-SC-0007",
    "price": 30.4,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 86,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000008",
    "supplierId": "sup-4",
    "productId": "prod-sc-0008",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Machine screw M3\u00d76 (As supplied)",
    "sellerPartNumber": "BHA-SC-0008",
    "price": 34.1,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 470,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000009",
    "supplierId": "sup-5",
    "productId": "prod-sc-0009",
    "sellerProductName": "National Architectural Locks & Latches - Machine screw M3\u00d710 (Black oxide)",
    "sellerPartNumber": "NAT-SC-0009",
    "price": 37.8,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 158,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000010",
    "supplierId": "sup-1",
    "productId": "prod-sc-0010",
    "sellerProductName": "Apex Fasteners & Hardware India - Machine screw M4\u00d710 (Zinc plated)",
    "sellerPartNumber": "APE-SC-0010",
    "price": 6.5,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 368,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000011",
    "supplierId": "sup-2",
    "productId": "prod-nu-0001",
    "sellerProductName": "Punjab Precision Tools & Engineering - Hex nut M3 (Stainless steel)",
    "sellerPartNumber": "PUN-NU-0001",
    "price": 10.2,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 385,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000012",
    "supplierId": "sup-3",
    "productId": "prod-nu-0002",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Hex nut M4 (As supplied)",
    "sellerPartNumber": "COI-NU-0002",
    "price": 13.9,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 429,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000013",
    "supplierId": "sup-4",
    "productId": "prod-nu-0003",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Hex nut M5 (Stainless steel)",
    "sellerPartNumber": "BHA-NU-0003",
    "price": 17.6,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 284,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000014",
    "supplierId": "sup-5",
    "productId": "prod-nu-0004",
    "sellerProductName": "National Architectural Locks & Latches - Hex nut M6 (As supplied)",
    "sellerPartNumber": "NAT-NU-0004",
    "price": 21.3,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 75,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000015",
    "supplierId": "sup-1",
    "productId": "prod-nu-0005",
    "sellerProductName": "Apex Fasteners & Hardware India - Hex nut M8 (Galvanised)",
    "sellerPartNumber": "APE-NU-0005",
    "price": 25.0,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 344,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000016",
    "supplierId": "sup-2",
    "productId": "prod-nu-0006",
    "sellerProductName": "Punjab Precision Tools & Engineering - Hex nut M10 (Rubber)",
    "sellerPartNumber": "PUN-NU-0006",
    "price": 28.7,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 460,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000017",
    "supplierId": "sup-3",
    "productId": "prod-nu-0007",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Hex nut M12 (Zinc plated)",
    "sellerPartNumber": "COI-NU-0007",
    "price": 32.4,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 209,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000018",
    "supplierId": "sup-4",
    "productId": "prod-nu-0008",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Nyloc nut M4 (PVC)",
    "sellerPartNumber": "BHA-NU-0008",
    "price": 36.1,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 336,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000019",
    "supplierId": "sup-5",
    "productId": "prod-nu-0009",
    "sellerProductName": "National Architectural Locks & Latches - Nyloc nut M5 (Mixed / standard)",
    "sellerPartNumber": "NAT-NU-0009",
    "price": 4.8,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 419,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000020",
    "supplierId": "sup-1",
    "productId": "prod-nu-0010",
    "sellerProductName": "Apex Fasteners & Hardware India - Nyloc nut M6 (Zinc plated)",
    "sellerPartNumber": "APE-NU-0010",
    "price": 8.5,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 83,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000021",
    "supplierId": "sup-2",
    "productId": "prod-an-0001",
    "sellerProductName": "Punjab Precision Tools & Engineering - Nylon wall plug 5 mm (As supplied)",
    "sellerPartNumber": "PUN-AN-0001",
    "price": 12.2,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 379,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000022",
    "supplierId": "sup-3",
    "productId": "prod-an-0002",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Nylon wall plug 6 mm (Nylon)",
    "sellerPartNumber": "COI-AN-0002",
    "price": 15.9,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 344,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000023",
    "supplierId": "sup-4",
    "productId": "prod-an-0003",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Nylon wall plug 8 mm (Rubber)",
    "sellerPartNumber": "BHA-AN-0003",
    "price": 19.6,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 364,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000024",
    "supplierId": "sup-5",
    "productId": "prod-an-0004",
    "sellerProductName": "National Architectural Locks & Latches - Nylon wall plug 10 mm (Rubber)",
    "sellerPartNumber": "NAT-AN-0004",
    "price": 23.3,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 102,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000025",
    "supplierId": "sup-1",
    "productId": "prod-an-0005",
    "sellerProductName": "Apex Fasteners & Hardware India - Nylon wall plug 12 mm (As supplied)",
    "sellerPartNumber": "APE-AN-0005",
    "price": 27.0,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 105,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000026",
    "supplierId": "sup-2",
    "productId": "prod-an-0006",
    "sellerProductName": "Punjab Precision Tools & Engineering - Expansion anchor M6\u00d750 (Stainless steel)",
    "sellerPartNumber": "PUN-AN-0006",
    "price": 30.7,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 315,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000027",
    "supplierId": "sup-3",
    "productId": "prod-an-0007",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Expansion anchor M8\u00d760 (Galvanised)",
    "sellerPartNumber": "COI-AN-0007",
    "price": 34.4,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 331,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000028",
    "supplierId": "sup-4",
    "productId": "prod-an-0008",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Expansion anchor M10\u00d775 (Rubber)",
    "sellerPartNumber": "BHA-AN-0008",
    "price": 38.1,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 418,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000029",
    "supplierId": "sup-5",
    "productId": "prod-an-0009",
    "sellerProductName": "National Architectural Locks & Latches - Expansion anchor M12\u00d7100 (As supplied)",
    "sellerPartNumber": "NAT-AN-0009",
    "price": 6.8,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 313,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000030",
    "supplierId": "sup-1",
    "productId": "prod-an-0010",
    "sellerProductName": "Apex Fasteners & Hardware India - Wedge anchor M8\u00d775 (Black oxide)",
    "sellerPartNumber": "APE-AN-0010",
    "price": 10.5,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 35,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000031",
    "supplierId": "sup-2",
    "productId": "prod-pl-0001",
    "sellerProductName": "Punjab Precision Tools & Engineering - PVC pipe 15 mm (Nylon)",
    "sellerPartNumber": "PUN-PL-0001",
    "price": 54.7,
    "currency": "INR",
    "unitOfSale": "lengths",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 415,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000032",
    "supplierId": "sup-3",
    "productId": "prod-pl-0002",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - PVC pipe 20 mm (PVC)",
    "sellerPartNumber": "COI-PL-0002",
    "price": 58.4,
    "currency": "INR",
    "unitOfSale": "lengths",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 218,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000033",
    "supplierId": "sup-4",
    "productId": "prod-pl-0003",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - PVC pipe 25 mm (PVC)",
    "sellerPartNumber": "BHA-PL-0003",
    "price": 62.1,
    "currency": "INR",
    "unitOfSale": "lengths",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 291,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000034",
    "supplierId": "sup-5",
    "productId": "prod-pl-0004",
    "sellerProductName": "National Architectural Locks & Latches - PVC pipe 32 mm (Rubber)",
    "sellerPartNumber": "NAT-PL-0004",
    "price": 65.8,
    "currency": "INR",
    "unitOfSale": "lengths",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 486,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000035",
    "supplierId": "sup-1",
    "productId": "prod-pl-0005",
    "sellerProductName": "Apex Fasteners & Hardware India - PVC pipe 40 mm (PVC)",
    "sellerPartNumber": "APE-PL-0005",
    "price": 69.5,
    "currency": "INR",
    "unitOfSale": "lengths",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 360,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000036",
    "supplierId": "sup-2",
    "productId": "prod-pl-0006",
    "sellerProductName": "Punjab Precision Tools & Engineering - PVC pipe 50 mm (As supplied)",
    "sellerPartNumber": "PUN-PL-0006",
    "price": 73.2,
    "currency": "INR",
    "unitOfSale": "lengths",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 151,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000037",
    "supplierId": "sup-3",
    "productId": "prod-pl-0007",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - PVC elbow 15 mm (PVC)",
    "sellerPartNumber": "COI-PL-0007",
    "price": 36.4,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 167,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000038",
    "supplierId": "sup-4",
    "productId": "prod-pl-0008",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - PVC elbow 20 mm (PVC)",
    "sellerPartNumber": "BHA-PL-0008",
    "price": 5.1,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 74,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000039",
    "supplierId": "sup-5",
    "productId": "prod-pl-0009",
    "sellerProductName": "National Architectural Locks & Latches - PVC elbow 25 mm (Rubber)",
    "sellerPartNumber": "NAT-PL-0009",
    "price": 8.8,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 202,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000040",
    "supplierId": "sup-1",
    "productId": "prod-pl-0010",
    "sellerProductName": "Apex Fasteners & Hardware India - PVC elbow 32 mm (As supplied)",
    "sellerPartNumber": "APE-PL-0010",
    "price": 12.5,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 472,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000041",
    "supplierId": "sup-2",
    "productId": "prod-ad-0001",
    "sellerProductName": "Punjab Precision Tools & Engineering - Epoxy adhesive 5 minute  araldite-type (As supplied)",
    "sellerPartNumber": "PUN-AD-0001",
    "price": 131.7,
    "currency": "INR",
    "unitOfSale": "packs",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 81,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000042",
    "supplierId": "sup-3",
    "productId": "prod-ad-0002",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Epoxy adhesive clear 2-part (Mixed / standard)",
    "sellerPartNumber": "COI-AD-0002",
    "price": 135.4,
    "currency": "INR",
    "unitOfSale": "packs",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 409,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000043",
    "supplierId": "sup-4",
    "productId": "prod-ad-0003",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Epoxy adhesive metal repair (Brass)",
    "sellerPartNumber": "BHA-AD-0003",
    "price": 139.1,
    "currency": "INR",
    "unitOfSale": "packs",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 39,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000044",
    "supplierId": "sup-5",
    "productId": "prod-ad-0004",
    "sellerProductName": "National Architectural Locks & Latches - Threadlocker low strength (Mixed / standard)",
    "sellerPartNumber": "NAT-AD-0004",
    "price": 142.8,
    "currency": "INR",
    "unitOfSale": "bottles",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 332,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000045",
    "supplierId": "sup-1",
    "productId": "prod-ad-0005",
    "sellerProductName": "Apex Fasteners & Hardware India - Threadlocker medium strength (As supplied)",
    "sellerPartNumber": "APE-AD-0005",
    "price": 146.5,
    "currency": "INR",
    "unitOfSale": "bottles",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 65,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000046",
    "supplierId": "sup-2",
    "productId": "prod-ad-0006",
    "sellerProductName": "Punjab Precision Tools & Engineering - Threadlocker high strength (Mixed / standard)",
    "sellerPartNumber": "PUN-AD-0006",
    "price": 150.2,
    "currency": "INR",
    "unitOfSale": "bottles",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 117,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000047",
    "supplierId": "sup-3",
    "productId": "prod-ad-0007",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Silicone sealant clear (PVC)",
    "sellerPartNumber": "COI-AD-0007",
    "price": 153.9,
    "currency": "INR",
    "unitOfSale": "tubes",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 27,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000048",
    "supplierId": "sup-4",
    "productId": "prod-ad-0008",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Silicone sealant white (PVC)",
    "sellerPartNumber": "BHA-AD-0008",
    "price": 122.6,
    "currency": "INR",
    "unitOfSale": "tubes",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 350,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000049",
    "supplierId": "sup-5",
    "productId": "prod-ad-0009",
    "sellerProductName": "National Architectural Locks & Latches - Silicone sealant black (Rubber)",
    "sellerPartNumber": "NAT-AD-0009",
    "price": 126.3,
    "currency": "INR",
    "unitOfSale": "tubes",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 87,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000050",
    "supplierId": "sup-1",
    "productId": "prod-ad-0010",
    "sellerProductName": "Apex Fasteners & Hardware India - Silicone sealant grey (PVC)",
    "sellerPartNumber": "APE-AD-0010",
    "price": 130.0,
    "currency": "INR",
    "unitOfSale": "tubes",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 460,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000051",
    "supplierId": "sup-2",
    "productId": "prod-lo-0001",
    "sellerProductName": "Punjab Precision Tools & Engineering - Padlock 20 mm (PVC)",
    "sellerPartNumber": "PUN-LO-0001",
    "price": 18.2,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 330,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000052",
    "supplierId": "sup-3",
    "productId": "prod-lo-0002",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Padlock 30 mm (As supplied)",
    "sellerPartNumber": "COI-LO-0002",
    "price": 21.9,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 313,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000053",
    "supplierId": "sup-4",
    "productId": "prod-lo-0003",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Padlock 40 mm (Brass)",
    "sellerPartNumber": "BHA-LO-0003",
    "price": 25.6,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 487,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000054",
    "supplierId": "sup-5",
    "productId": "prod-lo-0004",
    "sellerProductName": "National Architectural Locks & Latches - Padlock 50 mm (Rubber)",
    "sellerPartNumber": "NAT-LO-0004",
    "price": 29.3,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "limited_stock",
    "stockQuantity": 2,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000055",
    "supplierId": "sup-1",
    "productId": "prod-lo-0005",
    "sellerProductName": "Apex Fasteners & Hardware India - Door handle lever set (As supplied)",
    "sellerPartNumber": "APE-LO-0005",
    "price": 148.5,
    "currency": "INR",
    "unitOfSale": "sets",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 261,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000056",
    "supplierId": "sup-2",
    "productId": "prod-lo-0006",
    "sellerProductName": "Punjab Precision Tools & Engineering - Door handle knob set (As supplied)",
    "sellerPartNumber": "PUN-LO-0006",
    "price": 152.2,
    "currency": "INR",
    "unitOfSale": "sets",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 39,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000057",
    "supplierId": "sup-3",
    "productId": "prod-lo-0007",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Door handle pull handle 150 mm (PVC)",
    "sellerPartNumber": "COI-LO-0007",
    "price": 120.9,
    "currency": "INR",
    "unitOfSale": "sets",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 75,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000058",
    "supplierId": "sup-4",
    "productId": "prod-lo-0008",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Door handle pull handle 300 mm (Galvanised)",
    "sellerPartNumber": "BHA-LO-0008",
    "price": 124.6,
    "currency": "INR",
    "unitOfSale": "sets",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 420,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000059",
    "supplierId": "sup-5",
    "productId": "prod-lo-0009",
    "sellerProductName": "National Architectural Locks & Latches - Mortise lock 60 mm (Mixed / standard)",
    "sellerPartNumber": "NAT-LO-0009",
    "price": 12.8,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 211,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000060",
    "supplierId": "sup-1",
    "productId": "prod-lo-0010",
    "sellerProductName": "Apex Fasteners & Hardware India - Mortise lock 70 mm (Black oxide)",
    "sellerPartNumber": "APE-LO-0010",
    "price": 16.5,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 195,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000061",
    "supplierId": "sup-2",
    "productId": "prod-br-0001",
    "sellerProductName": "Punjab Precision Tools & Engineering - L-bracket 25\u00d725 mm (Mixed / standard)",
    "sellerPartNumber": "PUN-BR-0001",
    "price": 20.2,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 59,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000062",
    "supplierId": "sup-3",
    "productId": "prod-br-0002",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - L-bracket 40\u00d740 mm (Galvanised)",
    "sellerPartNumber": "COI-BR-0002",
    "price": 23.9,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 447,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000063",
    "supplierId": "sup-4",
    "productId": "prod-br-0003",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - L-bracket 50\u00d750 mm (PVC)",
    "sellerPartNumber": "BHA-BR-0003",
    "price": 27.6,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 427,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000064",
    "supplierId": "sup-5",
    "productId": "prod-br-0004",
    "sellerProductName": "National Architectural Locks & Latches - L-bracket 75\u00d775 mm (Stainless steel)",
    "sellerPartNumber": "NAT-BR-0004",
    "price": 31.3,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 107,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000065",
    "supplierId": "sup-1",
    "productId": "prod-br-0005",
    "sellerProductName": "Apex Fasteners & Hardware India - L-bracket 100\u00d7100 mm (PVC)",
    "sellerPartNumber": "APE-BR-0005",
    "price": 35.0,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 196,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000066",
    "supplierId": "sup-2",
    "productId": "prod-br-0006",
    "sellerProductName": "Punjab Precision Tools & Engineering - Flat corner brace 25 mm (Stainless steel)",
    "sellerPartNumber": "PUN-BR-0006",
    "price": 38.7,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 217,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000067",
    "supplierId": "sup-3",
    "productId": "prod-br-0007",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Flat corner brace 40 mm (Brass)",
    "sellerPartNumber": "COI-BR-0007",
    "price": 7.4,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 393,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000068",
    "supplierId": "sup-4",
    "productId": "prod-br-0008",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Flat corner brace 50 mm (As supplied)",
    "sellerPartNumber": "BHA-BR-0008",
    "price": 11.1,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "limited_stock",
    "stockQuantity": 30,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000069",
    "supplierId": "sup-5",
    "productId": "prod-br-0009",
    "sellerProductName": "National Architectural Locks & Latches - Flat corner brace 75 mm (PVC)",
    "sellerPartNumber": "NAT-BR-0009",
    "price": 14.8,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 197,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000070",
    "supplierId": "sup-1",
    "productId": "prod-br-0010",
    "sellerProductName": "Apex Fasteners & Hardware India - T-plate 50 mm (Brass)",
    "sellerPartNumber": "APE-BR-0010",
    "price": 18.5,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 383,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000071",
    "supplierId": "sup-2",
    "productId": "prod-ha-0001",
    "sellerProductName": "Punjab Precision Tools & Engineering - Screwdriver slotted 3 mm (Zinc plated)",
    "sellerPartNumber": "PUN-HA-0001",
    "price": 22.2,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 473,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000072",
    "supplierId": "sup-3",
    "productId": "prod-ha-0002",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Screwdriver slotted 5 mm (Rubber)",
    "sellerPartNumber": "COI-HA-0002",
    "price": 25.9,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 291,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000073",
    "supplierId": "sup-4",
    "productId": "prod-ha-0003",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Screwdriver slotted 6 mm (As supplied)",
    "sellerPartNumber": "BHA-HA-0003",
    "price": 29.6,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 225,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000074",
    "supplierId": "sup-5",
    "productId": "prod-ha-0004",
    "sellerProductName": "National Architectural Locks & Latches - Screwdriver Phillips PH0 (Black oxide)",
    "sellerPartNumber": "NAT-HA-0004",
    "price": 33.3,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 125,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000075",
    "supplierId": "sup-1",
    "productId": "prod-ha-0005",
    "sellerProductName": "Apex Fasteners & Hardware India - Screwdriver Phillips PH1 (Brass)",
    "sellerPartNumber": "APE-HA-0005",
    "price": 37.0,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 293,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000076",
    "supplierId": "sup-2",
    "productId": "prod-ha-0006",
    "sellerProductName": "Punjab Precision Tools & Engineering - Screwdriver Phillips PH2 (Stainless steel)",
    "sellerPartNumber": "PUN-HA-0006",
    "price": 5.7,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 326,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000077",
    "supplierId": "sup-3",
    "productId": "prod-ha-0007",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Screwdriver Pozidriv PZ2 (Stainless steel)",
    "sellerPartNumber": "COI-HA-0007",
    "price": 9.4,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 342,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000078",
    "supplierId": "sup-4",
    "productId": "prod-ha-0008",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Combination plier 150 mm (Galvanised)",
    "sellerPartNumber": "BHA-HA-0008",
    "price": 13.1,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 100,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000079",
    "supplierId": "sup-5",
    "productId": "prod-ha-0009",
    "sellerProductName": "National Architectural Locks & Latches - Combination plier 180 mm (Mixed / standard)",
    "sellerPartNumber": "NAT-HA-0009",
    "price": 16.8,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 235,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000080",
    "supplierId": "sup-1",
    "productId": "prod-ha-0010",
    "sellerProductName": "Apex Fasteners & Hardware India - Combination plier 200 mm (Black oxide)",
    "sellerPartNumber": "APE-HA-0010",
    "price": 20.5,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 393,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000081",
    "supplierId": "sup-2",
    "productId": "prod-po-0001",
    "sellerProductName": "Punjab Precision Tools & Engineering - Drill bit - HSS 2 mm (PVC)",
    "sellerPartNumber": "PUN-PO-0001",
    "price": 24.2,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 362,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000082",
    "supplierId": "sup-3",
    "productId": "prod-po-0002",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Drill bit - HSS 3 mm (PVC)",
    "sellerPartNumber": "COI-PO-0002",
    "price": 27.9,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 91,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000083",
    "supplierId": "sup-4",
    "productId": "prod-po-0003",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Drill bit - HSS 4 mm (Black oxide)",
    "sellerPartNumber": "BHA-PO-0003",
    "price": 31.6,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 114,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000084",
    "supplierId": "sup-5",
    "productId": "prod-po-0004",
    "sellerProductName": "National Architectural Locks & Latches - Drill bit - HSS 5 mm (PVC)",
    "sellerPartNumber": "NAT-PO-0004",
    "price": 35.3,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 346,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000085",
    "supplierId": "sup-1",
    "productId": "prod-po-0005",
    "sellerProductName": "Apex Fasteners & Hardware India - Drill bit - HSS 6 mm (Mixed / standard)",
    "sellerPartNumber": "APE-PO-0005",
    "price": 39.0,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 262,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000086",
    "supplierId": "sup-2",
    "productId": "prod-po-0006",
    "sellerProductName": "Punjab Precision Tools & Engineering - Drill bit - HSS 8 mm (Zinc plated)",
    "sellerPartNumber": "PUN-PO-0006",
    "price": 7.7,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 174,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000087",
    "supplierId": "sup-3",
    "productId": "prod-po-0007",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - Drill bit - HSS 10 mm (Rubber)",
    "sellerPartNumber": "COI-PO-0007",
    "price": 11.4,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 355,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000088",
    "supplierId": "sup-4",
    "productId": "prod-po-0008",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - Masonry drill bit 4 mm (Brass)",
    "sellerPartNumber": "BHA-PO-0008",
    "price": 15.1,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "limited_stock",
    "stockQuantity": 2,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000089",
    "supplierId": "sup-5",
    "productId": "prod-po-0009",
    "sellerProductName": "National Architectural Locks & Latches - Masonry drill bit 5 mm (As supplied)",
    "sellerPartNumber": "NAT-PO-0009",
    "price": 18.8,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 465,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000090",
    "supplierId": "sup-1",
    "productId": "prod-po-0010",
    "sellerProductName": "Apex Fasteners & Hardware India - Masonry drill bit 6 mm (Galvanised)",
    "sellerPartNumber": "APE-PO-0010",
    "price": 22.5,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 372,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000091",
    "supplierId": "sup-2",
    "productId": "prod-el-0001",
    "sellerProductName": "Punjab Precision Tools & Engineering - PVC insulated wire 0.75 sq mm red (PVC)",
    "sellerPartNumber": "PUN-EL-0001",
    "price": 141.7,
    "currency": "INR",
    "unitOfSale": "m",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 475,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000092",
    "supplierId": "sup-3",
    "productId": "prod-el-0002",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - PVC insulated wire 0.75 sq mm black (Rubber)",
    "sellerPartNumber": "COI-EL-0002",
    "price": 145.4,
    "currency": "INR",
    "unitOfSale": "m",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 362,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000093",
    "supplierId": "sup-4",
    "productId": "prod-el-0003",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - PVC insulated wire 1 sq mm red (Rubber)",
    "sellerPartNumber": "BHA-EL-0003",
    "price": 149.1,
    "currency": "INR",
    "unitOfSale": "m",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 294,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000094",
    "supplierId": "sup-5",
    "productId": "prod-el-0004",
    "sellerProductName": "National Architectural Locks & Latches - PVC insulated wire 1 sq mm black (Nylon)",
    "sellerPartNumber": "NAT-EL-0004",
    "price": 152.8,
    "currency": "INR",
    "unitOfSale": "m",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 104,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000095",
    "supplierId": "sup-1",
    "productId": "prod-el-0005",
    "sellerProductName": "Apex Fasteners & Hardware India - PVC insulated wire 1.5 sq mm red (As supplied)",
    "sellerPartNumber": "APE-EL-0005",
    "price": 121.5,
    "currency": "INR",
    "unitOfSale": "m",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 274,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000096",
    "supplierId": "sup-2",
    "productId": "prod-el-0006",
    "sellerProductName": "Punjab Precision Tools & Engineering - PVC insulated wire 1.5 sq mm black (As supplied)",
    "sellerPartNumber": "PUN-EL-0006",
    "price": 125.2,
    "currency": "INR",
    "unitOfSale": "m",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 288,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000097",
    "supplierId": "sup-3",
    "productId": "prod-el-0007",
    "sellerProductName": "Coimbatore Industrial Piping & Valves - PVC insulated wire 2.5 sq mm red (Nylon)",
    "sellerPartNumber": "COI-EL-0007",
    "price": 128.9,
    "currency": "INR",
    "unitOfSale": "m",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 82,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000098",
    "supplierId": "sup-4",
    "productId": "prod-el-0008",
    "sellerProductName": "Bharat Electricals & Switchgear Wholesalers - PVC insulated wire 2.5 sq mm black (PVC)",
    "sellerPartNumber": "BHA-EL-0008",
    "price": 132.6,
    "currency": "INR",
    "unitOfSale": "m",
    "minimumOrderQuantity": 5,
    "stockStatus": "in_stock",
    "stockQuantity": 458,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000099",
    "supplierId": "sup-5",
    "productId": "prod-el-0009",
    "sellerProductName": "National Architectural Locks & Latches - Cable tie 100\u00d72.5 mm (Rubber)",
    "sellerPartNumber": "NAT-EL-0009",
    "price": 20.8,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 401,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "list-000100",
    "supplierId": "sup-1",
    "productId": "prod-el-0010",
    "sellerProductName": "Apex Fasteners & Hardware India - Cable tie 150\u00d73.6 mm (Rubber)",
    "sellerPartNumber": "APE-EL-0010",
    "price": 24.5,
    "currency": "INR",
    "unitOfSale": "pcs",
    "minimumOrderQuantity": 50,
    "stockStatus": "in_stock",
    "stockQuantity": 78,
    "listingStatus": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z",
    "updatedAt": "2026-01-15T12:00:00.000Z"
  }
];

export const SEED_ALIASES: ProductAlias[] = [
  {
    "id": "alias-1",
    "productId": "prod-sc-0001",
    "alias": "SC-0001",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-2",
    "productId": "prod-sc-0002",
    "alias": "SC-0002",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-3",
    "productId": "prod-sc-0003",
    "alias": "SC-0003",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-4",
    "productId": "prod-sc-0004",
    "alias": "SC-0004",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-5",
    "productId": "prod-sc-0005",
    "alias": "SC-0005",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-6",
    "productId": "prod-sc-0006",
    "alias": "SC-0006",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-7",
    "productId": "prod-sc-0007",
    "alias": "SC-0007",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-8",
    "productId": "prod-sc-0008",
    "alias": "SC-0008",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-9",
    "productId": "prod-sc-0009",
    "alias": "SC-0009",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-10",
    "productId": "prod-sc-0010",
    "alias": "SC-0010",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-11",
    "productId": "prod-nu-0001",
    "alias": "NU-0001",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-12",
    "productId": "prod-nu-0002",
    "alias": "NU-0002",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-13",
    "productId": "prod-nu-0003",
    "alias": "NU-0003",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-14",
    "productId": "prod-nu-0004",
    "alias": "NU-0004",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-15",
    "productId": "prod-nu-0005",
    "alias": "NU-0005",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-16",
    "productId": "prod-nu-0006",
    "alias": "NU-0006",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-17",
    "productId": "prod-nu-0007",
    "alias": "NU-0007",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-18",
    "productId": "prod-nu-0008",
    "alias": "NU-0008",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-19",
    "productId": "prod-nu-0009",
    "alias": "NU-0009",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-20",
    "productId": "prod-nu-0010",
    "alias": "NU-0010",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-21",
    "productId": "prod-an-0001",
    "alias": "AN-0001",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-22",
    "productId": "prod-an-0002",
    "alias": "AN-0002",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-23",
    "productId": "prod-an-0003",
    "alias": "AN-0003",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-24",
    "productId": "prod-an-0004",
    "alias": "AN-0004",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-25",
    "productId": "prod-an-0005",
    "alias": "AN-0005",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-26",
    "productId": "prod-an-0006",
    "alias": "AN-0006",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-27",
    "productId": "prod-an-0007",
    "alias": "AN-0007",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-28",
    "productId": "prod-an-0008",
    "alias": "AN-0008",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-29",
    "productId": "prod-an-0009",
    "alias": "AN-0009",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-30",
    "productId": "prod-an-0010",
    "alias": "AN-0010",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-31",
    "productId": "prod-pl-0001",
    "alias": "PL-0001",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-32",
    "productId": "prod-pl-0002",
    "alias": "PL-0002",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-33",
    "productId": "prod-pl-0003",
    "alias": "PL-0003",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-34",
    "productId": "prod-pl-0004",
    "alias": "PL-0004",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-35",
    "productId": "prod-pl-0005",
    "alias": "PL-0005",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-36",
    "productId": "prod-pl-0006",
    "alias": "PL-0006",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-37",
    "productId": "prod-pl-0007",
    "alias": "PL-0007",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-38",
    "productId": "prod-pl-0008",
    "alias": "PL-0008",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-39",
    "productId": "prod-pl-0009",
    "alias": "PL-0009",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-40",
    "productId": "prod-pl-0010",
    "alias": "PL-0010",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-41",
    "productId": "prod-ad-0001",
    "alias": "AD-0001",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-42",
    "productId": "prod-ad-0002",
    "alias": "AD-0002",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-43",
    "productId": "prod-ad-0003",
    "alias": "AD-0003",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-44",
    "productId": "prod-ad-0004",
    "alias": "AD-0004",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-45",
    "productId": "prod-ad-0005",
    "alias": "AD-0005",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-46",
    "productId": "prod-ad-0006",
    "alias": "AD-0006",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-47",
    "productId": "prod-ad-0007",
    "alias": "AD-0007",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-48",
    "productId": "prod-ad-0008",
    "alias": "AD-0008",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-49",
    "productId": "prod-ad-0009",
    "alias": "AD-0009",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-50",
    "productId": "prod-ad-0010",
    "alias": "AD-0010",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-51",
    "productId": "prod-lo-0001",
    "alias": "LO-0001",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-52",
    "productId": "prod-lo-0002",
    "alias": "LO-0002",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-53",
    "productId": "prod-lo-0003",
    "alias": "LO-0003",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-54",
    "productId": "prod-lo-0004",
    "alias": "LO-0004",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-55",
    "productId": "prod-lo-0005",
    "alias": "LO-0005",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-56",
    "productId": "prod-lo-0006",
    "alias": "LO-0006",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-57",
    "productId": "prod-lo-0007",
    "alias": "LO-0007",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-58",
    "productId": "prod-lo-0008",
    "alias": "LO-0008",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-59",
    "productId": "prod-lo-0009",
    "alias": "LO-0009",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-60",
    "productId": "prod-lo-0010",
    "alias": "LO-0010",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-61",
    "productId": "prod-br-0001",
    "alias": "BR-0001",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-62",
    "productId": "prod-br-0002",
    "alias": "BR-0002",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-63",
    "productId": "prod-br-0003",
    "alias": "BR-0003",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-64",
    "productId": "prod-br-0004",
    "alias": "BR-0004",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-65",
    "productId": "prod-br-0005",
    "alias": "BR-0005",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-66",
    "productId": "prod-br-0006",
    "alias": "BR-0006",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-67",
    "productId": "prod-br-0007",
    "alias": "BR-0007",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-68",
    "productId": "prod-br-0008",
    "alias": "BR-0008",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-69",
    "productId": "prod-br-0009",
    "alias": "BR-0009",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-70",
    "productId": "prod-br-0010",
    "alias": "BR-0010",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-71",
    "productId": "prod-ha-0001",
    "alias": "HA-0001",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-72",
    "productId": "prod-ha-0002",
    "alias": "HA-0002",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-73",
    "productId": "prod-ha-0003",
    "alias": "HA-0003",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-74",
    "productId": "prod-ha-0004",
    "alias": "HA-0004",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-75",
    "productId": "prod-ha-0005",
    "alias": "HA-0005",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-76",
    "productId": "prod-ha-0006",
    "alias": "HA-0006",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-77",
    "productId": "prod-ha-0007",
    "alias": "HA-0007",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-78",
    "productId": "prod-ha-0008",
    "alias": "HA-0008",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-79",
    "productId": "prod-ha-0009",
    "alias": "HA-0009",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-80",
    "productId": "prod-ha-0010",
    "alias": "HA-0010",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-81",
    "productId": "prod-po-0001",
    "alias": "PO-0001",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-82",
    "productId": "prod-po-0002",
    "alias": "PO-0002",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-83",
    "productId": "prod-po-0003",
    "alias": "PO-0003",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-84",
    "productId": "prod-po-0004",
    "alias": "PO-0004",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-85",
    "productId": "prod-po-0005",
    "alias": "PO-0005",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-86",
    "productId": "prod-po-0006",
    "alias": "PO-0006",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-87",
    "productId": "prod-po-0007",
    "alias": "PO-0007",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-88",
    "productId": "prod-po-0008",
    "alias": "PO-0008",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-89",
    "productId": "prod-po-0009",
    "alias": "PO-0009",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-90",
    "productId": "prod-po-0010",
    "alias": "PO-0010",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-91",
    "productId": "prod-el-0001",
    "alias": "EL-0001",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-92",
    "productId": "prod-el-0002",
    "alias": "EL-0002",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-93",
    "productId": "prod-el-0003",
    "alias": "EL-0003",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-94",
    "productId": "prod-el-0004",
    "alias": "EL-0004",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-95",
    "productId": "prod-el-0005",
    "alias": "EL-0005",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-96",
    "productId": "prod-el-0006",
    "alias": "EL-0006",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-97",
    "productId": "prod-el-0007",
    "alias": "EL-0007",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-98",
    "productId": "prod-el-0008",
    "alias": "EL-0008",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-99",
    "productId": "prod-el-0009",
    "alias": "EL-0009",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  },
  {
    "id": "alias-100",
    "productId": "prod-el-0010",
    "alias": "EL-0010",
    "aliasType": "trade_name",
    "status": "approved",
    "createdAt": "2026-01-15T12:00:00.000Z"
  }
];
