'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RecipeCard from '@/components/RecipeCard';

export default function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        const response = await fetch('/api/recipes');
        const data = await response.json();
        setRecipes(data);
    };

    const handleEdit = (recipe) => {
        router.push(`/recipes/edit/${recipe.id}`);
    };

    const handleDelete = (deletedId) => {
        setRecipes(recipes.filter(recipe => recipe.id !== deletedId));
    };

    return (
        <div className="container">
            {recipes.map(recipe => (
                <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}
