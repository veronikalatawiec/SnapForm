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
      <label>{label}</label>
      {options.map((option, index) => (
        <div key={index}>
          <input 
            type="checkbox"
            value={option}
            checked={value.includes(option)} 
            onChange={handleChange}
            name={`section-${sectionId}`} 
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
}