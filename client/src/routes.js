import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/main";
import CreateTest from "./pages/create-test";
import ProfileSetting from "./pages/profile-settings";
import TestList from "./pages/test-list";
import UserList from "./pages/user-list";
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
              <ProfileSetting isMe={true} isAdmin={true} />
            </Route>
            <Route path="/testlist" exact>
              <TestList isAdmin={true}/>
            </Route>
            <Route path="/testlist/createtest" exact>
              <CreateTest />
            </Route>
            <Route path="/tests/:id" exact>
              <TestList />
            </Route>
            <Route path="/userlist/:id" exact>
              <ProfileSetting isMe={false} isAdmin={true} />
            </Route>
            <Route path="/userlist" exact>
              <UserList isAdmin={true}/>
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
              <ProfileSetting isMe={true} isAdmin={true} />
            </Route>
            <Route path="/testlist" exact>
              <TestList isAdmin={false} />
            </Route>
            <Route path="/tests/:id" exact>
              <TestList />
            </Route>
            <Route path="/userlist/:id" exact>
              <ProfileSetting isMe={false} isAdmin={false} />
            </Route>
            <Route path="/userlist" exact>
              <UserList isAdmin={false} />
            </Route>
            <Route path="/main" exact>
              <MainPage />
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
              <TestList isAdmin={false} />
            </Route>
            <Route path="/tests/:id" exact>
              <TestList />
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
