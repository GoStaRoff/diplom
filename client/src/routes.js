import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/main";
import CreateTest from "./pages/create-test";
import ProfileSetting from "./pages/profile-settings";
import TestList from "./pages/test-list";
import UserList from "./pages/user-list";
import TestPage from "./pages/test-page";
import AuthForm from "./pages/auth-form";
import Header from "./components/header";

export const useRoutes = (userType) => {
  switch (userType) {
    case "admin":
      return (
        <div className="image">
          <Header userType={userType} />
          <Switch>
            <Route path="/profile" exact>
              <ProfileSetting isMe isAdmin />
            </Route>
            <Route path="/testlist" exact>
              <TestList isAdmin isDelete />
            </Route>
            <Route path="/testlist/createtest" exact>
              <CreateTest />
            </Route>
            <Route path="/tests/:testId" exact>
              <TestPage />
            </Route>
            <Route path="/userlist/:id" exact>
              <ProfileSetting isAdmin />
            </Route>
            <Route path="/userlist" exact>
              <UserList isAdmin />
            </Route>
            <Route path="/main" exact>
              <MainPage />
            </Route>
            <Redirect to="/profile" />
          </Switch>
        </div>
      );
    case "psychology":
      return (
        <div className="image">
          <Header userType={userType} />
          <Switch>
            <Route path="/profile" exact>
              <ProfileSetting isMe isAdmin isPcych />
            </Route>
            <Route path="/testlist" exact>
              <TestList isAdmin />
            </Route>
            <Route path="/tests/:testId" exact>
              <TestPage />
            </Route>
            <Route path="/userlist/:id" exact>
              <ProfileSetting isPcych/>
            </Route>
            <Route path="/userlist" exact>
              <UserList />
            </Route>
            <Route path="/testlist/createtest" exact>
              <CreateTest />
            </Route>
            <Route path="/main" exact>
              <MainPage />
            </Route>
            <Route path="/check/:userId/:testId" exact>
              <TestPage isCheck />
            </Route>
            <Redirect to="/profile" />
          </Switch>
        </div>
      );
    case "user":
      return (
        <div className="image">
          <Header userType={userType} />
          <Switch>
            <Route path="/profile" exact>
              <ProfileSetting isMe={true} isAdmin={true} />
            </Route>
            <Route path="/testlist" exact>
              <TestList />
            </Route>
            <Route path="/tests/:testId" exact>
              <TestPage />
            </Route>
            <Route path="/main" exact>
              <MainPage />
            </Route>
            <Redirect to="/profile" />
          </Switch>
        </div>
      );
    default:
      return (
        <Switch>
          <Route path="/" exact>
            <div className="image">
              <Header userType={userType} />
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
  }
};
