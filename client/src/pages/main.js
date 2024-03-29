import React from "react";
import testPen from "../images/testPen.jpg";
import testWoman from "../images/testinWoman.png";
import makingTest from "../images/makingTest.jpg";
import { NavLink } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="row cards">
      <div className="col s4">
        <div className="card">
          <div className="card-image">
            <img src={testPen} alt="testPen" />
          </div>
          <div className="card-content">
            <p>
              Досить просте проходження тестів та якісна система іх аналізу.
            </p>
          </div>
          <div className="card-action">
            <NavLink to="/login">Дізнатися більше</NavLink>
          </div>
        </div>
      </div>
      <div className="col s4">
        <div className="card">
          <div className="card-image">
            <img src={makingTest} alt="makingTest" />
          </div>
          <div className="card-content">
            <p>
              Якісне обслуговування та забезпечення оновленями баз даних тестів.
            </p>
          </div>
          <div className="card-action">
            <NavLink to="/login">Дізнатися більше</NavLink>
          </div>
        </div>
      </div>
      <div className="col s4">
        <div className="card">
          <div className="card-image">
            <img src={testWoman} alt="testWoman" />
          </div>
          <div className="card-content">
            <p>Особисті кабінети для психологів та система для оцінювання.</p>
          </div>
          <div className="card-action">
            <NavLink to="/login">Дізнатися більше</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
