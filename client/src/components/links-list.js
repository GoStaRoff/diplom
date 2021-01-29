import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";

export const LinksList = ({ links }) => {
  const history = useHistory();
  if (!links.length) {
    return <p className="center">isEmpty</p>;
  }
  return (
    <div style={{ textAlign: "center" }}>
      <div className="row button-div">
        <NavLink to="/testlist/createtest">
          <button
            className="btn waves-effect waves-light create-test-btn"
            name="createTest"
          >Створити тест</button>
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
            {links.map((link, index) => {
              return (
                <tr key={link._id}>
                  <td>{index + 1}</td>
                  <td>{link.from}</td>
                  <td>{link.to}</td>
                  <td>
                    <Link
                      to={() => {}}
                      onClick={() => {
                        history.push(`/userlist/${link._id}`);
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

export default LinksList;
