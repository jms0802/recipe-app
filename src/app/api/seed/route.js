import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await openDb();
    
    await db.run(`
      INSERT INTO recipes (title, ingredients, instructions, cooking_time)
      VALUES 
        ('김치찌개', '김치 300g, 돼지고기 200g, 두부 1모', '1. 돼지고기를 볶습니다...', 30),
        ('된장찌개', '된장 100g, 두부 1모, 감자 2개', '1. 물을 끓입니다...', 25)
    `);
    
    return NextResponse.json({ message: '테스트 데이터가 추가되었습니다' });
  } catch (error) {
    console.error('DB 에러:', error);
    return NextResponse.json(
      { error: '테스트 데이터 추가 실패' },
      { status: 500 }
    );
  }
} 