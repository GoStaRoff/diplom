import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import viti from "../images/viti.png";

const Header = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/login");
  };
  switch (props.userType) {
    case "admin":
    case "psychology":
      return (
        <nav>
          <div className="nav-wrapper">
            <NavLink className="brand-logo logo-text" to="/main">
              <img style={{ height: "50px" }} alt="VITI" src={viti} />
              MITI test
            </NavLink>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <NavLink to="/profile">Профіль</NavLink>
              </li>
              <li>
                <NavLink to="/testlist">Список тестів</NavLink>
              </li>
              <li>
                <NavLink to="/userlist">Список користувачів</NavLink>
              </li>
              <li>
                <a href="/" onClick={logoutHandler}>
                  Вийти
                </a>
              </li>
            </ul>
          </div>
        </nav>
      );
    case "user":
      return (
        <nav>
          <div className="nav-wrapper">
            <NavLink className="brand-logo logo-text" to="/main">
              Just test
            </NavLink>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <NavLink to="/profile">Профіль</NavLink>
              </li>
              <li>
                <NavLink to="/testlist">Список тестів</NavLink>
              </li>
              <li>
                <a href="/" onClick={logoutHandler}>
                  Вийти
                </a>
              </li>
            </ul>
          </div>
        </nav>
      );
    default:
      return (
        <nav>
          <div className="nav-wrapper">
            <NavLink className="brand-logo logo-text" to="/main">
              Just test
            </NavLink>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <NavLink to="/login">Увійти в систему</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      );
  }
};

export default Header;
