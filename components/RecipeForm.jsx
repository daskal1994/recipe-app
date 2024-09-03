"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Trash2, Edit, Save } from 'lucide-react';

const IngredientItem = ({ recipe, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(recipe);

  const handleUpdate = () => {
    onUpdate(editedRecipe);
    setIsEditing(false);
  };

  const handleInputChange = (e, field) => {
    setEditedRecipe({ ...editedRecipe, [field]: e.target.value });
  };

  if (isEditing) {
    return (
      <Card className="mb-4 p-4">
        <div className="space-y-4">
          <Input
            value={editedRecipe.name}
            onChange={(e) => handleInputChange(e, 'name')}
            placeholder="Recipe Name"
          />
          <Input
            value={editedRecipe.description}
            onChange={(e) => handleInputChange(e, 'description')}
            placeholder="Recipe Description"
          />
          <Input
            value={editedRecipe.cookingTime}
            onChange={(e) => handleInputChange(e, 'cookingTime')}
            placeholder="Cooking Time"
          />
          <div className="flex space-x-2">
            <Select
              value={editedRecipe.measurementType}
              onValueChange={(value) => setEditedRecipe({ ...editedRecipe, measurementType: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pick Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Dry</SelectLabel>
                  <SelectItem value="cups-dry">Cups (Dry)</SelectItem>
                  <SelectItem value="ounces-dry">Ounces (Dry)</SelectItem>
                  <SelectItem value="pounds">Pounds</SelectItem>
                  {/* Add other dry measurements */}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Liquids</SelectLabel>
                  <SelectItem value="cups-liquid">Cups (Liquid)</SelectItem>
                  <SelectItem value="ounces-liquid">Ounces (Liquid)</SelectItem>
                  {/* Add other liquid measurements */}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              value={editedRecipe.quantity}
              onChange={(e) => handleInputChange(e, 'quantity')}
              placeholder="Quantity"
              type="number"
              className="w-[100px]"
            />
            <Input
              value={editedRecipe.ingredientName}
              onChange={(e) => handleInputChange(e, 'ingredientName')}
              placeholder="Ingredient name"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={handleUpdate}>
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mb-4 p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{recipe.name}</h3>
          <p className="text-sm text-gray-500">{recipe.description}</p>
          <p className="text-sm">Cooking Time: {recipe.cookingTime}</p>
          <p className="text-sm">
            Ingredient: {recipe.ingredientName} - {recipe.quantity} {recipe.measurementType}
          </p>
        </div>
        <div>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(recipe.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const RecipeForm = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    id: 0,
    name: '',
    description: '',
    cookingTime: '',
    ingredientName: '',
    quantity: '',
    measurementType: ''
  });

  const addRecipe = () => {
    if (newRecipe.name && newRecipe.ingredientName && newRecipe.quantity && newRecipe.measurementType) {
      setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
      setNewRecipe({
        id: Date.now() + 1,
        name: '',
        description: '',
        cookingTime: '',
        ingredientName: '',
        quantity: '',
        measurementType: ''
      });
    }

    console.log('Recipe:', newRecipe);
    console.log('Ingredients:', recipes);
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ));
  };

  const deleteRecipe = (recipeId) => {
    setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
  };

  const handleInputChange = (e, field) => {
    setNewRecipe({ ...newRecipe, [field]: e.target.value });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Recipe</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <Input
              value={newRecipe.name}
              onChange={(e) => handleInputChange(e, 'name')}
              placeholder="Recipe Name"
            />
            <Input
              value={newRecipe.description}
              onChange={(e) => handleInputChange(e, 'description')}
              placeholder="Recipe Description"
            />
            <Input
              value={newRecipe.cookingTime}
              onChange={(e) => handleInputChange(e, 'cookingTime')}
              placeholder="Cooking Time"
            />
            <div className="flex space-x-2">
              <Select
                value={newRecipe.measurementType}
                onValueChange={(value) => setNewRecipe({ ...newRecipe, measurementType: value })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Pick Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Dry</SelectLabel>
                    <SelectItem value="cups-dry">Cups (Dry)</SelectItem>
                    <SelectItem value="ounces-dry">Ounces (Dry)</SelectItem>
                    <SelectItem value="pounds">Pounds</SelectItem>
                    {/* Add other dry measurements */}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Liquids</SelectLabel>
                    <SelectItem value="cups-liquid">Cups (Liquid)</SelectItem>
                    <SelectItem value="ounces-liquid">Ounces (Liquid)</SelectItem>
                    {/* Add other liquid measurements */}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                value={newRecipe.quantity}
                onChange={(e) => handleInputChange(e, 'quantity')}
                placeholder="Quantity"
                type="number"
                className="w-[100px]"
              />
              <Input
                value={newRecipe.ingredientName}
                onChange={(e) => handleInputChange(e, 'ingredientName')}
                placeholder="Ingredient name"
              />
            </div>
            <Button onClick={addRecipe} className="w-full">Add Recipe</Button>
          </div>
        </form>

        <div className="mt-8 space-y-4">
          {recipes.map(recipe => (
            <IngredientItem
              key={recipe.id}
              recipe={recipe}
              onUpdate={updateRecipe}
              onDelete={deleteRecipe}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeForm;