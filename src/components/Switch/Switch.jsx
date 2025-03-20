import React from 'react';
import './Switch.scss'

export default function Switch() {
  return (
    <div className="switch">
      <label className="switch__label">
        {isLive ? 'Accepting Responses' : 'Not Accepting Responses'}
        <input
          type="checkbox"
          checked={isLive}
          onChange={onToggle}
          className="switch__input"
        />
        <span className="switch__slider"></span>
      </label>
    </div>
  );
}
//{ isLive, onToggle }?? idk yet