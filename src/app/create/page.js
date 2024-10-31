'use client';
import styles from './create.module.css';
import RecipeForm from '@/components/forms/RecipeForm';
import ImageUpload from '@/components/ImageUpload';
import { useState } from 'react';

export default function Create() {
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    const handleImageUpload = async (file) => {
        try {
            console.log('업로드 시작:', file);

            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('서버 응답:', data);

            if (!response.ok) {
                throw new Error(data.error || data.details || '이미지 업로드 실패');
            }

            setUploadedImageUrl(data.imageUrl);
            return data.imageUrl;
            
        } catch (error) {
            console.error('업로드 에러 상세:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            
            alert(`업로드 실패: ${error.message}`);
            throw error;
        }
    };

    return (
        <div className={styles.createContainer}>
            <div className={styles.createHeader}>
                <h1>레시피 추가</h1>
            </div>
            <div className={styles.createForm}>
                <ImageUpload 
                    onImageUpload={handleImageUpload}
                    initialImage={uploadedImageUrl}
                />
                <RecipeForm imageUrl={uploadedImageUrl} />
            </div>
        </div>
    );
}