import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Clock, Utensils } from 'lucide-react';
import { Meal } from '../types';
import { getDailyData, addMeal, deleteItem } from '../utils/storage';

interface MealTrackerProps {
  date: string;
  onUpdate: () => void;
}

const MealTracker: React.FC<MealTrackerProps> = ({ date, onUpdate }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [formData, setFormData] = useState({
    type: 'breakfast' as Meal['type'],
    name: '',
    description: '',
    calories: '',
    time: '',
  });

  useEffect(() => {
    const dailyData = getDailyData(date);
    setMeals(dailyData.meals);
  }, [date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const meal: Meal = {
      id: editingMeal?.id || Date.now().toString(),
      type: formData.type,
      name: formData.name,
      description: formData.description || undefined,
      calories: formData.calories ? parseInt(formData.calories) : undefined,
      time: formData.time,
      date,
    };

    addMeal(date, meal);
    resetForm();
    onUpdate();
  };

  const handleDelete = (mealId: string) => {
    deleteItem(date, 'meal', mealId);
    onUpdate();
  };

  const handleEdit = (meal: Meal) => {
    setEditingMeal(meal);
    setFormData({
      type: meal.type,
      name: meal.name,
      description: meal.description || '',
      calories: meal.calories?.toString() || '',
      time: meal.time,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      type: 'breakfast',
      name: '',
      description: '',
      calories: '',
      time: '',
    });
    setEditingMeal(null);
    setShowForm(false);
  };

  const getMealIcon = (type: Meal['type']) => {
    switch (type) {
      case 'breakfast': return '🌅';
      case 'lunch': return '🌞';
      case 'dinner': return '🌙';
      case 'snack': return '🍎';
      default: return '🍽️';
    }
  };

  const totalCalories = meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Meal Tracker</h2>
          <p className="text-gray-600">Track your daily nutrition</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Calories</p>
            <p className="text-2xl font-bold text-wellness-meals">{totalCalories} kcal</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Meal</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">
            {editingMeal ? 'Edit Meal' : 'Add New Meal'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meal Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Meal['type'] })}
                  className="input-field"
                  required
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meal Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder="e.g., Oatmeal with berries"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                rows={3}
                placeholder="Additional details about your meal..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calories (optional)
              </label>
              <input
                type="number"
                value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                className="input-field"
                placeholder="e.g., 350"
                min="0"
              />
            </div>

            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                {editingMeal ? 'Update Meal' : 'Add Meal'}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Meals List */}
      <div className="space-y-4">
        {meals.length === 0 ? (
          <div className="card text-center py-12">
            <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No meals logged yet</h3>
            <p className="text-gray-600 mb-4">Start tracking your nutrition by adding your first meal</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              Add Your First Meal
            </button>
          </div>
        ) : (
          meals.map((meal) => (
            <div key={meal.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getMealIcon(meal.type)}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900 capitalize">{meal.type}</h4>
                      <span className="text-sm text-gray-500">•</span>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{meal.time}</span>
                      </div>
                    </div>
                    <p className="text-gray-900 font-medium">{meal.name}</p>
                    {meal.description && (
                      <p className="text-gray-600 text-sm mt-1">{meal.description}</p>
                    )}
                    {meal.calories && (
                      <p className="text-wellness-meals font-medium text-sm mt-1">
                        {meal.calories} kcal
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(meal)}
                    className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(meal.id)}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MealTracker;
