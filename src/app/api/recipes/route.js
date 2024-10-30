import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

// GET: 모든 레시피 가져오기
export async function GET() {
  try {
    const db = await openDb();
    const recipes = await db.all('SELECT * FROM recipes');
    return NextResponse.json(recipes || []);
  } catch (error) {
    console.error('DB 에러:', error);
    return NextResponse.json(
      { error: '데이터베이스 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST: 새 레시피 추가
export async function POST(request) {
  try {
    const db = await openDb();
    const body = await request.json();
    const { 
      title, 
      ingredients, 
      instructions, 
      cooking_time,
      difficulty,
      category,
      serving_size,
      image_url 
    } = body;
    
    const result = await db.run(
      `INSERT INTO recipes (
        title, ingredients, instructions, cooking_time, 
        difficulty, category, serving_size, image_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, ingredients, instructions, cooking_time,
        difficulty, category, serving_size, image_url
      ]
    );
    
    return NextResponse.json({ 
      message: '레시피가 추가되었습니다', 
      id: result.lastID 
    });
  } catch (error) {
    console.error('DB 에러:', error);
    return NextResponse.json(
      { error: '레시피 추가에 실패했습니다' },
      { status: 500 }
    );
  }
}
