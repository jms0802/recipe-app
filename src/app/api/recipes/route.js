import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET: 모든 레시피 가져오기
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM recipes');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: '레시피를 가져오는데 실패했습니다' },
      { status: 500 }
    );
  }
}

// POST: 새 레시피 추가
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, ingredients, instructions, cooking_time } = body;
    
    const [result] = await pool.query(
      'INSERT INTO recipes (title, ingredients, instructions, cooking_time) VALUES (?, ?, ?, ?)',
      [title, ingredients, instructions, cooking_time]
    );
    
    return NextResponse.json({ message: '레시피가 추가되었습니다', id: result.insertId });
  } catch (error) {
    return NextResponse.json(
      { error: '레시피 추가에 실패했습니다' },
      { status: 500 }
    );
  }
}
