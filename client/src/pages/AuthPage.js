import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  const message = useMessage()
  console.log(useHttp);
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    //clearError()
  }, [error, message, clearError])
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log("Data : " + data);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Auth</h1>
        <div className="card purple darken-3">
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div>
              <div className="input-field ">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field ">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn red lighten-1"
              disabled={loading}
              style={{ marginRight: 10 }}
            >
              Вхід
            </button>
            <button
              className="btn red lighten-1"
              disabled={loading}
              onClick={registerHandler}
            >
              Реєстрація
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
