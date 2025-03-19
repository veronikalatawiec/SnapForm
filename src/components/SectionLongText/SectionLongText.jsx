import './SectionLongText.scss';
import React, { useState } from 'react';

export default function SectionLongText({ onChange }) {
  const [label, setLabel] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    onChange({ type: 'textarea', label, placeholder });
  };

  const handlePlaceholderChange = (e) => {
    setPlaceholder(e.target.value);
    onChange({ type: 'textarea', label, placeholder });
  };

  return (
    <div className='long-text'>
      <input
        type="text"
        placeholder="Add a label"
        value={label}
        onChange={handleLabelChange}
        required
        className='long-text__label'
      />
      <input
        type="text"
        placeholder="Add a placeholder"
        value={placeholder}
        onChange={handlePlaceholderChange}
        required
        className='long-text__placeholder'
      />
    </div>
  );
}