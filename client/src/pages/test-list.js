import React, { useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";

const TestList = () => {
  const { links, setLinks } = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  return (
    <div>
      <h1>TestList</h1>
    </div>
  );
};

export default TestList;
