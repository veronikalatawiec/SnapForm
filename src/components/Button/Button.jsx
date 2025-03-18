import React from 'react';
import './Button.scss';

export default function Button({ className, onClick, icon, type, disabled, text }) {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
        {text}
      {(className === 'btn--link' || className === 'btn--delete') && icon && (
        <span className="btn__icon">{icon}</span>
      )}
    </button>
  );
};