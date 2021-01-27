import React, { useContext} from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const Header = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };
  
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo logo-text">
          Just test
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="profile">Профіль</NavLink>
          </li>
          <li>
            <NavLink to="testlist">Список тестів</NavLink>
          </li>
          <li>
            <NavLink to="createtest">Створити тест</NavLink>
          </li>
          <li>
            <NavLink /*onClick={() => {props.onAuth()}}*/ to="userlist">Список користувачів</NavLink>
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
};

export default Header;
