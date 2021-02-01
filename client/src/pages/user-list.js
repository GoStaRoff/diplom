import React, { useState, useContext, useCallback, useEffect } from "react";

import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import Loader from "../components/loader";
import UsersList from "../components/user-list";

const UserList = ({isAdmin}) => {
  const [users, setUsers] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request("/api/user", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setUsers(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && <UsersList users={users} isAdmin={isAdmin} />}</>;
};

export default UserList;
