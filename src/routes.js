import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from './pages/Signin';
import { isAuthenticated } from "./services/auth";
import AddUser from './pages/user/AddUser';
import SendSms from "./pages/sms/SendSms";
import EditUser from './pages/user/EditUser';
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
      <PrivateRoute path="/add-user" component={AddUser} />
      <PrivateRoute path="/send-sms" component={SendSms} />
      <PrivateRoute path="/edit-user" component={EditUser} />
      <PrivateRoute path="/home" component={Home} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;