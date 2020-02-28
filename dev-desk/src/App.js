import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div className="App">
      <Switch>
        {/* Set the /register path to display the registration component */}
        <Route exact path="/register" component={() => "Registration here"}/>
        {/* Set the private route to handle the main application*/}
        <PrivateRoute exact path="/" component={() => "PrivateRoute here"}/>
        {/* Add more as needed */}
      </Switch>
    </div>
  );
}

export default App;
