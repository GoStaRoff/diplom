import React from "react";
import face from "../images/face.png";
import inst from "../images/instagram.png";
import yt from "../images/youtube.png";
import email from "../images/email.png";

const Footer = () => {
    return(
        <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Військовий інститут телекомунікацій та інформатизації
імені Героїв Крут</h5>
              <p className="grey-text text-lighten-4">Якийсь текст про корисність цього сайту і що він з себе представляє.Якийсь текст про корисність цього сайту і що він з себе представляє.</p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Контатки</h5>
              <ul>
                <li><a className="white-text text-lighten-3" target="_blank" without rel="noreferrer" href="https://www.facebook.com/viti.edu.ua"><img alt="logo" height="18px" src={face} />Facebook</a></li>
                <li><a className="grey-text text-lighten-3" target="_blank" without rel="noreferrer" href="https:/instagram.com/viti_krut"><img alt="logo" height="18px" src={inst} />Instagram</a></li>
                <li><a className="white-text text-lighten-3" target="_blank" without rel="noreferrer" href="https://www.youtube.com/channel/UCY3W3FOsHjcutQLPIjtq_9w"><img alt="logo" height="18px" src={yt} />YouTube</a></li>
                <li><a className="white-text text-lighten-3" target="_blank" without rel="noreferrer" href="mailto:vitivstup@viti.edu.ua"><img alt="logo" height="18px" src={email} />vitivstup@viti.edu.ua</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
          © 2021 All rights reserved
          </div>
        </div>
      </footer>
    )
}

export default Footer;