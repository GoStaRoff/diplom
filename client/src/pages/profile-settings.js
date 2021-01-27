import React, {useEffect} from "react";
import userPhoto from "../images/user.png";

const ProfileSetting = () => {

  useEffect(() => {
    window.M.updateTextFields();
  }, []);
  
  return (
    <div>
      
      <div className="row profile-card">
        <div className="col s12 m4 info-form">
          <img className="userPhoto" src={userPhoto} alt="userPhoto" />
          <div className="input-field">
            <input
              disabled
              value="admin"
              id="disabled"
              type="text"
              className="validate"
            />
            <label htmlFor="disabled">User type</label>
          </div>
          <div className="input-field">
            <input id="login" type="text" className="validate" />
            <label htmlFor="login">Login</label>
          </div>
          <div className="input-field">
            <input id="email" type="text" className="validate" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input id="password" type="password" className="validate" />
            <label htmlFor="password">Password</label>
          </div>
          <a href="/" className="waves-effect waves-light btn">Змінити інформацію</a>
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
