import React, { useState, useContext, useCallback, useEffect } from "react";

import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import Loader from "../components/loader";
import LinksList from "../components/links-list"

const TestList = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
  
    const fetchLinks = useCallback(async () => {
      try {
        const fetched = await request('/api/link', 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        setLinks(fetched)
      } catch (e) {}
    }, [token, request])
  
    useEffect(() => {
      fetchLinks()
    }, [fetchLinks])
  
    if (loading) {
      return <Loader/>
    }
  
    return (
      <>
        {!loading && <LinksList links={links} />}
      </>
    )
};

export default TestList;
