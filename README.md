# INDUS CODE — National Hardware Product Identification & Supplier Discovery Platform

> **"Every Product. One Identity."**
> Standardized digital identity platform for hardware products and supplier discovery across India.

---

## 1. Overview & Architecture

**INDUS CODE** solves a fundamental challenge across Indian industrial manufacturing and contracting: identical hardware items (e.g. `M10 x 50mm` high-tensile hexagonal bolts) are called by disparate trade names, fragmented seller part numbers, and ambiguous vernacular terms ("gala bolt", "matha nut"). 

INDUS CODE assigns a standardized, permanent, non-reusable identifier:
```
IDC-[CATEGORY_PREFIX]-[SEQUENCE]
Example: IDC-FST-000001
```

### Key Capabilities
- **Exact & Fuzzy Specification Search**: Search by Indus Code, generic title, nominal diameter, thread pitch, material grade, or national standard (IS, ISO, DIN).
- **Location-Aware Supplier Discovery**: Filter manufacturers, wholesalers, and distributors by city (Rajkot, Ludhiana, Mumbai, Chennai, Coimbatore), district, state, and PIN code.
- **Multi-Supplier Listing on One Identity**: Multiple verified suppliers list their individual pricing, minimum order quantities (MOQ), and stock availability against a single canonical product without fragmenting the catalog.
- **Duplicate Prevention Algorithm**: Real-time token similarity, token distance, MPN matching, and attribute normalization evaluate candidate submissions to prevent duplicate identities.
- **Transactional Code Allocation**: Concurrency-safe sequence generation with zero code reuse.
- **Administrative Governance**: Bootstrapped for `hetviipanchal11@gmail.com` with supplier badge verification, product request review, audit logs, and catalog export.

---

## 2. Technology Stack

- **Frontend**: React 19 + TypeScript, Tailwind CSS v4, Lucide Icons
- **Database**: Google Cloud Firestore (Enterprise Edition database `ai-studio-f124c728-c111-4f4a-bde2-f3424dd791a5`)
- **Authentication**: Firebase Authentication with Google Sign-In and local testing persona switcher
- **Security**: Attribute-Based Access Control (ABAC) in `firestore.rules` adhering to the 8 Pillars of Zero-Trust security
- **Testing**: Built-in `node:test` runner with `tsx` for pure logic test suites

---

## 3. Data Model (`firebase-blueprint.json`)

| Collection | Description | Access Rules |
| :--- | :--- | :--- |
| `products` | Canonical hardware specifications & permanent Indus Codes | Public read for approved; Admin write only |
| `productAliases` | Vernacular, trade and regional synonym mappings | Public read; Admin management |
| `categories` | Hardware categories (Fasteners, Pipes, Bearings, Hinges, Electrical, Tools) | Public read; Admin write |
| `suppliers` | Verified manufacturing factories, wholesalers, retailers | Public read for verified; Owner write |
| `supplierListings` | Commercial offers, unit pricing, MOQ, stock status | Public read for approved; Supplier write |
| `users` | User profile & role registry | Authenticated self-read; Admin write |
| `productRequests` | Proposed new items pending review | Requester & Admin read; Requester submit |
| `reports` | Community discrepancy & duplicate reports | Reporter & Admin read |
| `auditLogs` | Immutable administrative governance log | Admin read; Server/System write |
| `counters` | High-water mark sequence counters for atomic code allocation | Transactional update |

---

## 4. Setup & Installation

### Local Development
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env` (refer to `.env.example`).
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

### Running Unit Tests
Execute the pure logic test suite:
```bash
./node_modules/.bin/tsx --test src/utils/logic.test.ts
```

---

## 5. Security & Verification Policy

- **Non-Government Disclaimer**: Indus Code is an independent platform-issued identification system for B2B interoperability and is not an official government or BIS agency code.
- **Supplier Badges**: Verification badges require administrative review of verified business registration credentials.
- **PII Protection**: Direct contact details are restricted to authorized B2B inquiries; document attachments are stored in private storage buckets.
