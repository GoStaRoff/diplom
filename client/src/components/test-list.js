import React, { useContext } from "react";
import { useMessage } from "../hooks/message.hook";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import { Link, NavLink, useHistory } from "react-router-dom";
import Loader from "../components/loader";
import testPen from "../images/testPen.jpg";

export const TestsList = ({ tests, isAdmin, isDelete, update }) => {
  const message = useMessage();
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  const history = useHistory();
  if (!tests.length) {
    return <p className="center">isEmpty</p>;
  } 

  const deleteTest = async (testId) => {
    try {
      const data = await request(
        "/api/test/delete",
        "POST",
        { testId },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      message(data.message);
      update();
    } catch (e) {
      message(e);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div style={{ textAlign: "center" }}>
      <div className="row button-div">
        {isAdmin && (
          <NavLink to="/testlist/createtest">
            <button
              className="btn waves-effect waves-light red create-test-btn"
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
                <h5>{test.name}</h5>
              </div>
              <div className="test-action">
                <Link
                  className="complete"
                  to={() => {}}
                  onClick={() => {
                    history.push(`/tests/${test._id}`);
                  }}
                >
                  Виконати
                </Link>
                {isDelete && (
                  <Link
                    className="delete"
                    to={() => {}}
                    onClick={() => {
                      deleteTest(test._id);
                    }}
                  >
                    Видалити
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestsList;
