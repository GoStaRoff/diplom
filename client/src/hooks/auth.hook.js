import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);

  const login = useCallback((jwtToken, id, typeUser) => {
    setToken(jwtToken);
    setUserId(id);
    setUserType(typeUser);
    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, userType: typeUser, token: jwtToken })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserType(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId, data.userType);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready, userType };
};
