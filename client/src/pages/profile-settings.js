import React from "react";
import Header from "../components/header";
import userPhoto from "../images/user.png";

const ProfileSetting = () => {
  return (
    <div>
      <Header />
      <div className="row profile-card">
        <div className="col s12 m4 info-form">
          <img className="userPhoto" src={userPhoto} />
          <div class="input-field">
            <input
              disabled
              value="admin"
              id="disabled"
              type="text"
              class="validate"
            />
            <label for="disabled">User type</label>
          </div>
          <div className="input-field">
            <input id="login" type="text" className="validate" />
            <label for="login">Login</label>
          </div>
          <div className="input-field">
            <input id="email" type="text" className="validate" />
            <label for="email">Email</label>
          </div>
          <div className="input-field">
            <input id="password" type="password" className="validate" />
            <label for="password">Password</label>
          </div>
          <a class="waves-effect waves-light btn">Змінити інформацію</a>
        </div>
        <div className="col s12 m8 completed-tests">
          <h4>Історія тестів</h4>
          <div className="test">
            <p>заговолокТесту</p>
            <a href="/">Пройти тест</a>
          </div>
          <div className="test">
            <p>заговолокТесту</p>
            <a href="/">Пройти тест</a>
          </div>
          <div className="test">
            <p>заговолокТесту</p>
            <a href="/">Пройти тест</a>
          </div>
          <div className="test">
            <p>заговолокТесту</p>
            <a href="/">Пройти тест</a>
          </div>
          <div className="test">
            <p>заговолокТесту</p>
            <a href="/">Пройти тест</a>
          </div>
          <div className="test">
            <p>заговолокТесту</p>
            <a href="/">Пройти тест</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
