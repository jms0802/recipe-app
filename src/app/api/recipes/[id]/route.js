import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const db = await openDb();
        
        await db.run('DELETE FROM recipes WHERE id = ?', id);
        
        return NextResponse.json({ 
            message: '레시피가 성공적으로 삭제되었습니다.' 
        });
    } catch (error) {
        console.error('레시피 삭제 중 오류 발생:', error);
        return NextResponse.json(
            { error: '레시피 삭제 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
} 