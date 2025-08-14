import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { initializeData } from './utils/storage';
import './index.css';

function AppContent() {
  // Get today's date in local timezone
  const getTodayString = () => {
    const now = new Date();
    // Force UTC to avoid timezone issues
    const utcYear = now.getUTCFullYear();
    const utcMonth = String(now.getUTCMonth() + 1).padStart(2, '0');
    const utcDay = String(now.getUTCDate()).padStart(2, '0');
    
    // Also get local time for comparison
    const localYear = now.getFullYear();
    const localMonth = String(now.getMonth() + 1).padStart(2, '0');
    const localDay = String(now.getDate()).padStart(2, '0');
    
    console.log('UTC date:', `${utcYear}-${utcMonth}-${utcDay}`);
    console.log('Local date:', `${localYear}-${localMonth}-${localDay}`);
    
    return `${localYear}-${localMonth}-${localDay}`;
  };
  
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const { currentUser, loading } = useAuth();
  
  // Debug logging for initial date
  console.log('App - Initial date:', getTodayString());
  console.log('App - Current time:', new Date().toLocaleString());
  console.log('App - Date object:', new Date());
  console.log('App - getDate():', new Date().getDate());
  console.log('App - getMonth():', new Date().getMonth());
  console.log('App - getFullYear():', new Date().getFullYear());

  // Initialize data persistence on app startup
  useEffect(() => {
    initializeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard 
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
