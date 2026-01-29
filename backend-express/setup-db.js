const pool = require("./config/db");

async function createCategoriesTable() {
  try {
    console.log("Creating categories table...");

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS categories (
        category_id SERIAL PRIMARY KEY,
        category_name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(createTableQuery);
    console.log("✓ Categories table created successfully");

    const insertDataQuery = `
      INSERT INTO categories (category_name, description) VALUES
      ('Theft', 'Report related to theft or robbery'),
      ('Assault', 'Report related to physical assault or violence'),
      ('Property Damage', 'Report related to property damage or vandalism'),
      ('Dispute', 'Report related to disputes between parties'),
      ('Lost & Found', 'Report related to lost or found items'),
      ('Traffic', 'Report related to traffic violations or accidents'),
      ('Other', 'Other types of reports')
      ON CONFLICT (category_name) DO NOTHING;
    `;

    const result = await pool.query(insertDataQuery);
    console.log(`✓ Inserted ${result.rowCount || 0} sample categories`);

    // Verify the table
    const verifyQuery = "SELECT COUNT(*) as count FROM categories;";
    const verifyResult = await pool.query(verifyQuery);
    console.log(
      `✓ Total categories in database: ${verifyResult.rows[0].count}`,
    );

    console.log("\n✓ Categories table setup completed.");
  } catch (error) {
    console.error("✗ Error setting up categories table:", error.message);
    process.exit(1);
  }
}

async function addPoliceStationIdToUsersTable() {
  try {
    console.log("Adding police_station_id to users table...");
    const alterTableQuery = `
      ALTER TABLE users
      ADD COLUMN police_station_id INT;
      
      ALTER TABLE users
      ADD CONSTRAINT fk_police_station
      FOREIGN KEY (police_station_id)
      REFERENCES police_stations(station_id);
    `;
    await pool.query(alterTableQuery);
    console.log("✓ police_station_id added to users table successfully");
  } catch (error) {
    if (error.code === '42P07') { // duplicate_column error code
      console.log("✓ police_station_id already exists in users table, skipping.");
    } else {
      console.error("✗ Error adding police_station_id to users table:", error.message);
      process.exit(1);
    }
  }
}

async function setupDatabase() {
  await createCategoriesTable();
  await addPoliceStationIdToUsersTable();
  console.log("\n✓ Database setup completed successfully!");
  process.exit(0);
}

setupDatabase();
