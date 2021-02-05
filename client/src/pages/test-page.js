import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import Loader from "../components/loader";
import TestForm from "../components/test-form";
import { useParams } from "react-router-dom";

const TestPage = ({ isCheck }) => {
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState(null);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  const testId = useParams().testId;
  const userId = useParams().userId;

  const fetchTest = useCallback(async () => {
    try {
      const fetched = await request(`/api/test/${testId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setTest(fetched);
    } catch (e) {}
  }, [token, request, testId]);

  const fetchAnswers = useCallback(async () => {
    try {
      const fetched = await request(
        `/api/answers`,
        "POST",
        { userId, testId },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(fetched)
      setAnswers(fetched);
    } catch (e) {
    }
  }, [token, request, userId, testId]);

  useEffect(() => {
    fetchTest();
  }, [fetchTest]);

  useEffect(() => {
    if (isCheck) {
      fetchAnswers();
    }
  }, [isCheck, fetchAnswers]);

  if (loading || (!answers && isCheck)) {
    return <Loader />;
  }

  return (
    <div>
      {!loading && test && (
        <TestForm test={test} isCheck={isCheck} completedAnswers={answers} />
      )}
    </div>
  );
};

export default TestPage;
