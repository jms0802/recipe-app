import path from 'path';
import fs from 'fs/promises';

// 이미지를 저장할 디렉토리 설정
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// 디렉토리가 없으면 생성
async function ensureUploadDir() {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

export { uploadDir, ensureUploadDir }; 