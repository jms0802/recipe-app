'use client';
import { useState, useEffect } from 'react';
import styles from './RecipeForm.module.css';

export default function RecipeForm({ imageUrl }) {
    const [recipe, setRecipe] = useState({
        title: '',
        difficulty: '보통',
        category: '',
        cooking_time: '',
        serving_size: '',
        ingredients: '',
        instructions: '레시피 순서를 입력하세요',
        image_url: imageUrl || ''
    });

    useEffect(() => {
        if (imageUrl) {
            setRecipe(prev => ({
                ...prev,
                image_url: imageUrl
            }));
        }
    }, [imageUrl]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prev => ({
            ...prev,
            [name]: value.slice(0, 1000000)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const recipeData = {
                ...recipe,
                cooking_time: parseInt(recipe.cooking_time, 10),
                serving_size: parseInt(recipe.serving_size, 10)
            };

            console.log('서버로 보내는 데이터:', recipeData);

            const response = await fetch('/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData)
            });

            const data = await response.json();
            console.log('서버 응답:', data);

            if (!response.ok) {
                throw new Error(data.error || '레시피 저장에 실패했습니다.');
            }

            alert('레시피가 성공적으로 저장되었습니다!');
            window.location.href = '/';
            
        } catch (error) {
            console.error('레시피 저장 실패:', error);
            alert(`레시피 저장 실패: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {/* 제목 */}
            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                <label htmlFor="title">제목</label>
                <input 
                    type="text" 
                    id="title" 
                    name="title"
                    value={recipe.title}
                    onChange={handleChange}
                    required 
                    placeholder="레시피 제목을 입력하세요"
                />
            </div>

            {/* 난이도와 카테고리를 같은 줄에 */}
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="difficulty">난이도</label>
                    <select 
                        id="difficulty" 
                        name="difficulty"
                        value={recipe.difficulty}
                        onChange={handleChange}
                        required
                    >
                        <option value="쉬움">쉬움</option>
                        <option value="보통">보통</option>
                        <option value="어려움">어려움</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="category">카테고리</label>
                    <select 
                        id="category" 
                        name="category"
                        value={recipe.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">카테고리 선택</option>
                        <option value="찌개">찌개</option>
                        <option value="구이">구이</option>
                        <option value="볶음">볶음</option>
                        <option value="튀김">튀김</option>
                        <option value="디저트">디저트</option>
                    </select>
                </div>
            </div>

            {/* 조리시간과 몇인분을 같은 줄에 */}
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="cooking_time">조리시간</label>
                    <div className={styles.timeInput}>
                        <input 
                            type="number" 
                            id="cooking_time" 
                            name="cooking_time"
                            value={recipe.cooking_time}
                            onChange={handleChange}
                            required 
                            min="1"
                            placeholder="30"
                        />
                        <span>분</span>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="serving_size">몇인분</label>
                    <div className={styles.servingInput}>
                        <input 
                            type="number" 
                            id="serving_size" 
                            name="serving_size"
                            value={recipe.serving_size}
                            onChange={handleChange}
                            required 
                            min="1"
                            placeholder="2"
                        />
                        <span>인분</span>
                    </div>
                </div>
            </div>

            {/* 재료 */}
            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                <label htmlFor="ingredients">재료</label>
                <textarea 
                    id="ingredients" 
                    name="ingredients"
                    value={recipe.ingredients}
                    onChange={handleChange}
                    required
                    placeholder="예: 김치 300g, 돼지고기 200g, 두부 1모"
                    rows="4"
                />
            </div>

            {/* 조리방법 추가 */}
            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                <label htmlFor="instructions">조리방법</label>
                <textarea 
                    id="instructions" 
                    name="instructions"
                    value={recipe.instructions}
                    onChange={handleChange}
                    required
                    placeholder="조리 순서를 입력하세요"
                    rows="6"
                />
            </div>

            <button type="submit" className={styles.submitButton}>
                레시피 저장
            </button>
        </form>
    );
} 