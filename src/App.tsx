import React, { useState } from 'react';
import { format } from 'date-fns';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard 
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
    </div>
  );
}

export default App;
