import RecipeForm from '../components/RecipeForm';

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create New Recipe</h1>
      <RecipeForm />
    </div>
  );
}