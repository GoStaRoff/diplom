import React, { useState, useContext, useCallback, useEffect } from "react";

import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import Loader from "../components/loader";
import TestsList from "../components/test-list"

const TestList = ({isAdmin}) => {
    const [tests, setTests] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
  
    const fetchTests = useCallback(async () => {
      try {
        const fetched = await request('/api/test', 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        setTests(fetched)
      } catch (e) {}
    }, [token, request])
  
    useEffect(() => {
      fetchTests()
    }, [fetchTests])
  
    if (loading) {
      return <Loader/>
    }
  
    return (
      <>
        {!loading && <TestsList isAdmin={isAdmin} tests={tests} />}
      </>
    )
};

export default TestList;
