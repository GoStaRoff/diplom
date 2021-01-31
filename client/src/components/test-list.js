import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";

export const TestsList = ({ tests }) => {
  const history = useHistory();
  if (!tests.length) {
    return <p className="center">isEmpty</p>;
  }
  return (
    <div style={{ textAlign: "center" }}>
      <div className="row button-div">
        <NavLink to="/testlist/createtest">
          <button
            className="btn waves-effect waves-light create-test-btn"
            name="createTest"
          ><i class="large material-icons right">add_circle</i>Створити тест</button>
        </NavLink>
      </div>
      <div className="row page-card test-list">
        <table className="highlight">
          <thead>
            <tr>
              <th>№</th>
              <th>Original</th>
              <th>Short</th>
              <th>Open</th>
            </tr>
          </thead>

          <tbody>
            {tests.map((test, index) => {
              return (
                <tr key={test._id}>
                  <td>{index + 1}</td>
                  <td>{test.name}</td>
                  <td>{test.description}</td>
                  <td>
                    <Link
                      to={() => {}}
                      onClick={() => {
                        history.push(`/userlist/${test._id}`);
                      }}
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestsList;
