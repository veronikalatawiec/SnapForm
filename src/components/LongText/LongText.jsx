import React from 'react';
import './LongText.scss'

export default function LongText({ label, placeholder, value, onChange, sectionId }) {

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div className="form-section">
      <label className="form-section__label">{label}</label>
      <textarea 
        className="long-text__input"
        placeholder={placeholder || 'Enter your answer'} 
        value={value} 
        onChange={handleChange} 
        name={`section-${sectionId}`} 
      />
    </div>
  );
}