import React from 'react';
import './LongText.scss'

export default function LongText({ label, placeholder, value, onChange, sectionId }) {

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div className="form-section">
      <label>{label}</label>
      <textarea 
        placeholder={placeholder || 'Enter your answer'} 
        value={value} 
        onChange={handleChange} 
        name={`section-${sectionId}`} 
      />
    </div>
  );
}