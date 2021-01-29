import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/main";
import CreateTest from "./pages/create-test";
import ProfileSetting from "./pages/profile-settings";
import TestList from "./pages/test-list";
import UserList from "./pages/user-list";
import AuthForm from "./pages/auth-form";
import Header from "./components/header";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <div className="image">
        <Header isAuth={isAuthenticated} />
        <Switch>
          <Route path="/profile" exact>
            <ProfileSetting />
          </Route>
          <Route path="/testlist" exact>
            <TestList />
          </Route>
          <Route path="/testlist/createtest" exact>
            <CreateTest />
          </Route>
          <Route path="/userlist/:id" exact>
            <UserList />
          </Route>
          <Route path="/main" exact>
            <MainPage />
          </Route>
          <Redirect to="/profile" />
        </Switch>
      </div>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <div className="image">
          <Header isAuth={isAuthenticated} />
          <MainPage />
        </div>
      </Route>
      <Route path="/login" exact>
        <div className="image-register">
          <AuthForm />
        </div>
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
