import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import Loader from "../components/loader";
import TestForm from "../components/test-form";
import { useParams } from "react-router-dom";

const TestPage = () => {
  const [test, setTest] = useState(null);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  const testId = useParams().id;

  const fetchTest = useCallback(async () => {
    try {
      const fetched = await request(`/api/test/${testId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      console.log(fetched)
      setTest(fetched);
    } catch (e) {}
  }, [token, request, testId]);

  useEffect(() => {
    fetchTest();
  }, [fetchTest]);

  if (loading) {
    return <Loader />;
  }

  return <div>{!loading && test && <TestForm test={test} />}</div>;
};

export default TestPage;
