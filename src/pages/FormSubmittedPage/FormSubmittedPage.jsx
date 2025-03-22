import React from 'react';
import './FormSubmittedPage.scss'
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

export default function FormSubmittedPage() {

  return (
    <div className='submitted'>
      <h2 className='submitted__head'>Thank you for submitting the form!</h2>
      <p className='submitted__text'>Your responses have been successfully recorded.</p>
      <div className='submitted__cta'>
        <p className='submitted__prompt'>Want to gather your own feedback from users?</p>
        <Link to="/">
            <Button text="Try Snapform" className='btn--primary'/>
        </Link>
      </div>
    </div>
  );
}