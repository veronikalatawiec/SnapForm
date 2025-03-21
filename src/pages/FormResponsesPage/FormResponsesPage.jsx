import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

const FormResponsesPage = () => {
  return (
    <div>
      <h1>Form Responses</h1>
      <Link to="/">
        <Button text="Back" className="btn--link"/>
      </Link>
    </div>
  );
};

export default FormResponsesPage;
//NOTE: if time, there will be two views in this page, 1 which is responses and 1 which is analytics