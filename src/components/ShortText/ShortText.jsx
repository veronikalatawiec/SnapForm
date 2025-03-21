import React, { useState } from 'react';
import './ShortText.scss'

export default function ShortText({ label, placeholder }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="form-section">
      <label>{label}</label>
      <input 
        type="text" 
        placeholder={placeholder || 'Enter your answer'} 
        value={value} 
        onChange={handleChange} 
      />
    </div>
  );
}