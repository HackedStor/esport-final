import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/css/nav.css';
import './index.css';
import AppContent from './components/pages/AppContent';
import useDevToolsProtection from './Hooks/devToolsBlocker';

const App: React.FC = () => {
  useDevToolsProtection();
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;