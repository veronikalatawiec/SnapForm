import React, { useState } from 'react';
import './SectionShortText.scss';

export default function SectionShortText({ onChange }) {
  const [label, setLabel] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    onChange({ type: 'text', label, placeholder });
  };

  const handlePlaceholderChange = (e) => {
    setPlaceholder(e.target.value);
    onChange({ type: 'text', label, placeholder });
  };

  return (
    <div className='short-text__container'>
      <input
        type="text"
        placeholder="Add a label"
        value={label}
        onChange={handleLabelChange}
        required
        className='short-text__label'
      />
      <input
        type="text"
        placeholder="Add a placeholder"
        value={placeholder}
        onChange={handlePlaceholderChange}
        required
        className='short-text__placeholder'
      />
    </div>
  );
}