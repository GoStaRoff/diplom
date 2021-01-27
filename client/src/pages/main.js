import React from "react";
import testPen from "../images/testPen.jpg";
import testWoman from "../images/testinWoman.png";
import makingTest from "../images/makingTest.jpg";

const MainPage = () => {
  return (
    <div>
      <div>
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
                <a href="/">Дізнатися більше</a>
              </div>
            </div>
          </div>
          <div className="col s3">
            <div className="card">
              <div className="card-image">
                <img src={makingTest} alt="makingTest" />
              </div>
              <div className="card-content">
                <p>
                  Якісне обслуговування та забезпечення оновленями баз даних
                  тестів.
                </p>
              </div>
              <div className="card-action">
                <a href="/">Дізнатися більше</a>
              </div>
            </div>
          </div>
          <div className="col s4">
            <div className="card">
              <div className="card-image">
                <img src={testWoman} alt="testWoman" />
              </div>
              <div className="card-content">
                <p>
                  Особисті кабінети для психологів та система для оцінювання.
                </p>
              </div>
              <div className="card-action">
                <a href="/">Дізнатися більше</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
