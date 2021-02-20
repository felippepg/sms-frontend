import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from './pages/Signin';
import { isAuthenticated } from "./services/auth";
import AddUser from './pages/user/AddUser';
import SendSms from "./pages/sms/SendSms";
import ListUser from './pages/user/ListUser';
import EditUser from "./pages/user/EditUser";
import ListClient from "./pages/client/ListClient";
import AddClient from "./pages/client/AddClient";
import EditClient from './pages/client/EditClient';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={() => <h1>SignUp</h1>} />

      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/send-sms" component={SendSms} />

      <PrivateRoute path="/add-user" component={AddUser} />
      <PrivateRoute exact path="/list-user" component={ListUser} />
      <PrivateRoute path="/edit-user/:id" component={EditUser} />

      <PrivateRoute path="/add-client" component={AddClient} />
      <PrivateRoute path="/list-client" component={ListClient} />
      <PrivateRoute path="/edit-client/:id" component={EditClient} />

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;