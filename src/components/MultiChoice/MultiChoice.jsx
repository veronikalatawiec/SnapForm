import React from 'react';
import './MultiChoice.scss';

export default function MultiChoice({ label, options, value, onChange, sectionId }) {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div className="form-section">
      <label className="form-section__label">{label}</label>
      {options.map((option, index) => (
        <label key={index} className="radio">
          <input 
            type="radio" 
            name={`section-${sectionId}`} 
            value={option} 
            checked={value === option} 
            onChange={handleChange}
            className="radio__input"
          />
          <span className="radio__custom"></span>
          <span className="radio__text">{option}</span>
        </label>
      ))}
    </div>
  );
}
