import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

const FormEditPage = () => {
  return (
    <div>
      <h1>Edit Form</h1>
      <Link to="/">
        <Button text="Back" className="btn--link"/>
      </Link>
    </div>
  );
};

export default FormEditPage;