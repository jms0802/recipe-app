'use client';
import { useState } from 'react';

export default function ImageUpload({ onImageUpload }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.imageUrl) {
        onImageUpload(data.imageUrl);
      }
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {uploading ? '업로드 중...' : '이미지 선택'}
      </label>
      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="미리보기"
            className="max-w-xs rounded-lg"
          />
        </div>
      )}
    </div>
  );
} 