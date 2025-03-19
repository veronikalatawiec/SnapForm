import React, { useState } from 'react';
import './SectionShortText.scss';

export default function ShortTextInput({ onChange }) {
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
    <div>
      <input
        type="text"
        placeholder="Label"
        value={label}
        onChange={handleLabelChange}
        required
      />
      <input
        type="text"
        placeholder="Placeholder"
        value={placeholder}
        onChange={handlePlaceholderChange}
        required
      />
    </div>
  );
}