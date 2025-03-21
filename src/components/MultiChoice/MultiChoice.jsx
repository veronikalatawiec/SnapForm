import React, { useState } from 'react';
import './MultiChoice.scss'

export default function MultiChoice({ label, options }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="form-section">
      <label>{label}</label>
      {options.map((option, index) => (
        <div key={index}>
          <input 
            type="radio" 
            name={label} 
            value={option} 
            checked={selectedOption === option} 
            onChange={handleChange} 
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
}