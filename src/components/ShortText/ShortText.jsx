import React from 'react';
import './ShortText.scss';

export default function ShortText({ label, placeholder, value, onChange, sectionId }) {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div className="form-section">
      <label className="form-section__label">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder || 'Enter your answer'} 
        value={value} 
        onChange={handleChange} 
        name={`section-${sectionId}`}
        className="short-text__input"
      />
    </div>
  );
}