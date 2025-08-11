import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, Plus, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { DailyData, WellnessStats } from '../types';
import { getDailyData } from '../utils/storage';
import MealTracker from './MealTracker';
import WorkoutTracker from './WorkoutTracker';
import SkincareTracker from './SkincareTracker';
import TaskTracker from './TaskTracker';

interface DashboardProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ selectedDate, onDateChange }) => {
  const [dailyData, setDailyData] = useState<DailyData>(getDailyData(selectedDate));
  const [activeTab, setActiveTab] = useState<'overview' | 'meals' | 'workouts' | 'skincare' | 'tasks'>('overview');

  useEffect(() => {
    setDailyData(getDailyData(selectedDate));
  }, [selectedDate]);

  const stats: WellnessStats = {
    totalMeals: dailyData.meals.length,
    totalWorkouts: dailyData.workouts.length,
    skincareCompleted: dailyData.skincare.filter(s => s.completed).length,
    tasksCompleted: dailyData.tasks.filter(t => t.completed).length,
    streak: 0, // TODO: Calculate streak
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'meals', label: 'Meals', icon: CheckCircle },
    { id: 'workouts', label: 'Workouts', icon: TrendingUp },
    { id: 'skincare', label: 'Skincare', icon: CheckCircle },
    { id: 'tasks', label: 'Tasks', icon: CheckCircle },
  ];

  const handleDataUpdate = () => {
    setDailyData(getDailyData(selectedDate));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wellness Tracker</h1>
          <p className="text-gray-600 mt-1">Track your daily wellness journey</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border">
            <Calendar className="w-5 h-5 text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="border-none outline-none text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="card bg-gradient-to-br from-wellness-meals to-green-400 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Meals Today</p>
                    <p className="text-2xl font-bold">{stats.totalMeals}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 opacity-80" />
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-wellness-workouts to-yellow-400 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Workouts</p>
                    <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 opacity-80" />
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-wellness-skincare to-purple-400 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Skincare Steps</p>
                    <p className="text-2xl font-bold">{stats.skincareCompleted}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 opacity-80" />
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-wellness-tasks to-red-400 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Tasks Done</p>
                    <p className="text-2xl font-bold">{stats.tasksCompleted}</p>
                  </div>
                  <Target className="w-8 h-8 opacity-80" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Today's Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Calories:</span>
                    <span className="font-medium">
                      {dailyData.meals.reduce((sum, meal) => sum + (meal.calories || 0), 0)} kcal
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Workout Time:</span>
                    <span className="font-medium">
                      {dailyData.workouts.reduce((sum, workout) => sum + workout.duration, 0)} min
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tasks Completed:</span>
                    <span className="font-medium">
                      {stats.tasksCompleted} / {dailyData.tasks.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Quick Add</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab('meals')}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Meal</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('workouts')}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Workout</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('tasks')}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Task</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'meals' && (
          <MealTracker date={selectedDate} onUpdate={handleDataUpdate} />
        )}

        {activeTab === 'workouts' && (
          <WorkoutTracker date={selectedDate} onUpdate={handleDataUpdate} />
        )}

        {activeTab === 'skincare' && (
          <SkincareTracker date={selectedDate} onUpdate={handleDataUpdate} />
        )}

        {activeTab === 'tasks' && (
          <TaskTracker date={selectedDate} onUpdate={handleDataUpdate} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
