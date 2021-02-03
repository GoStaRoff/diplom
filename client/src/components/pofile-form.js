import React, { useState, useContext, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import userPhoto from "../images/user.png";
import adminPhoto from "../images/admin.png";
import { useMessage } from "../hooks/message.hook";
import psychologyPhoto from "../images/psychology.png";

export const ProfileForm = ({ user, tests, isAdmin, isMe }) => {
  const message = useMessage();
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    login: user.login,
    email: user.email,
    password: "",
    userType: user.userType,
    surname: user.surname,
    name: user.name,
    patronymic: user.patronymic,
    address: user.address,
    specialization: user.specialization,
    psychSubscribes: user.psychSubscribes,
    testAnswers: user.testAnswers,
  });

  let profilePhoto = null;
  if (user.userType) {
    switch (user.userType) {
      case "admin":
        profilePhoto = adminPhoto;
        break;
      case "psychology":
        profilePhoto = psychologyPhoto;
        break;
      default:
        profilePhoto = userPhoto;
        break;
    }
  }

  useEffect(() => {
    setForm({ ...user, password: "" });
    window.M.updateTextFields();
  }, [user, tests]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const infoChangeHandler = async () => {
    try {
      message(
        (
          await request(
            "/api/user/change",
            "POST",
            { ...form },
            {
              Authorization: `Bearer ${token}`,
            }
          )
        ).message
      );
    } catch (e) {}
  };

  return (
    <div className="row page-card">
      <div className="col s12 m4 info-form">
        <img className="userPhoto" src={profilePhoto} alt="userPhoto" />
        <div className="input-field">
          <input
            disabled={!isAdmin || isMe}
            value={form.userType}
            id="userType"
            name="userType"
            type="text"
            onChange={changeHandler}
            className="validate"
          />
          <label htmlFor="disabled">Тип користувача</label>
        </div>
        <div className="input-field">
          <input
            disabled={!isAdmin}
            id="login"
            name="login"
            onChange={changeHandler}
            type="text"
            value={form.login}
            className="validate"
          />
          <label htmlFor="login">Логін</label>
        </div>
        <div className="input-field">
          <input
            disabled
            onChange={changeHandler}
            id="email"
            name="email"
            value={form.email}
            type="text"
            className="validate"
          />
          <label htmlFor="email">Пошта</label>
        </div>
        <div className="input-field">
          <input
            disabled={!isAdmin}
            onChange={changeHandler}
            id="password"
            name="password"
            type="password"
            value={form.password}
            className="validate"
          />
          <label htmlFor="password">Пароль</label>
        </div>
        <div className="input-field">
          <input
            disabled={!isAdmin}
            onChange={changeHandler}
            id="surname"
            name="surname"
            value={form.surname}
            type="text"
            className="validate"
          />
          <label htmlFor="surname">Фамілія</label>
        </div>
        <div className="input-field">
          <input
            disabled={!isAdmin}
            onChange={changeHandler}
            id="name"
            name="name"
            value={form.name}
            type="text"
            className="validate"
          />
          <label htmlFor="name">Ім'я</label>
        </div>
        <div className="input-field">
          <input
            disabled={!isAdmin}
            onChange={changeHandler}
            id="patronymic"
            name="patronymic"
            value={form.patronymic}
            type="text"
            className="validate"
          />
          <label htmlFor="patronymic">По-батькові</label>
        </div>
        <div className="input-field">
          <input
            disabled={!isAdmin}
            onChange={changeHandler}
            id="address"
            name="address"
            value={form.address}
            type="text"
            className="validate"
          />
          <label htmlFor="address">Адреса</label>
        </div>
        <div className="input-field">
          <input
            disabled={!isAdmin}
            onChange={changeHandler}
            id="specialization"
            name="specialization"
            value={form.specialization}
            type="text"
            className="validate"
          />
          <label htmlFor="specialization">№ спеціалізації</label>
        </div>
        <div hidden={!isAdmin} className="change-profile">
          <button
            disabled={loading}
            
            className="btn waves-effect waves-light"
            name="infoChange"
            onClick={infoChangeHandler}
          >
            <i className="large material-icons right">send</i>Змінити інформацію
          </button>
        </div>
      </div>
      <div className="col s12 m8 completed-tests">
        <h4>Історія тестів</h4>
        {tests.map((test, testIndex) => {
          return (
            <div className="test" key={testIndex}>
              <p>Hello</p>
              <a target="_blank" rel="noopener noreferrer" href='/'>
                World
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileForm;
