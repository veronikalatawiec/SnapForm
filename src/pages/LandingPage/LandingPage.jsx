import React from "react";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import "./LandingPage.scss";
import Arrow from "../../assets/images/icon_arrow-right.svg";

export default function LandingPage() {
  return (
    <div className="landing">
      <Nav type="landing" />
      <div className="landing__hero">
        <h1 className="landing__head">User feedback in a Snap</h1>
        <p className="landing__text">
          We empower freelancers, entrepreneurs, and small businesses with a
          simple, accessible platform to collect and analyze feedback. Whether
          you need data on customer experiences, product insights, or brand
          engagement, we can help you move faster and smarter.
        </p>
        <Link to="/signin">
          <Button
            className="btn--primary"
            text="Get Started"
            iconPosition="icon-right"
            icon={<img src={Arrow} alt="Arrow" />}
          />
        </Link>
      </div>
      <Footer />
    </div>
  );
}
