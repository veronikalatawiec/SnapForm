import React from 'react';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import './Nav.scss'

export default function Nav(){
  return (
    <div className="nav">
        <div className="nav__logo">
            <img></img>
        </div>
        <div className="nav__btns">
            <Link to="/signin">
                <Button className="btn--secondary" text="Sign In"/>
            </Link>
            <Link to="/signup">
                <Button className="btn--primary" text="Sign Up"/>
            </Link>
        </div>
    </div>
  );
};