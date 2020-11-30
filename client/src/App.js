import React from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from './Context';
import './App.css';

function App() {
  const [user, setUser] = React.useState();
  console.log({ user });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        {user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
      </BrowserRouter>
    </UserContext.Provider>
  );
}

function UnauthenticatedRoutes() {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route>
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

function AuthenticatedRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
