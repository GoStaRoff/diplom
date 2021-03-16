import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/main";
import CreateTest from "./pages/create-test";
import ProfileSetting from "./pages/profile-settings";
import TestList from "./pages/test-list";
import UserList from "./pages/user-list";
import TestPage from "./pages/test-page";
import AuthForm from "./pages/auth-form";
import ImageTest from "./pages/image-test";
import Header from "./components/header";
import Footer from "./components/footer";
import AnswersPage from "./pages/answers-page"  

export const useRoutes = (userType) => {
  switch (userType) {
    case "admin":
      return (
        <div>
          <div className="image" id="page-container">
            <div id="content-wrap">
              <Header userType={userType} />
              <Switch>
                <Route path="/profile" exact>
                  <ProfileSetting isMe isAdmin />
                </Route>
                <Route path="/image" exact>
                  <ImageTest />
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
            <Footer/>
          </div>
        </div>
      );
    case "psychology":
      return (
        <div className="image" id="page-container">
            <div id="content-wrap">
          <Header userType={userType} />
          <Switch>
          <Route path="/profile" exact>
              <ProfileSetting isMe isAdmin isPcych />
            </Route>
            <Route path="/testlist" exact>
              <TestList isAdmin isPcych />
            </Route>
            <Route path="/tests/:testId" exact>
              <TestPage />
            </Route>
            <Route path="/userlist/:id" exact>
              <ProfileSetting isPcych />
            </Route>
            <Route path="/userlist" exact>
              <UserList />
            </Route>
            <Route path="/answers/:testId" exact>
              <AnswersPage />
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
          <Footer />
        </div>
      );
    case "user":
      return (
        <div className="image" id="page-container">
            <div id="content-wrap">
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
          <Footer />
        </div>
      );
    default:
      return (
        <Switch>
          <Route path="/" exact>
          <div className="image" id="page-container">
            <div id="content-wrap">
              <Header userType={userType} />
              <MainPage />
              </div>
              <Footer />
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
