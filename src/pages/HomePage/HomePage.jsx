import React from 'react';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import Table from '../../components/Forms/Forms'

const HomePage = () => {
  return (
    <div>
      <h1>User Home</h1>
      <Link to="/form/create">
        <Button className="btn--primary" text="Create a Form"/>
      </Link>
      <Table />
    </div>
  );
};

export default HomePage;
//NOTE: If time set popup/different homepage on first time sign in(linked from sign up)