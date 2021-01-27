import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "materialize-css";
import { AuthContext } from "./context/auth-context";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
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
      <Router>
      <div className="image">
        
        {routes}
      </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
