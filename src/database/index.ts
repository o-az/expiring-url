import { Database } from 'bun:sqlite';
import fs from 'node:fs';

export interface Row {
  record_id: string;
  redirect_url: string;
  visitor_count: number;
}

export type $Row = {
  [K in keyof Row as `$${K}`]: Row[K];
};

const IS_PRODUCTION = process.env.NODE_ENV === 'development';
const DATABASE_URL = process.env.DATABASE_URL || './dev.sqlite';
const TABLE_NAME = process.env.TABLE_NAME || 'urls';

// check if the database file exists
if (!fs.existsSync(DATABASE_URL)) {
  console.log('Creating new database file');
  // if not, create it
  fs.openSync(DATABASE_URL, 'w');
  fs.chmodSync(DATABASE_URL, 0o666);
}

export const db = new Database(DATABASE_URL, {
  readwrite: true,
});

export const newEntry = (entry: Row) =>
  db.run(`INSERT INTO ${TABLE_NAME} (redirect_url, record_id, visitor_count) VALUES (?, ?, ?)`, [
    entry,
  ]);

export const getAllEntries = db.prepare(`SELECT * FROM urls`);

export const getByURL = (url: string) =>
  db.query('SELECT * FROM ${TABLE_NAME} WHERE url = ?').get(url);

export const updateVisitorCount = (id: string) =>
  db.run(`UPDATE ${TABLE_NAME} SET visitor_count = visitor_count + 1 WHERE id = ?`, id);
