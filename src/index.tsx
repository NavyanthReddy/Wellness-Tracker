import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('🚀 App starting...');
console.log('React version:', React.version);
console.log('Environment:', process.env.NODE_ENV);

console.log('🔍 Looking for root element...');
const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

if (!rootElement) {
  console.error('❌ Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found</div>';
} else {
  console.log('✅ Root element found, creating React root...');
  const root = ReactDOM.createRoot(rootElement);
  
  try {
    console.log('🎨 Rendering App component...');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('✅ App rendered successfully!');
  } catch (error) {
    console.error('❌ Error rendering App:', error);
    rootElement.innerHTML = `<div style="padding: 20px; color: red;">Error: ${error}</div>`;
  }
}
