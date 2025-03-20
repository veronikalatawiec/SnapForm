import React, { useState } from 'react';
import './SectionShortText.scss';

export default function SectionShortText({ onChange}) {
  const [label, setLabel] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    onChange({ type: 'shorttext', label: e.target.value, placeholder });
  };

  const handlePlaceholderChange = (e) => {
    setPlaceholder(e.target.value);
    onChange({ type: 'shorttext', label, placeholder: e.target.value });
  };

  return (
    <div className='short-text'>
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