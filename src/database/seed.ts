import { db } from '.';

const IS_PRODUCTION = process.env.NODE_ENV === 'development';
const DATABASE_URL = process.env.DATABASE_URL || './dev.sqlite';
const TABLE_NAME = process.env.TABLE_NAME || 'urls';

export const createTable = () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      record_id       TEXT      NOT NULL    UNIQUE PRIMARY KEY,
      redirect_url    TEXT      NOT NULL    UNIQUE NOT NULL,
      visitor_count   INTEGER   NOT NULL    DEFAULT 0,
        CHECK(length(redirect_url) > 8
          AND length(redirect_url) < 255
          AND (redirect_url LIKE 'http://%' OR redirect_url LIKE 'https://%'))
  )`
  );
};
// createTable();

export const seedTable = () => {
  console.log('Seeding ...');
  db.run(`INSERT INTO ${TABLE_NAME} (redirect_url, record_id, visitor_count) VALUES (?, ?, ?)`, [
    'https://srofighodgir.com',
    '99911',
    9,
  ]);
  db.run(`INSERT INTO ${TABLE_NAME} (redirect_url, record_id, visitor_count) VALUES (?, ?, ?)`, [
    'https://bvbv.com',
    '33893',
    32,
  ]);
  console.log('Seeded');
};
// seedTable();
