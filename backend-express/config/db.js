const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const pool = new Pool({
  //   connectionString: process.env.DATABASE_URL,
  connectionString:
    "postgresql://postgres.chrcaqtpxbcrrjhhniic:Krishaa29072003@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres",
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;