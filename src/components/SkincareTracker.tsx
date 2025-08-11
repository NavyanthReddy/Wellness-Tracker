import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Sparkles, Sun, Moon } from 'lucide-react';
import { SkincareStep } from '../types';
import { getDailyData, updateSkincare } from '../utils/storage';

interface SkincareTrackerProps {
  date: string;
  onUpdate: () => void;
}

const SkincareTracker: React.FC<SkincareTrackerProps> = ({ date, onUpdate }) => {
  const [skincareSteps, setSkincareSteps] = useState<SkincareStep[]>([]);

  useEffect(() => {
    const dailyData = getDailyData(date);
    if (dailyData.skincare.length === 0) {
      // Initialize with default skincare routine
      const defaultSteps: SkincareStep[] = [
        { id: '1', name: 'Gentle Cleanser', category: 'cleanser', time: 'both', completed: false, date },
        { id: '2', name: 'Toner', category: 'toner', time: 'both', completed: false, date },
        { id: '3', name: 'Vitamin C Serum', category: 'serum', time: 'morning', completed: false, date },
        { id: '4', name: 'Moisturizer', category: 'moisturizer', time: 'both', completed: false, date },
        { id: '5', name: 'Sunscreen (SPF 30+)', category: 'sunscreen', time: 'morning', completed: false, date },
        { id: '6', name: 'Retinol Serum', category: 'serum', time: 'evening', completed: false, date },
        { id: '7', name: 'Eye Cream', category: 'other', time: 'both', completed: false, date },
      ];
      setSkincareSteps(defaultSteps);
      updateSkincare(date, defaultSteps);
    } else {
      setSkincareSteps(dailyData.skincare);
    }
  }, [date]);

  const handleToggleStep = (stepId: string) => {
    const updatedSteps = skincareSteps.map(step =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );
    setSkincareSteps(updatedSteps);
    updateSkincare(date, updatedSteps);
    onUpdate();
  };

  const addCustomStep = () => {
    const newStep: SkincareStep = {
      id: Date.now().toString(),
      name: 'Custom Step',
      category: 'other',
      time: 'both',
      completed: false,
      date,
    };
    const updatedSteps = [...skincareSteps, newStep];
    setSkincareSteps(updatedSteps);
    updateSkincare(date, updatedSteps);
    onUpdate();
  };

  const getCategoryIcon = (category: SkincareStep['category']) => {
    switch (category) {
      case 'cleanser': return '🧼';
      case 'toner': return '💧';
      case 'serum': return '💎';
      case 'moisturizer': return '🧴';
      case 'sunscreen': return '☀️';
      case 'mask': return '🎭';
      case 'other': return '✨';
      default: return '✨';
    }
  };

  const getTimeIcon = (time: SkincareStep['time']) => {
    switch (time) {
      case 'morning': return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'evening': return <Moon className="w-4 h-4 text-blue-500" />;
      case 'both': return <div className="flex space-x-1"><Sun className="w-3 h-3 text-yellow-500" /><Moon className="w-3 h-3 text-blue-500" /></div>;
      default: return <Sparkles className="w-4 h-4 text-purple-500" />;
    }
  };

  const morningSteps = skincareSteps.filter(step => step.time === 'morning' || step.time === 'both');
  const eveningSteps = skincareSteps.filter(step => step.time === 'evening' || step.time === 'both');
  const completedSteps = skincareSteps.filter(step => step.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Skincare Routine</h2>
          <p className="text-gray-600">Track your daily skincare steps</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Completed Today</p>
            <p className="text-2xl font-bold text-wellness-skincare">
              {completedSteps} / {skincareSteps.length}
            </p>
          </div>
          <button
            onClick={addCustomStep}
            className="btn-primary flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Add Step</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Daily Progress</span>
          <span className="text-sm text-gray-500">{Math.round((completedSteps / skincareSteps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-wellness-skincare to-purple-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps / skincareSteps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Morning Routine */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <Sun className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">Morning Routine</h3>
        </div>
        <div className="space-y-3">
          {morningSteps.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No morning steps configured</p>
          ) : (
            morningSteps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  step.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <button
                  onClick={() => handleToggleStep(step.id)}
                  className="flex-shrink-0"
                >
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getCategoryIcon(step.category)}</span>
                  <span className={`font-medium ${step.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {step.name}
                  </span>
                </div>
                <div className="ml-auto">
                  {getTimeIcon(step.time)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Evening Routine */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <Moon className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Evening Routine</h3>
        </div>
        <div className="space-y-3">
          {eveningSteps.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No evening steps configured</p>
          ) : (
            eveningSteps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  step.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <button
                  onClick={() => handleToggleStep(step.id)}
                  className="flex-shrink-0"
                >
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getCategoryIcon(step.category)}</span>
                  <span className={`font-medium ${step.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {step.name}
                  </span>
                </div>
                <div className="ml-auto">
                  {getTimeIcon(step.time)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-purple-900 mb-1">Skincare Tips</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Always apply sunscreen in the morning, even on cloudy days</li>
              <li>• Use gentle, fragrance-free products if you have sensitive skin</li>
              <li>• Don't forget to moisturize after cleansing</li>
              <li>• Be consistent with your routine for best results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkincareTracker;
