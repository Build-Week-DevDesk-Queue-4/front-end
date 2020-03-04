import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import PrivateRoute from './PrivateRoute';
import AuthForm from './components/AuthForm';
import UserContext from './contexts/UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import FrontPage from './components/FrontPage';

function App() {
  const [user, setUser] = useLocalStorage("user", {
    username: "",
    id: 0,
    type: "",
  });

  return (
    <div className="App">
{/*<<<<<<< HEAD */}
      <Switch>
        {/* Set the /register path to display the registration component */}
        <Route exact path="/register" render={props => <AuthForm {...props} role= 'register' /> }/>
        <Route exact path="/" render={props => <AuthForm {...props} role= 'login' /> }/>
        {/* Set the private route to handle the main application*/}
        {/* <PrivateRoute exact path="/" component={() => "PrivateRoute here"}/> */}
        {/* Add more as needed */}
      </Switch>
      
=======
      <UserContext.Provider value={{user, setUser}}>
        <Switch>
          {/* Set the /register path to display the registration component */}
          <Route exact path="/register" render={props => <AuthForm {...props} role= 'register' /> }/>
          <Route exact path="/login" render={props => <AuthForm {...props} role= 'login' /> }/>
          {/* Set the private route to handle the main application*/}
          <PrivateRoute exact path="/" component={FrontPage}/>
          {/* Add more as needed */}
        </Switch>
      </UserContext.Provider>
{/* >>>>>>> bb1f1f56b020c8963d2e13c36973c33d762fe23f */}
    </div>
  );
}

export default App;
