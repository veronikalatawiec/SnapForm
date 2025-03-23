import React from 'react';
import './Check.scss';

export default function Checkbox({ label, options, value, onChange, sectionId }) {

const handleChange = (e) => {
    const selectedOption = e.target.value;

    const updatedValue = value.includes(selectedOption)
      ? value.filter((v) => v !== selectedOption)
      : [...value, selectedOption]; 

    onChange(updatedValue);
  };

  return (
      <div className="form-section">
        <label className="form-section__label">{label}</label>
        {options.map((option, index) => (
          <label key={index} className="checkbox">
            <input 
              type="checkbox"
              value={option}
              checked={value.includes(option)}
              onChange={handleChange}
              name={`section-${sectionId}`}
              className="checkbox__input"
            />
            <span className="checkbox__custom"></span>
            <span className="checkbox__text">{option}</span>
          </label>
        ))}
      </div>
    );
  }