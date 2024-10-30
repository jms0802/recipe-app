import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db = null;

async function openDb() {
  if (db) return db;
  
  db = await open({
    filename: './recipe.db',
    driver: sqlite3.Database
  });

  // 테이블이 없으면 생성
  await db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL,
      cooking_time INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

export { openDb };
