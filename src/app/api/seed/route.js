import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await openDb();
    
    await db.run(`
      INSERT INTO recipes (
        title, 
        ingredients, 
        instructions, 
        cooking_time, 
        difficulty,
        category,
        serving_size,
        image_url
      )
      VALUES 
        (
          '김치찌개', 
          '김치 300g, 돼지고기 200g, 두부 1모', 
          '돼지고기를 볶습니다.@김치를 넣고 볶습니다.@물을 넣고 끓입니다.@두부와 대파를 넣고 마무리합니다.',
          30,
          '보통',
          '찌개',
          2,
          '/uploads/kimchi-stew.jpg'
        ),
        (
          '된장찌개', 
          '된장 100g, 두부 1모, 감자 2개', 
          '돼지고기를 볶습니다.@김치를 넣고 볶습니다.@물을 넣고 끓입니다.@두부와 대파를 넣고 마무리합니다.',
          25,
          '쉬움',
          '찌개',
          3,
          '/uploads/soybean-stew.jpg'
        )
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