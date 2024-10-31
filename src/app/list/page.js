import { openDb } from '@/lib/db';
import RecipeCard from '@/components/RecipeCard';

async function getRecipes() {
  const db = await openDb();
  const recipes = await db.all('SELECT * FROM recipes');
  return recipes;
}

export default async function RecipeList() {
  const recipes = await getRecipes();

  return (
    <div className="container">
      {recipes.map(recipe => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
        />
      ))}
    </div>
  );
}
