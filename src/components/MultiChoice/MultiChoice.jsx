import React from 'react';
import './MultiChoice.scss'

export default function MultiChoice({ label, options, value, onChange, sectionId }) {

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div className="form-section">
      <label>{label}</label>
      {options.map((option, index) => (
        <div key={index}>
          <input 
            type="radio" 
            name={`section-${sectionId}`} 
            value={option} 
            checked={value === option} 
            onChange={handleChange} 
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
}
