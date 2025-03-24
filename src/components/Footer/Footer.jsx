import React from 'react';
import LinkedIn from '../../assets/images/icon_linkedin.svg'
import Logo from '../../assets/images/logo-light.svg'
import './Footer.scss'

export default function Footer(){
  return (
    <div className="footer">
        <div className="footer__content">
            <div className="footer__logo">
                <img src={Logo} className="footer__logo"/>
            </div>
            <div className="footer__text">
                <p>
                    © All Rights Reserved - Snap Form 2025
                </p>
            </div>
            <div className="footer__socials">
                <a href="https://www.linkedin.com/in/veronikalatawiec/" className="footer__linkedin">
                    <img src={LinkedIn} alt="LinkedIn" className="footer__linkedin"/>
                </a>
            </div>
        </div>
        
    </div>
  );
};