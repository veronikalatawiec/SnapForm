import React from 'react';
import Button from '../../components/Button/Button';
import './Footer.scss'

export default function Footer(){
  return (
    <div className="footer">
        <div className="footer__logo">
            <img></img>
        </div>
        <div className="footer__text">
            <p>
                © All Rights Reserved - Veronika Latawiec 2025
            </p>
        </div>
        <div className="footer__socials">
            {/* <a href="/portfolio">
                <Button className="btn--social" icon=""/>
            </a> */}
            <a href="/dribbble">
                <Button className="btn--social" icon=""/>
            </a>
            <a href="/linkedin">
                <Button className="btn--social" icon=""/>
            </a>
        </div>
    </div>
  );
};