import json
import sqlite3
import os
import sys

# Default paths
JSON_PATH = r"C:\Users\DELL\Downloads\Hardware_Stock_Register_10_Items_Per_Category_json.json"
if not os.path.exists(JSON_PATH) and os.path.exists("data.json"):
    JSON_PATH = "data.json"

DB_PATH = "hardware_stock.db"

def sanitize_str(val):
    if val is None:
        return None
    s = str(val).strip()
    return s if s and s.lower() not in ("none", "null", "n/a") else None

def sanitize_int(val, default=0):
    if val is None:
        return default
    try:
        res = int(float(val))
        return res if res >= 0 else default
    except (ValueError, TypeError):
        return default

def get_or_create_id(cursor, table, col, val, cache):
    clean_val = sanitize_str(val)
    if not clean_val:
        return None
    if clean_val in cache:
        return cache[clean_val]

    cursor.execute(f"SELECT id FROM {table} WHERE {col} = ?", (clean_val,))
    row = cursor.fetchone()
    if row:
        cache[clean_val] = row[0]
        return row[0]

    cursor.execute(f"INSERT INTO {table} ({col}) VALUES (?)", (clean_val,))
    new_id = cursor.lastrowid
    cache[clean_val] = new_id
    return new_id

def create_and_seed_db(json_file=JSON_PATH, db_file=DB_PATH):
    print(f"Reading JSON dataset from: {json_file}")
    if not os.path.exists(json_file):
        print(f"Error: JSON file not found at {json_file}", file=sys.stderr)
        sys.exit(1)

    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    print(f"Connecting to SQLite database at: {os.path.abspath(db_file)}")
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()

    # DDL Schema Creation
    cursor.executescript("""
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS units (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS storage_locations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS suppliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS items (
            item_code TEXT PRIMARY KEY,
            category_id INTEGER NOT NULL REFERENCES categories(id),
            description TEXT NOT NULL,
            specification TEXT,
            material_finish TEXT,
            quantity_on_hand INTEGER NOT NULL DEFAULT 0 CHECK (quantity_on_hand >= 0),
            unit_id INTEGER REFERENCES units(id),
            reorder_level INTEGER NOT NULL DEFAULT 0 CHECK (reorder_level >= 0),
            storage_location_id INTEGER REFERENCES storage_locations(id),
            supplier_id INTEGER REFERENCES suppliers(id),
            last_counted DATE,
            notes TEXT,
            image_url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_items_category ON items(category_id);
        CREATE INDEX IF NOT EXISTS idx_items_supplier ON items(supplier_id);
        CREATE INDEX IF NOT EXISTS idx_items_location ON items(storage_location_id);
        CREATE INDEX IF NOT EXISTS idx_items_reorder ON items(quantity_on_hand, reorder_level);

        CREATE VIEW IF NOT EXISTS v_hardware_inventory AS
        SELECT
            i.item_code,
            i.description,
            i.specification,
            i.material_finish,
            c.name AS category,
            i.quantity_on_hand,
            u.name AS unit,
            i.reorder_level,
            CASE
                WHEN i.quantity_on_hand <= i.reorder_level THEN 1
                ELSE 0
            END AS needs_reorder,
            sl.code AS storage_bin,
            s.name AS supplier,
            i.last_counted,
            i.notes,
            i.image_url
        FROM items i
        JOIN categories c ON i.category_id = c.id
        LEFT JOIN units u ON i.unit_id = u.id
        LEFT JOIN storage_locations sl ON i.storage_location_id = sl.id
        LEFT JOIN suppliers s ON i.supplier_id = s.id;
    """)

    cat_cache, unit_cache, bin_cache, supp_cache = {}, {}, {}, {}
    inserted, updated = 0, 0

    with conn:
        for sheet_name, rows in data.items():
            clean_category = sanitize_str(sheet_name)
            if not clean_category or clean_category == "Read Me" or not isinstance(rows, list):
                continue

            cat_id = get_or_create_id(cursor, "categories", "name", clean_category, cat_cache)

            for row in rows:
                if not isinstance(row, dict):
                    continue

                item_code = sanitize_str(row.get("Item Code") or row.get("Unnamed: 0"))
                if not item_code:
                    continue

                description = sanitize_str(row.get("Item / Description")) or "Unspecified Hardware"
                specification = sanitize_str(row.get("Specification / Size"))
                material = sanitize_str(row.get("Material / Finish"))
                qty = sanitize_int(row.get("Quantity on Hand"), 0)
                reorder = sanitize_int(row.get("Reorder Level"), 0)

                unit_id = get_or_create_id(cursor, "units", "name", row.get("Unit"), unit_cache)
                bin_id = get_or_create_id(cursor, "storage_locations", "code", row.get("Storage Bin"), bin_cache)
                supplier_id = get_or_create_id(cursor, "suppliers", "name", row.get("Supplier"), supp_cache)

                last_counted = sanitize_str(row.get("Last Counted"))
                notes = sanitize_str(row.get("Notes"))
                image_url = sanitize_str(
                    row.get("Product Picture") or
                    row.get("Product Picture\n") or
                    row.get("Images") or
                    row.get("Images ")
                )

                cursor.execute("SELECT 1 FROM items WHERE item_code = ?", (item_code,))
                exists = cursor.fetchone() is not None

                cursor.execute("""
                    INSERT INTO items (
                        item_code, category_id, description, specification, material_finish,
                        quantity_on_hand, unit_id, reorder_level, storage_location_id,
                        supplier_id, last_counted, notes, image_url
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(item_code) DO UPDATE SET
                        category_id = excluded.category_id,
                        description = excluded.description,
                        specification = excluded.specification,
                        material_finish = excluded.material_finish,
                        quantity_on_hand = excluded.quantity_on_hand,
                        unit_id = excluded.unit_id,
                        reorder_level = excluded.reorder_level,
                        storage_location_id = excluded.storage_location_id,
                        supplier_id = excluded.supplier_id,
                        last_counted = excluded.last_counted,
                        notes = excluded.notes,
                        image_url = excluded.image_url,
                        updated_at = CURRENT_TIMESTAMP
                """, (
                    item_code, cat_id, description, specification, material,
                    qty, unit_id, reorder, bin_id, supplier_id,
                    last_counted, notes, image_url
                ))

                if exists:
                    updated += 1
                else:
                    inserted += 1

    # Verify counts
    cursor.execute("SELECT COUNT(*) FROM items")
    total_items = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM categories")
    total_categories = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM storage_locations")
    total_bins = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM suppliers")
    total_suppliers = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM units")
    total_units = cursor.fetchone()[0]

    conn.close()

    print("\n--- Database Creation Summary ---")
    print(f"Database File     : {os.path.abspath(db_file)}")
    print(f"Inserted Items    : {inserted}")
    print(f"Updated Items     : {updated}")
    print(f"Total Items       : {total_items}")
    print(f"Total Categories  : {total_categories}")
    print(f"Storage Locations : {total_bins}")
    print(f"Total Suppliers   : {total_suppliers}")
    print(f"Total Units       : {total_units}")
    print("---------------------------------")

if __name__ == "__main__":
    create_and_seed_db()
