import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
    <div>
      <Switch>
      <Route exact path="/" component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
