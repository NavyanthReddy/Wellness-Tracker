import { DailyData, Meal, Workout, SkincareStep, Task } from '../types';

const STORAGE_KEY = 'wellness-tracker-data';

export const saveDailyData = (date: string, data: Partial<DailyData>): void => {
  const existingData = getAllData();
  const existingDateData = existingData[date] || {
    date,
    meals: [],
    workouts: [],
    skincare: [],
    tasks: [],
  };
  
  const updatedData = {
    ...existingData,
    [date]: {
      ...existingDateData,
      ...data,
    },
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
};

export const getDailyData = (date: string): DailyData => {
  const allData = getAllData();
  return allData[date] || {
    date,
    meals: [],
    workouts: [],
    skincare: [],
    tasks: [],
  };
};

export const getAllData = (): Record<string, DailyData> => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

export const addMeal = (date: string, meal: Meal): void => {
  const dailyData = getDailyData(date);
  dailyData.meals.push(meal);
  saveDailyData(date, dailyData);
};

export const addWorkout = (date: string, workout: Workout): void => {
  const dailyData = getDailyData(date);
  dailyData.workouts.push(workout);
  saveDailyData(date, dailyData);
};

export const updateSkincare = (date: string, skincare: SkincareStep[]): void => {
  const dailyData = getDailyData(date);
  dailyData.skincare = skincare;
  saveDailyData(date, dailyData);
};

export const addTask = (date: string, task: Task): void => {
  const dailyData = getDailyData(date);
  dailyData.tasks.push(task);
  saveDailyData(date, dailyData);
};

export const updateTask = (date: string, taskId: string, completed: boolean): void => {
  const dailyData = getDailyData(date);
  const taskIndex = dailyData.tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    dailyData.tasks[taskIndex].completed = completed;
    saveDailyData(date, dailyData);
  }
};

export const deleteItem = (date: string, type: 'meal' | 'workout' | 'task', id: string): void => {
  const dailyData = getDailyData(date);
  switch (type) {
    case 'meal':
      dailyData.meals = dailyData.meals.filter(meal => meal.id !== id);
      break;
    case 'workout':
      dailyData.workouts = dailyData.workouts.filter(workout => workout.id !== id);
      break;
    case 'task':
      dailyData.tasks = dailyData.tasks.filter(task => task.id !== id);
      break;
  }
  saveDailyData(date, dailyData);
};
