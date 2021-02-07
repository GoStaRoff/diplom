import React, { useState, useContext, useCallback, useEffect } from "react";

import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import Loader from "../components/loader";
import UsersList from "../components/user-list";

const AnswersPage = () => {
  const [answers, setAnswers] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchAnswers = useCallback(async () => {
    try {
      const fetched = await request("/api/user", "GET", null, { /////////////////////////////////////////////////
        Authorization: `Bearer ${token}`,
      });
     setAnswers(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && (
        <UsersList
          answers={answers}
          isAdmin={isAdmin}
          update={() => {
            fetchAnswers();
          }}
        />
      )}
    </>
  );
};

export default AnswersPage;
