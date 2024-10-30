'use client';
import { useState } from 'react';
import ImageUpload from './ImageUpload';

export default function RecipeForm() {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cooking_time: '',
    difficulty: '보통',
    category: '',
    serving_size: '',
    image_url: ''
  });

  const handleImageUpload = (imageUrl) => {
    setRecipe(prev => ({ ...prev, image_url: imageUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 레시피 저장 로직...
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 다른 입력 필드들... */}
      <ImageUpload onImageUpload={handleImageUpload} />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        레시피 저장
      </button>
    </form>
  );
} 