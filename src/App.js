import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { SecureRoutes } from './components/routing/SecureRoutes';
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
          <SecureRoutes/>
        </Router> 
    </div>
  );
}

export default App;
