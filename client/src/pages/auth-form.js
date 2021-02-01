import React, { useContext, useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/auth-context";
import { NavLink } from "react-router-dom";

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

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

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
      console.log(data.typeUser);
      auth.login(data.token, data.userId, data.typeUser);
    } catch (e) {}
  };

  return (
    <div>
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
          </div>
        </div>
      </div>
      <nav className="reg-nav">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo logo-text">
            Just test
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="login">Увійти в систему</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AuthForm;
