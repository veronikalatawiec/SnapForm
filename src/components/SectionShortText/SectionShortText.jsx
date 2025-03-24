import React, { useState } from 'react';
import Input from '../Input/Input.jsx'
import './SectionShortText.scss';

export default function SectionShortText({ onChange}) {
  const [label, setLabel] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    onChange({ type: 'shorttext', label: e.target.value});
  };

  return (
    <div className='short-text'>
      <input
        type="text"
        placeholder="What would you like to ask?"
        value={label}
        onChange={handleLabelChange}
        required
        className='short-text__label'
      />
    </div>
  );
}