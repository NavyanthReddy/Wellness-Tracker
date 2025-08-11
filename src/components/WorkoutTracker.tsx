import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Clock, Activity, Timer } from 'lucide-react';
import { Workout } from '../types';
import { getDailyData, addWorkout, deleteItem } from '../utils/storage';

interface WorkoutTrackerProps {
  date: string;
  onUpdate: () => void;
}

const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({ date, onUpdate }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [formData, setFormData] = useState({
    type: '',
    duration: '',
    intensity: 'medium' as Workout['intensity'],
    description: '',
    time: '',
  });

  useEffect(() => {
    const dailyData = getDailyData(date);
    setWorkouts(dailyData.workouts);
  }, [date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const workout: Workout = {
      id: editingWorkout?.id || Date.now().toString(),
      type: formData.type,
      duration: parseInt(formData.duration),
      intensity: formData.intensity,
      description: formData.description || undefined,
      time: formData.time,
      date,
    };

    addWorkout(date, workout);
    resetForm();
    onUpdate();
  };

  const handleDelete = (workoutId: string) => {
    deleteItem(date, 'workout', workoutId);
    onUpdate();
  };

  const handleEdit = (workout: Workout) => {
    setEditingWorkout(workout);
    setFormData({
      type: workout.type,
      duration: workout.duration.toString(),
      intensity: workout.intensity,
      description: workout.description || '',
      time: workout.time,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      type: '',
      duration: '',
      intensity: 'medium',
      description: '',
      time: '',
    });
    setEditingWorkout(null);
    setShowForm(false);
  };

  const getIntensityColor = (intensity: Workout['intensity']) => {
    switch (intensity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getWorkoutIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('run') || lowerType.includes('cardio')) return '🏃‍♂️';
    if (lowerType.includes('walk')) return '🚶‍♂️';
    if (lowerType.includes('yoga')) return '🧘‍♀️';
    if (lowerType.includes('gym') || lowerType.includes('weight')) return '🏋️‍♂️';
    if (lowerType.includes('swim')) return '🏊‍♂️';
    if (lowerType.includes('bike') || lowerType.includes('cycle')) return '🚴‍♂️';
    if (lowerType.includes('dance')) return '💃';
    return '💪';
  };

  const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Workout Tracker</h2>
          <p className="text-gray-600">Track your daily exercise activities</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Time</p>
            <p className="text-2xl font-bold text-wellness-workouts">{totalDuration} min</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Workout</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">
            {editingWorkout ? 'Edit Workout' : 'Add New Workout'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Workout Type
                </label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Running, Yoga, Gym"
                  required
                />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="input-field"
                  placeholder="e.g., 30"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intensity
                </label>
                <select
                  value={formData.intensity}
                  onChange={(e) => setFormData({ ...formData, intensity: e.target.value as Workout['intensity'] })}
                  className="input-field"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
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
                placeholder="Additional details about your workout..."
              />
            </div>

            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                {editingWorkout ? 'Update Workout' : 'Add Workout'}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Workouts List */}
      <div className="space-y-4">
        {workouts.length === 0 ? (
          <div className="card text-center py-12">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts logged yet</h3>
            <p className="text-gray-600 mb-4">Start tracking your fitness by adding your first workout</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              Add Your First Workout
            </button>
          </div>
        ) : (
          workouts.map((workout) => (
            <div key={workout.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getWorkoutIcon(workout.type)}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{workout.type}</h4>
                      <span className="text-sm text-gray-500">•</span>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{workout.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Timer className="w-3 h-3" />
                        <span>{workout.duration} min</span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getIntensityColor(workout.intensity)}`}
                      >
                        {workout.intensity} intensity
                      </span>
                    </div>
                    {workout.description && (
                      <p className="text-gray-600 text-sm mt-1">{workout.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(workout)}
                    className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(workout.id)}
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

export default WorkoutTracker;
