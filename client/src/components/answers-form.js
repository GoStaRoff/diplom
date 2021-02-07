import React from "react";
import { Link } from "react-router-dom";

export const AnswersForm = ({ answers, users }) => {
  if (!users.length) {
    return <p className="center">isEmpty</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div className="row page-card test-list">
        <table className="highlight">
          <thead>
            <tr>
              <th>№</th>
              <th>ПІБ</th>
              <th>Результат</th>
              <th>Відкрити</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    {user.surname} {user.name} {user.patronymic}
                  </td>
                  <td>
                    {answers[index].result
                      ? answers[index].result
                      : "No result"}
                  </td>

                  <td>
                    <Link to={`/check/${user._id}/${answers[index].testId}`}>
                      Відкрити
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

export default AnswersForm;
