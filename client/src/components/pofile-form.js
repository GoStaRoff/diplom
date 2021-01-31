import React, { useState, useContext, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import userPhoto from "../images/user.png";
import adminPhoto from "../images/admin.png";
import { useMessage } from "../hooks/message.hook";
import psychologyPhoto from "../images/psychology.png";

export const ProfileForm = ({ user, tests }) => {
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
    window.M.updateTextFields();
    console.log(user);
    console.log(tests);
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
            disabled
            value={form.userType}
            id="userType"
            name="userType"
            type="text"
            onChange={changeHandler}
            className="validate"
          />
          <label htmlFor="disabled">User type</label>
        </div>
        <div className="input-field">
          <input
            id="login"
            name="login"
            onChange={changeHandler}
            type="text"
            defaultValue={form.login}
            className="validate"
          />
          <label htmlFor="login">Login</label>
        </div>
        <div className="input-field">
          <input
            onChange={changeHandler}
            id="email"
            name="email"
            defaultValue={form.email}
            type="text"
            className="validate"
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-field">
          <input
            onChange={changeHandler}
            id="password"
            name="password"
            type="password"
            defaultValue={form.password}
            className="validate"
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="input-field">
          <input
            onChange={changeHandler}
            id="surname"
            name="surname"
            defaultValue={form.surname}
            type="text"
            className="validate"
          />
          <label htmlFor="surname">surname</label>
        </div>
        <div className="input-field">
          <input
            onChange={changeHandler}
            id="name"
            name="name"
            defaultValue={form.name}
            type="text"
            className="validate"
          />
          <label htmlFor="name">name</label>
        </div>
        <div className="input-field">
          <input
            onChange={changeHandler}
            id="patronymic"
            name="patronymic"
            defaultValue={form.patronymic}
            type="text"
            className="validate"
          />
          <label htmlFor="patronymic">patronymic</label>
        </div>
        <div className="input-field">
          <input
            onChange={changeHandler}
            id="address"
            name="address"
            defaultValue={form.address}
            type="text"
            className="validate"
          />
          <label htmlFor="address">address</label>
        </div>
        <div className="input-field">
          <input
            onChange={changeHandler}
            id="specialization"
            name="specialization"
            defaultValue={form.specialization}
            type="text"
            className="validate"
          />
          <label htmlFor="specialization">specialization</label>
        </div>
        <div className="change-profile">
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
        {tests.map((test) => {
          return (
            <div className="test" key={test._id}>
              <p>{test.to}</p>
              <a target="_blank" rel="noopener noreferrer" href={test.from}>
                {test.from}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileForm;
