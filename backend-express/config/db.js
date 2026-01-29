const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const pool = new Pool({
  //   connectionString: process.env.DATABASE_URL,
  connectionString:
    "postgresql://postgres.chrcaqtpxbcrrjhhniic:Krishaa29072003@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres",
  ssl: { rejectUnauthorized: false },
  max: 5, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Timeout for acquiring a client
});



// Handle pool errors
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = pool;

// new
// const dotenv = require("dotenv");
// const { Pool } = require("pg");

// dotenv.config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   console.log(" DATABASE_URL :" postgresql://postgres.chrcaqtpxbcrrjhhniic:Krishaa29072003@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres);
  
//   ssl: { rejectUnauthorized: false },
//   max: 5,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// // Handle pool errors
// pool.on("error", (err) => {
//   console.error("Unexpected error on idle client", err);
//   process.exit(1);
// });

// module.exports = pool;

