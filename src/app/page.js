'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          console.error('데이터가 배열이 아닙니다:', data);
          setRecipes([]);
        }
      })
      .catch(err => {
        console.error('데이터 로딩 중 에러:', err);
        setError(err.message);
      });
  }, []);

  if (error) return <div>에러가 발생했습니다: {error}</div>;

  return (
    <div>
      <h1>나의 레시피 북</h1>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <h2>{recipe.title}</h2>
          <p>조리시간: {recipe.cooking_time}분</p>
          <p>재료: {recipe.ingredients}</p>
          <p>조리방법: {recipe.instructions}</p>
        </div>
      ))}
    </div>
  );
}
