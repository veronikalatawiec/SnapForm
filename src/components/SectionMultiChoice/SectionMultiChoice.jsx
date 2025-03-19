import './SectionMultiChoice.scss';
import React, { useState } from 'react';

export default function MultipleChoiceInput({ onChange }) {
  const [label, setLabel] = useState('');
  const [options, setOptions] = useState(['']);
  const [placeholder, setPlaceholder] = useState('');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    onChange({ type: 'radio', label, options, placeholder });
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
    onChange({ type: 'radio', label, options: newOptions, placeholder });
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeLast = () => {
    if (options.length > 1) {
      setOptions(options.slice(0, options.length - 1));
    }
  };

  const handlePlaceholderChange = (e) => {
    setPlaceholder(e.target.value);
    onChange({ type: 'radio', label, options, placeholder });
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
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(index, e)}
          placeholder={`Option ${index + 1}`}
          required
        />
      ))}
      <button type="button" onClick={addOption}>Add Option</button>
      {options.length > 1 && (
        <button type="button" onClick={removeLast}>
          Remove Option
        </button>
      )}
    </div>
  );
}