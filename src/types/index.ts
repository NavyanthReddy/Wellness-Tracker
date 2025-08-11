export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  description?: string;
  calories?: number;
  time: string;
  date: string;
}

export interface Workout {
  id: string;
  type: string;
  duration: number; // in minutes
  intensity: 'low' | 'medium' | 'high';
  description?: string;
  time: string;
  date: string;
}

export interface SkincareStep {
  id: string;
  name: string;
  category: 'cleanser' | 'toner' | 'serum' | 'moisturizer' | 'sunscreen' | 'mask' | 'other';
  time: 'morning' | 'evening' | 'both';
  completed: boolean;
  date: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  date: string;
}

export interface DailyData {
  date: string;
  meals: Meal[];
  workouts: Workout[];
  skincare: SkincareStep[];
  tasks: Task[];
}

export interface WellnessStats {
  totalMeals: number;
  totalWorkouts: number;
  skincareCompleted: number;
  tasksCompleted: number;
  streak: number;
}
