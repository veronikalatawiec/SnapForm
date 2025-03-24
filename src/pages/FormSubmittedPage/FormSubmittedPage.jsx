import React from 'react';
import './FormSubmittedPage.scss'
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Checkmark from '../../assets/images/icon_check-mark.svg';
import Logo from '../../assets/images/logo-light.svg';

export default function FormSubmittedPage() {

  return (
    <div className='submitted__page'>
      <div className='submitted'>
        <div className='submitted__img'>
          <img className='submitted__icon' src={Checkmark} alt="Checkmark"/>
        </div>
        <h2 className='submitted__head'>Thank you for answering this form!</h2>
        <p className='submitted__text'>Your responses have been successfully recorded.</p>  
      </div>
      <div className='submitted__cta'>
        <p className='submitted__prompt'>Want to gather your own feedback from users?</p>
        <Link to="/">
            <Button text="Try Snapform" className='btn--primary'/>
        </Link>
        <img className="submitted__logo" src={Logo}/>
      </div>
      
    </div>
  );
}