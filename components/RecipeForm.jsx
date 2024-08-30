"use client"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Select
          value={editedIngredient.quantity}
          onValueChange={(value) => setEditedIngredient({ ...editedIngredient, quantity: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select quantity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={editedIngredient.size}
          onChange={(e) => setEditedIngredient({ ...editedIngredient, size: e.target.value })}
          placeholder="Size"
        />
        <Button onClick={handleUpdate}>Save</Button>
        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-2 p-2 bg-gray-100 rounded">
      <span>{ingredient.name} - {ingredient.quantity} {ingredient.size}</span>
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

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: '', size: '' });

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.quantity && newIngredient.size) {
      setIngredients([...ingredients, { ...newIngredient, id: Date.now() }]);
      setNewIngredient({ name: '', quantity: '', size: '' });
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Recipe</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <Input
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                  placeholder="Ingredient name"
                />
              </div>
              <div className="w-[180px]">
                <Select
                  value={newIngredient.quantity}
                  onValueChange={(value) => setNewIngredient({ ...newIngredient, quantity: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Input
                  value={newIngredient.size}
                  onChange={(e) => setNewIngredient({ ...newIngredient, size: e.target.value })}
                  placeholder="Size"
                />
              </div>
              <Button onClick={addIngredient}>Add Ingredient</Button>
            </div>

            <div className="space-y-2">
              {ingredients.map(ingredient => (
                <IngredientItem
                  key={ingredient.id}
                  ingredient={ingredient}
                  onUpdate={updateIngredient}
                  onDelete={deleteIngredient}
                />
              ))}
            </div>

            {/* <Button type="submit" className="w-full">Create Recipe</Button> */}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RecipeForm;