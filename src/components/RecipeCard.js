'use client';

import Image from 'next/image';

export default function RecipeCard({ recipe, onEdit, onDelete }) {
    const handleDelete = async () => {
        if (window.confirm('정말로 이 레시피를 삭제하시겠습니까?')) {
            try {
                const response = await fetch(`/api/recipes/${recipe.id}`, {
                    method: 'DELETE',
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || '삭제 실패');
                }
                
                onDelete(recipe.id);
            } catch (error) {
                console.error('삭제 중 오류 발생:', error);
                alert('레시피 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="recipe-card">
            <div className="recipe-header">
                <h1 className="recipe-title">{recipe.title}</h1>
                <div className="recipe-button">
                    <button onClick={() => onEdit(recipe)}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
            </div>
            <div className="recipe-layout">
                {/* 이미지 섹션 */}
                {recipe.image_url && (
                    <div className="image-container">
                        <Image
                            src={recipe.image_url}
                            alt={recipe.title}
                            fill
                            sizes="400px"
                            style={{ objectFit: 'cover' }}
                            priority={true}
                        />
                    </div>
                )}

                {/* 내용 섹션 */}
                <div className="content-container">
                    <div className="recipe-info-grid">
                        <InfoItem label="난이도" value={recipe.difficulty} />
                        <InfoItem label="카테고리" value={recipe.category} />
                        <InfoItem label="조리시간" value={`${recipe.cooking_time}분`} />
                        <InfoItem label="몇인분" value={`${recipe.serving_size}인분`} />
                    </div>

                    <div className="recipe-section">
                        <h2 className="section-title">재료</h2>
                        <p className="ingredients-list">{recipe.ingredients}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 정보 아이템을 위한 작은 컴포넌트
function InfoItem({ label, value }) {
    return (
        <div className="info-item">
            <span className="info-label">{label}:</span>
            <span className="info-value">{value}</span>
        </div>
    );
} 