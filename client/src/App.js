import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavbarComponent from './components/core/Navbar';
import Landing from './pages/Landing';
import AllBootcamps from './pages/AllBootcamps';

function App() {
  return (
    <div>
    <NavbarComponent />
      <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/all/bootcamps" component={AllBootcamps} exact />
      </Switch>
    </div>
  );
}

export default App;
