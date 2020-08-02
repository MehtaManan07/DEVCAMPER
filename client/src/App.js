import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavbarComponent from './components/core/Navbar';
import Landing from './pages/Landing';

function App() {
  return (
    <div>
    <NavbarComponent />
      <Switch>
      <Route exact path="/" component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
