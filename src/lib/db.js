import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db = null;

async function openDb() {
  if (db) return db;
  
  db = await open({
    filename: './recipe.db',
    driver: sqlite3.Database
  });

  // 새로운 테이블 구조
  await db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,    -- 레시피 고유 식별자
      title TEXT NOT NULL,                     -- 레시피 제목
      ingredients TEXT NOT NULL,               -- 재료 목록 (쉼표로 구분)
      instructions TEXT NOT NULL,              -- 조리 방법 (단계별 설명)
      cooking_time INTEGER NOT NULL,           -- 조리 시간 (분 단위)
      difficulty TEXT CHECK(
        difficulty IN ('쉬움', '보통', '어려움')
      ) NOT NULL,                              -- 난이도 (쉬움/보통/어려움)
      category TEXT NOT NULL,                  -- 음식 카테고리 (예: 찌개, 구이, 볶음 등)
      serving_size INTEGER NOT NULL,           -- 몇 인분
      image_url TEXT,                          -- 레시피 이미지 URL (선택사항)
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- 레시피 생성 시간
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP     -- 레시피 수정 시간
    )
  `);

  return db;
}

export { openDb };
