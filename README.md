# Wellness Tracker App

A comprehensive wellness tracking application built with React and TypeScript to help you monitor your daily health and wellness activities.

## 🌟 Features

### 📊 Daily Dashboard
- **Overview Tab**: Quick stats and summary of your daily wellness activities
- **Progress Tracking**: Visual progress bars and completion rates
- **Date Navigation**: Easy date selection to view past or future days

### 🍽️ Meal Tracking
- Log breakfast, lunch, dinner, and snacks
- Track calories and meal descriptions
- Record meal times
- Beautiful meal type icons and visual indicators
- Total daily calorie calculation

### 💪 Workout Tracker
- Log different types of exercises
- Track workout duration and intensity levels
- Record workout times
- Smart workout type detection with appropriate icons
- Total daily workout time calculation

### ✨ Skincare Routine
- Pre-configured morning and evening routines
- Check-off skincare steps as you complete them
- Categorized skincare products (cleanser, toner, serum, etc.)
- Progress tracking with visual indicators
- Helpful skincare tips and best practices

### ✅ Task Management
- Create and manage daily tasks
- Set priority levels (low, medium, high)
- Mark tasks as completed
- High priority task highlighting
- Task completion rate tracking

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the files locally, navigate to the project directory
   cd wellness-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the app

### Building for Production

```bash
npm run build
```

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Storage**: Local Storage for data persistence
- **Build Tool**: Create React App

## 📱 Features in Detail

### Data Persistence
- All data is stored locally in your browser using Local Storage
- No account creation or internet connection required
- Data persists between browser sessions

### Responsive Design
- Works seamlessly on desktop, tablet, and mobile devices
- Optimized for both portrait and landscape orientations
- Touch-friendly interface for mobile users

### User Experience
- Clean, modern interface with smooth animations
- Intuitive navigation with tab-based organization
- Color-coded categories for easy visual identification
- Empty states with helpful guidance

## 🎨 Design System

### Color Scheme
- **Primary**: Blue gradient (#0ea5e9 to #0369a1)
- **Meals**: Green (#10b981)
- **Workouts**: Orange (#f59e0b)
- **Skincare**: Purple (#8b5cf6)
- **Tasks**: Red (#ef4444)

### Components
- **Cards**: Clean white cards with subtle shadows
- **Buttons**: Consistent styling with hover effects
- **Forms**: Well-structured input fields with validation
- **Progress Bars**: Animated progress indicators

## 📊 Data Structure

The app tracks four main categories of wellness data:

1. **Meals**: Type, name, description, calories, time
2. **Workouts**: Type, duration, intensity, description, time
3. **Skincare**: Steps with categories, completion status, timing
4. **Tasks**: Title, description, priority, completion status

## 🔧 Customization

### Adding Custom Skincare Steps
- Click "Add Step" in the Skincare tab
- Customize the step name and category
- Set timing (morning, evening, or both)

### Modifying Default Routines
- The app comes with a pre-configured skincare routine
- You can add, remove, or modify steps as needed
- All changes are saved automatically

## 🎯 Usage Tips

### Daily Routine
1. Start your day by checking the Overview tab
2. Add your planned meals and workouts
3. Check off skincare steps as you complete them
4. Manage your daily tasks with priority levels
5. Review your progress throughout the day

### Best Practices
- Log meals shortly after eating for accurate tracking
- Set realistic daily goals for workouts and tasks
- Use the priority system to focus on important tasks
- Check your skincare routine twice daily

## 🤝 Contributing

This is a personal wellness tracking app, but suggestions and improvements are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check that all dependencies are properly installed
2. Ensure you're using a modern browser
3. Clear browser cache if experiencing data issues
4. Check the browser console for any error messages

---

**Happy Wellness Tracking! 🌟**
