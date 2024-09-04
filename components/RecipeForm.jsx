"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Trash2, Edit } from 'lucide-react';

const IngredientItem = ({ ingredient, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedIngredient, setEditedIngredient] = useState(ingredient);

  const handleUpdate = () => {
    onUpdate(editedIngredient);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2 mb-2">
        <Input
          value={editedIngredient.name}
          onChange={(e) => setEditedIngredient({ ...editedIngredient, name: e.target.value })}
          placeholder="Ingredient name"
        />
        <Input
          value={editedIngredient.quantity}
          onChange={(e) => setEditedIngredient({ ...editedIngredient, quantity: e.target.value })}
          placeholder="Quantity"
          type="number"
          className="max-w-[100px]"
        />
        <Select
          value={editedIngredient.measurementType}
          onValueChange={(value) => setEditedIngredient({ ...editedIngredient, measurementType: value })}
        >
          <SelectTrigger className="max-w-[130px]">
            <SelectValue placeholder="Pick Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Dry</SelectLabel>
              <SelectItem value="cups-dry">Cups</SelectItem>
              <SelectItem value="dashes">Dashes</SelectItem>
              <SelectItem value="ounces-dry">Ounces</SelectItem>
              <SelectItem value="pinches">Pinches</SelectItem>
              <SelectItem value="tablespoons">Tablespoons</SelectItem>
              <SelectItem value="teaspoons">Teaspoons</SelectItem>
              <SelectItem value="pounds">Pounds</SelectItem>
              <SelectItem value="each">Each</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Liquids</SelectLabel>
              <SelectItem value="cups-liquid">Cups</SelectItem>
              <SelectItem value="gallons">Gallons</SelectItem>
              <SelectItem value="ounces-liquid">Ounces</SelectItem>
              <SelectItem value="pints">Pints</SelectItem>
              <SelectItem value="quarts">Quarts</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={handleUpdate}>Save</Button>
        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-2 p-2 bg-gray-100 rounded">
      <span>{ingredient.name} - {ingredient.quantity} {ingredient.measurementType}</span>
      <div>
        <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(ingredient)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const RecipeItem = ({ recipe }) => {
  const [isEditing, setIsEditing] = useState(false);
  // const [editedIngredient, setEditedIngredient] = useState(ingredient);

  // const handleUpdate = () => {
  //   onUpdate(editedIngredient);
  //   setIsEditing(false);
  // };

  // if (isEditing) {
  //   return (
  //     <div className="flex items-center space-x-2 mb-2">
  //       <Input
  //         value={editedIngredient.name}
  //         onChange={(e) => setEditedIngredient({ ...editedIngredient, name: e.target.value })}
  //         placeholder="Ingredient name"
  //       />
  //       <Input
  //         value={editedIngredient.quantity}
  //         onChange={(e) => setEditedIngredient({ ...editedIngredient, quantity: e.target.value })}
  //         placeholder="Quantity"
  //         type="number"
  //         className="max-w-[100px]"
  //       />
  //       <Select
  //         value={editedIngredient.measurementType}
  //         onValueChange={(value) => setEditedIngredient({ ...editedIngredient, measurementType: value })}
  //       >
  //         <SelectTrigger className="max-w-[130px]">
  //           <SelectValue placeholder="Pick Type" />
  //         </SelectTrigger>
  //         <SelectContent>
  //           <SelectGroup>
  //             <SelectLabel>Dry</SelectLabel>
  //             <SelectItem value="cups-dry">Cups</SelectItem>
  //             <SelectItem value="dashes">Dashes</SelectItem>
  //             <SelectItem value="ounces-dry">Ounces</SelectItem>
  //             <SelectItem value="pinches">Pinches</SelectItem>
  //             <SelectItem value="tablespoons">Tablespoons</SelectItem>
  //             <SelectItem value="teaspoons">Teaspoons</SelectItem>
  //             <SelectItem value="pounds">Pounds</SelectItem>
  //             <SelectItem value="each">Each</SelectItem>
  //           </SelectGroup>
  //           <SelectGroup>
  //             <SelectLabel>Liquids</SelectLabel>
  //             <SelectItem value="cups-liquid">Cups</SelectItem>
  //             <SelectItem value="gallons">Gallons</SelectItem>
  //             <SelectItem value="ounces-liquid">Ounces</SelectItem>
  //             <SelectItem value="pints">Pints</SelectItem>
  //             <SelectItem value="quarts">Quarts</SelectItem>
  //           </SelectGroup>
  //         </SelectContent>
  //       </Select>
  //       <Button onClick={handleUpdate}>Save</Button>
  //       <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
  //     </div>
  //   );
  // }
  console.log('Recipe======================:', recipe);

  return (
    <div className="items-center justify-between mb-2 p-2 bg-gray-100 rounded">
      <span>{recipe.name} - {recipe.description} {recipe.cookingTime}</span>
      <div className='ml-4 items-center text-center'>
        {recipe?.ingredients.map(ingredient => (
                <div key={ingredient.id}>{ingredient.name} - {ingredient.quantity} {ingredient.measurementType}</div>
              ))}
      </div>
      {/* <div>
        <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(ingredient)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div> */}
    </div>
  );
};

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({ id: 0, name: '', quantity: '', measurementType: '' });
  const [recipes, setRecipes] = useState([])
  const [recipe, setRecipe] = useState({ id: 0, name: '', description: '', cookingTime: '', ingredients: [] });

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.quantity && newIngredient.measurementType) {
      setIngredients([...ingredients, { ...newIngredient, id: Date.now() }]);
      // Instead of resetting all fields, we'll just increment the id
      setNewIngredient(prev => ({ name: '', quantity: '', measurementType: '', id: prev.id + 1 }));
      const newIngs = [...ingredients, { ...newIngredient, id: Date.now() }]
      setRecipe({ ...recipe, ingredients: newIngs, id: Date.now() })
    }
  };

  const updateIngredient = (updatedIngredient) => {
    setIngredients(ingredients.map(ing =>
      ing.id === updatedIngredient.id ? updatedIngredient : ing
    ));
  };

  const deleteIngredient = (ingredientToDelete) => {
    setIngredients(ingredients.filter(ing => ing.id !== ingredientToDelete.id));
  };

  const handleRecipeSubmit = (e) => {
    e.preventDefault();
    setRecipes([...recipes, {...recipe, id: Date.now()}])
    setRecipe({ name: '', description: '', cookingTime: '', ingredients: ingredients, id: Date.now() + 1 });

    console.log('Recipe:', recipes);
    console.log('Ingredients:', ingredients);
  };

  const getMeasurementTypeLabel = (value) => {
    const types = {
      'cups-dry': 'Cups (Dry)',
      'cups-liquid': 'Cups (Liquid)',
      'ounces-dry': 'Ounces (Dry)',
      'ounces-liquid': 'Ounces (Liquid)',
      'dashes': 'Dashes',
      'pinches': 'Pinches',
      'tablespoons': 'Tablespoons',
      'teaspoons': 'Teaspoons',
      'pounds': 'Pounds',
      'each': 'Each',
      'gallons': 'Gallons',
      'pints': 'Pints',
      'quarts': 'Quarts'
    };
    return types[value] || value;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Recipe</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRecipeSubmit}>
          <div className="space-y-4">
            <Input
              value={recipe.name}
              onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
              placeholder="Recipe Name"
            />
            <Input
              value={recipe.description}
              onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
              placeholder="Recipe Description"
            />
            <Input
              value={recipe.cookingTime}
              onChange={(e) => setRecipe({ ...recipe, cookingTime: e.target.value })}
              placeholder="Cooking Time"
            />

            <div className="flex items-end space-x-2">
              <Input
                value={newIngredient.quantity}
                onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
                placeholder="Quantity"
                type="number"
                className="max-w-[100px]"
              />
              <Select
                value={newIngredient.measurementType}
                onValueChange={(value) => setNewIngredient({ ...newIngredient, measurementType: value })}
              >
                <SelectTrigger className="max-w-[130px]">
                  <SelectValue placeholder="Pick Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Dry</SelectLabel>
                    <SelectItem value="cups-dry">Cups</SelectItem>
                    <SelectItem value="dashes">Dashes</SelectItem>
                    <SelectItem value="ounces-dry">Ounces</SelectItem>
                    <SelectItem value="pinches">Pinches</SelectItem>
                    <SelectItem value="tablespoons">Tablespoons</SelectItem>
                    <SelectItem value="teaspoons">Teaspoons</SelectItem>
                    <SelectItem value="pounds">Pounds</SelectItem>
                    <SelectItem value="each">Each</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Liquids</SelectLabel>
                    <SelectItem value="cups-liquid">Cups</SelectItem>
                    <SelectItem value="gallons">Gallons</SelectItem>
                    <SelectItem value="ounces-liquid">Ounces</SelectItem>
                    <SelectItem value="pints">Pints</SelectItem>
                    <SelectItem value="quarts">Quarts</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input
                value={newIngredient.name}
                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                placeholder="Ingredient name"
              />
              <Button onClick={addIngredient}>Add Ingredient</Button>
            </div>

            <div className="space-y-2">
              {ingredients.map(ingredient => (
                <IngredientItem
                  key={ingredient.id}
                  ingredient={{
                    ...ingredient,
                    measurementType: getMeasurementTypeLabel(ingredient.measurementType)
                  }}
                  onUpdate={updateIngredient}
                  onDelete={deleteIngredient}
                />
              ))}
            </div>

            <Button type="submit" className="w-full">Create Recipe</Button>
          </div>
        </form>
        {recipes?.map(recipe => (
          recipe?.name !== '' && (
            <RecipeItem
            key={recipe.id}
            recipe={{
              ...recipe,
            }}
          />
          )
        ))}
      </CardContent>
    </Card>
  );
};

export default RecipeForm;