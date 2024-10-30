import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { uploadDir, ensureUploadDir } from '@/lib/uploadConfig';
import path from 'path';

export async function POST(request) {
  try {
    await ensureUploadDir();

    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return NextResponse.json(
        { error: '이미지 파일이 필요합니다' },
        { status: 400 }
      );
    }

    // 파일 확장자 검사
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: '지원하지 않는 파일 형식입니다' },
        { status: 400 }
      );
    }

    // 파일명 생성 (timestamp-원본파일명)
    const timestamp = Date.now();
    const originalName = file.name;
    const fileName = `${timestamp}-${originalName}`;
    const filePath = path.join(uploadDir, fileName);

    // 파일 저장
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // 클라이언트에서 접근 가능한 URL 반환
    const imageUrl = `/uploads/${fileName}`;
    
    return NextResponse.json({ 
      message: '이미지가 업로드되었습니다',
      imageUrl 
    });
  } catch (error) {
    console.error('업로드 에러:', error);
    return NextResponse.json(
      { error: '이미지 업로드에 실패했습니다' },
      { status: 500 }
    );
  }
} 