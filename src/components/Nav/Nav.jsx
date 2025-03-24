import React from "react";
import Button from "../../components/Button/Button";
import Logo from "../../assets/images/logo-dark.svg";
import { Link } from "react-router-dom";
import "./Nav.scss";

export default function Nav({ type }) {
  if (type === "landing") {
    return (
      <div className="nav">
        <div className="nav__content">
          <div className="nav__logo">
            <img className="nav__logo" src={Logo} alt="Logo" />
          </div>
          <div className="nav__btns">
            <Link to="/signin">
              <Button className="btn--secondary" text="Sign In" />
            </Link>
            <Link to="/signup">
              <Button className="btn--primary" text="Sign Up" />
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="nav--centered">
        <div className="nav--centered__content">
          <div className="nav--centered__logo">
            <img className="nav--centered__logo" src={Logo} alt="Logo" />
          </div>
        </div>
      </div>
    );
  }
}
