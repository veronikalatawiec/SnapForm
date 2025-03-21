import React, { useState } from 'react';
import './Check.scss';

export default function Checkbox({ label, options }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOptions((prevSelected) => 
      prevSelected.includes(value) 
        ? prevSelected.filter((option) => option !== value)
        : [...prevSelected, value]
    );
  };

  return (
    <div className="form-section">
      <label>{label}</label>
      {options.map((option, index) => (
        <div key={index}>
          <input 
            type="checkbox" 
            value={option} 
            checked={selectedOptions.includes(option)} 
            onChange={handleChange} 
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
}