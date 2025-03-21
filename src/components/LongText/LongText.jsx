import React, { useState } from 'react';
import './LongText.scss'

export default function LongText({ label, placeholder }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="form-section">
      <label>{label}</label>
      <textarea 
        placeholder={placeholder || 'Enter your answer'} 
        value={value} 
        onChange={handleChange} 
      />
    </div>
  );
}