import React from "react";
import { Link, useHistory } from "react-router-dom";

export const UsersList = ({ users, isAdmin }) => {
  const history = useHistory();
  if (!users.length) {
    return <p className="center">isEmpty</p>;
  }

  const deleteUser = async (userId) => {

  }
  return (
    <div style={{ textAlign: "center" }}>
      <div className="row page-card test-list">
        <table className="highlight">
          <thead>
            <tr>
              <th>№</th>
              <th>Логін</th>
              <th>Пошта</th>
              <th>Тип користувача</th>
              {isAdmin && <th>Видалити</th>}
              <th>Відкрити</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.login}</td>
                  <td>{user.email}</td>
                  <td>{user.userType}</td>
                  {isAdmin && (
                    <td>
                      <Link style={{color: 'red'}}
                        to={() => {}}
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                      >
                        Видалити
                      </Link>
                    </td>
                  )}
                  <td>
                    <Link
                      to={() => {}}
                      onClick={() => {
                        history.push(`/userlist/${user._id}`);
                      }}
                    >
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

export default UsersList;
