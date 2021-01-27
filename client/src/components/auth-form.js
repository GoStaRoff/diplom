import React, {useContext, useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/auth-context";

const AuthForm = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token,data.userId)
    } catch (e) {}
  };

  return (
    <div className="auth-page">
      <div className=" auth-form">
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
            style={{ marginRight: 10, marginLeft: 50 }}
            onClick={loginHandler}
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
          <button
            className="btn grey lighten-1"
            disabled={loading}
            style={{ marginLeft: 10 }}
          >
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
