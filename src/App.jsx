import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import './css/nav.css';
import './css/index.css';
import AppContent from './components/pages/AppContent';


function App() {

  return (
    <Router>
        <AppContent/>
    </Router>
  );
}

export default App;