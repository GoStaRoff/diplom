import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const Header = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/login");
  };
  if (props.isAuth) {
    return (
      <nav>
        <div className="nav-wrapper">
          <NavLink className="brand-logo logo-text" to="/main">Just test</NavLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="/profile">Профіль</NavLink>
            </li>
            <li>
              <NavLink to="/testlist">Список тестів</NavLink>
            </li>
            <li>
              <NavLink to="/userlist">
                Список користувачів
              </NavLink>
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
  }
  else{
    return(
      <nav>
        <div className="nav-wrapper">
        <NavLink className="brand-logo logo-text" to="/main">Just test</NavLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="/login">Увійти в систему</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
};

export default Header;
