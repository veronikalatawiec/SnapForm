import React from 'react';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import Forms from '../../components/Forms/Forms'
import Nav from '../../components/Nav/Nav';
import Arrow from "../../assets/images/icon_arrow-right.svg"
import './HomePage.scss'

export default function HomePage(){
  return (
    <>
    <Nav/>
    <div className="home__page">
      <div className="home">
        <div className="home__top">
          <h1 className="home__h1">Welcome to SnapForm</h1>
          <Link to="/form/create">
            <Button className="btn--primary" text="Create a Form" iconPosition="icon-right" icon={<img src={Arrow} alt=">"/>}/>
          </Link>
        </div>
        <Forms />
      </div>
    </div>
    </>
  );
};