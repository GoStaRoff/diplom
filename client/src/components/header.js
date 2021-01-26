import React from 'react';

 const Header = () => {
    return(
        <nav>
        <div className="nav-wrapper">
          <a href="#" class="brand-logo">
            Just test
          </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <a>Вхід  |  Реєстрація</a>
            </li>
          </ul>
        </div>
      </nav>
    )
}

export default Header;