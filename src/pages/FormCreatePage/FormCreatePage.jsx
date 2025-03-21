import React from 'react';
import SectionBuilder from '../../components/SectionBuilder/SectionBuilder';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

const FormCreatePage = () => {
  return (
    <div>
      <h1>Create Form</h1>
      <Link to="/">
        <Button text="Back" className="btn--link"/>
      </Link>
      <SectionBuilder />
    </div>
  );
};

export default FormCreatePage;
