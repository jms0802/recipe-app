'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // 레시피 목록 가져오기
    fetch('/api/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  // 새 레시피 추가하는 함수
  const addRecipe = async (recipeData) => {
    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData)
    });
    const data = await res.json();
    // 성공하면 목록 새로고침
    if (data.id) {
      fetch('/api/recipes')
        .then(res => res.json())
        .then(data => setRecipes(data));
    }
  };

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
