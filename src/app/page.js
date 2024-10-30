import Image from 'next/image';
import { openDb } from '@/lib/db';

async function getRecipes() {
  const db = await openDb();
  const recipes = await db.all('SELECT * FROM recipes');
  return recipes;
}

// 조리방법 텍스트를 줄바꿈으로 변환하는 함수
function formatInstructions(text) {
  return text
    .replace(/@/g, '\n')            // /n을 줄바꿈으로
    .split('\n')                      // 줄바꿈으로 분리
    .map(line => line.trim())         // 각 줄의 앞뒤 공백 제거
    .filter(line => line.length > 0); // 빈 줄 제거
}

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <div className="container">
      {recipes.map(recipe => (
        <div key={recipe.id} className="recipe-card">
          <h1 className="recipe-title">{recipe.title}</h1>
          
          <div className="recipe-layout">
            {/* 왼쪽: 이미지 */}
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

            {/* 오른쪽: 내용 */}
            <div className="content-container">
              <div className="recipe-info-grid">
                <div className="info-item">
                  <span className="info-label">난이도:</span>
                  <span className="info-value">{recipe.difficulty}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">카테고리:</span>
                  <span className="info-value">{recipe.category}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">조리시간:</span>
                  <span className="info-value">{recipe.cooking_time}분</span>
                </div>
                <div className="info-item">
                  <span className="info-label">몇인분:</span>
                  <span className="info-value">{recipe.serving_size}인분</span>
                </div>
              </div>

              <div className="recipe-section">
                <h2 className="section-title">재료</h2>
                <p className="ingredients-list">{recipe.ingredients}</p>
              </div>
            </div>
            <div>
                <h2 className="section-title">조리방법</h2>
                <div className="instructions">
                  {formatInstructions(recipe.instructions).map((step, index) => (
                    <p key={index} className="instruction-step">
                      {index + 1}. {step}
                    </p>
                  ))}
                </div>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
}
