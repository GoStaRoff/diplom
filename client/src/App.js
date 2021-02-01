import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "materialize-css";
import { AuthContext } from "./context/auth-context";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import Loader from "./components/loader";

function App() {
  const { token, login, logout, userId, ready, userType} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(userType);
  if(!ready){
    return <Loader />
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
}

export default App;
