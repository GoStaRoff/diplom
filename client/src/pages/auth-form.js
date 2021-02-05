import React, { useContext, useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/auth-context";
import { NavLink } from "react-router-dom";
import "./toggle.css";

const AuthForm = () => {
  const auth = useContext(AuthContext);
  const [login, setLogin] = useState(true);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
    login: "",
    surname: "",
    name: "",
    patronymic: "",
    address: "",
    specialization: "",
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
    for (let key in form) {
      if (form[key].length < 2) {
        message("Заповніть усі поля реєстрації коректно");
        return;
      }
    }
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
      setLogin(true);
    } catch (e) {}
  };

  const loginChange = (event) => {
    if (event.target.value === "login") {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", {
        email: form.email,
        password: form.password,
      });
      auth.login(data.token, data.userId, data.typeUser);
    } catch (e) {}
  };

  return (
    <div>
      <div className="auth-page">
        <div className="auth-form">
          <div className="card-content white-text">
            <div className="auth-header">
              <span className="card-title">Авторизація</span>
              <div className="auth-switch">
                <input
                  id="toggle-onZ"
                  className="toggleZ toggle-leftZ"
                  name="toggleZ"
                  value="login"
                  type="radio"
                  checked={login}
                  onChange={loginChange}
                />
                <label htmlFor="toggle-onZ" className="btnZ">
                  Вхід
                </label>
                <input
                  id="toggle-offZ"
                  className="toggleZ toggle-rightZ"
                  name="toggleZ"
                  value="register"
                  onChange={loginChange}
                  type="radio"
                />
                <label htmlFor="toggle-offZ" className="btnZ">
                  Реєстрація
                </label>
              </div>
            </div>

            <div>
              <div className="input-field">
                <input
                  onChange={changeHandler}
                  id="email"
                  name="email"
                  type="text"
                  className="validate"
                />
                <label htmlFor="email">Пошта</label>
              </div>
              <div className="input-field">
                <input
                  onChange={changeHandler}
                  id="password"
                  name="password"
                  type="password"
                  className="validate"
                />
                <label htmlFor="password">Пароль</label>
              </div>
              {!login && (
                <div>
                  <div className="input-field">
                    <input
                      id="login"
                      name="login"
                      onChange={changeHandler}
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="login">Логін</label>
                  </div>
                  <div className="input-field">
                    <input
                      onChange={changeHandler}
                      id="surname"
                      name="surname"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="surname">Фамілія</label>
                  </div>
                  <div className="input-field">
                    <input
                      onChange={changeHandler}
                      id="name"
                      name="name"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="name">Ім'я</label>
                  </div>
                  <div className="input-field">
                    <input
                      onChange={changeHandler}
                      id="patronymic"
                      name="patronymic"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="patronymic">По-батькові</label>
                  </div>
                  <div className="input-field">
                    <input
                      onChange={changeHandler}
                      id="address"
                      name="address"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="address">Адреса</label>
                  </div>
                  <div className="input-field">
                    <input
                      onChange={changeHandler}
                      id="specialization"
                      name="specialization"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="specialization">№ спеціалізації</label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="card-action">
            {login && (
              <button
                className="btn red lighten-1"
                disabled={loading}
                onClick={loginHandler}
              >
                Вхід
              </button>
            )}
            {!login && (
              <button
                className="btn red lighten-1"
                disabled={loading}
                onClick={registerHandler}
              >
                Реєстрація
              </button>
            )}
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
