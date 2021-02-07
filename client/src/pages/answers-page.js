import React, { useState, useContext, useCallback, useEffect } from "react";

import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import Loader from "../components/loader";

import { useParams } from "react-router-dom";
import AnswersForm from "../components/answers-form";

const AnswersPage = () => {
  const [answers, setAnswers] = useState([]);
  const [users, setUsers] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  const testId = useParams().testId;

  const fetchAnswers = useCallback(async () => {
    try {
      const fetched = await request(
        `/api/answers/test/${testId}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setAnswers(fetched.answers);
      setUsers(fetched.users)
    } catch (e) {}
  }, [token, request, testId]);

  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && (
        <AnswersForm
          answers={answers}
          users={users}
        />
      )}
    </>
  );
};

export default AnswersPage;
