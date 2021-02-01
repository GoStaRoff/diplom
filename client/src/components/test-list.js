import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import testPen from "../images/testPen.jpg";

export const TestsList = ({ tests, isAdmin }) => {
  const history = useHistory();
  if (!tests.length) {
    return <p className="center">isEmpty</p>;
  }
  return (
    <div style={{ textAlign: "center" }}>
      <div className="row button-div">
        {isAdmin && (
          <NavLink to="/testlist/createtest">
            <button
              className="btn waves-effect waves-light create-test-btn"
              name="createTest"
            >
              <i className="large material-icons right">add_circle</i>Створити
              тест
            </button>
          </NavLink>
        )}
      </div>
      <div className="tests">
        {tests.map((test, testIndex) => {
          return (
            <div className="card" key={testIndex}>
              <div className="card-image">
                <img src={testPen} alt="testPen" />
              </div>
              <div className="card-content">
                <p>
                  {test.description}
                </p>
              </div>
              <div className="card-action">
                <Link href="/">{test.name}</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestsList;
