-- ================================
-- CREATE CATEGORIES TABLE
-- ================================
-- This table was referenced in the backend but missing from the schema
CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- INSERT SAMPLE CATEGORIES
-- ================================
INSERT INTO categories (category_name, description) VALUES
('Theft', 'Report related to theft or robbery'),
('Assault', 'Report related to physical assault or violence'),
('Property Damage', 'Report related to property damage or vandalism'),
('Dispute', 'Report related to disputes between parties'),
('Lost & Found', 'Report related to lost or found items'),
('Traffic', 'Report related to traffic violations or accidents'),
('Other', 'Other types of reports')
ON CONFLICT (category_name) DO NOTHING;
