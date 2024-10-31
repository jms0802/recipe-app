import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// GET 요청 처리 추가
export async function GET() {
    return NextResponse.json(
        { error: '잘못된 요청 메소드입니다.' },
        { status: 405 }
    );
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json(
                { error: '이미지가 없습니다.' },
                { status: 400 }
            );
        }

        // 파일 정보 로깅
        console.log('파일 정보:', {
            type: file.type,
            size: file.size,
            name: file.name
        });

        // uploads 디렉토리 생성
        const publicDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(publicDir, { recursive: true });

        // 파일 데이터를 Buffer로 변환
        const bytes = await new Response(file).arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 파일명 생성 - null 체크 추가
        const timestamp = Date.now();
        const originalName = file.name ? file.name.replace(/[^a-zA-Z0-9.]/g, '') : `image-${timestamp}.png`;
        const fileName = `${timestamp}-${originalName}`;
        const filePath = path.join(publicDir, fileName);

        // 파일 저장
        await writeFile(filePath, buffer);
        console.log('파일 저장 완료:', filePath);

        return NextResponse.json({ 
            message: '이미지가 업로드되었습니다.',
            imageUrl: `/uploads/${fileName}`
        });

    } catch (error) {
        console.error('서버 에러 상세:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });

        return NextResponse.json(
            { error: '서버에서 이미지 처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
}; 