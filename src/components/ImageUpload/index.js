'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './ImageUpload.module.css';

export default function ImageUpload({ onImageUpload, initialImage }) {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState(initialImage || null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (initialImage) {
            setPreview(initialImage);
        }
    }, [initialImage]);

    const handleFiles = async (file) => {
        if (file && file.type.startsWith('image/')) {
            // 파일 크기 체크 (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('파일 크기는 5MB 이하여야 합니다.');
                return;
            }

            // 미리보기 생성
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);

            try {
                setIsUploading(true);
                await onImageUpload(file);
            } catch (error) {
                console.error('업로드 실패:', error);
                setPreview(null);
            } finally {
                setIsUploading(false);
            }
        } else {
            alert('이미지 파일만 업로드 가능합니다.');
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFiles(files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFiles(files[0]);
        }
    };

    return (
        <div className={styles.uploadContainer}>
            <div
                className={`${styles.dropzone} 
                           ${isDragging ? styles.dragging : ''} 
                           ${preview ? styles.hasPreview : ''} 
                           ${isUploading ? styles.uploading : ''}`}
                onClick={!isUploading ? handleClick : undefined}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {isUploading ? (
                    <div className={styles.uploadingIndicator}>
                        <div className={styles.spinner}></div>
                        <p>업로드 중...</p>
                    </div>
                ) : preview ? (
                    <div className={styles.previewContainer}>
                        <img src={preview} alt="미리보기" className={styles.preview} />
                        <button 
                            className={styles.removeButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                setPreview(null);
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = '';
                                }
                            }}
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        <svg className={styles.uploadIcon} viewBox="0 0 24 24">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                        <p>이미지를 드래그하여 놓거나 클릭하여 선택하세요</p>
                        <span>JPG, PNG, GIF (최대 5MB)</span>
                    </div>
                )}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                accept="image/*"
                className={styles.fileInput}
                disabled={isUploading}
            />
        </div>
    );
} 