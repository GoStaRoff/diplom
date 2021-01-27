import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/auth";
import CreateTest from "./pages/create-test";
import ProfileSetting from "./pages/profile-settings";
import TestList from "./pages/test-list";
import UserList from "./pages/user-list";


export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/profile" exact>
          <ProfileSetting />
        </Route>
        <Route path="/testlist" exact>
          <TestList />
        </Route>
        <Route path="/createtest" exact>
          <CreateTest />
        </Route>
        <Route path="/userlist" exact>
          <UserList />
        </Route>
        <Route path="/detail/:id"></Route>
        <Redirect to="/profile" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
