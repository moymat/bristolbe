import './App.scss';
import Login from '../Login';
import Logo from '../Logo';
import Register from '../Register';
import { Route, Switch, Redirect } from 'react-router-dom';


export default function App() {
  return (
    <div className="app">
      <Logo />
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
      

    </div>
  );
}


