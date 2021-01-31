import React from "react";
import { Link, useHistory } from "react-router-dom";

export const UsersList = ({ users }) => {
  const history = useHistory();
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
              <th>Original</th>
              <th>Short</th>
              <th>Open</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.login}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      to={() => {}}
                      onClick={() => {
                        history.push(`/userlist/${user._id}`);
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

export default UsersList;
