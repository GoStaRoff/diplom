import React, { useContext } from "react";
import { useMessage } from "../hooks/message.hook";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import { Link, useHistory } from "react-router-dom";
import Loader from "../components/loader";

export const UsersList = ({ users, isAdmin, update }) => {
  const message = useMessage();
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  const history = useHistory();
  if (!users.length) {
    return <p className="center">isEmpty</p>;
  }

  const deleteUser = async (userId) => {
    try {
      const data = await request(
        "/api/user/delete",
        "POST",
        { userId },
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
                      <Link
                        style={{ color: "red" }}
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
