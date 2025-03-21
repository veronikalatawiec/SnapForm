import React from 'react';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import './LandingPage.scss';

export default function LandingPage(){
  return (
    <div className="landing">
        <Nav />
        <div className="landing__hero">
            <h1 className="landing__head">
                User feedback in a Snap
            </h1>
            <h3 className="landing__subhead">
                Welcome to snapform
            </h3>
            <p className="landing__text">
                We empower freelancers, entrepreneurs, and small businesses with a simple, accessible platform to collect and analyze feedback. Whether you need data on customer experiences, product insights, or brand engagement, we can help you move faster and smarter.
            </p>
            <Link to="/signin">
                <Button className="btn--primary" text="Get Started"/>
            </Link>
        </div>
        <Footer />
    </div>
  );
};
