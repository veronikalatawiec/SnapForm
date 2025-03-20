import './SectionCheck.scss';
import React, { useState } from 'react';
import Button from '../Button/Button';

export default function CheckboxInput({ onChange }) {
  const [label, setLabel] = useState('');
  const [options, setOptions] = useState(['']); 
  const [placeholder, setPlaceholder] = useState('');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    onChange({ type: 'checkbox', label, options, placeholder });
  };
  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
    onChange({ type: 'checkbox', label, options: newOptions, placeholder });
  };
  const addOption = () => {
    setOptions([...options, '']);
  };
  const removeLast = () => {
    if (options.length > 1) {
        setOptions(options.slice(0, options.length - 1));
    //   onChange({ type: 'checkbox', label, options: newOptions, placeholder });
    }
  };
  const handlePlaceholderChange = (e) => {
    setPlaceholder(e.target.value);
    onChange({ type: 'checkbox', label, options, placeholder });
  };

  return (
    <div className='checkbox'>
      <input
        type="text"
        placeholder="Label"
        value={label}
        onChange={handleLabelChange}
        required
        className="checkbox__placeholder"
      />
      <input
        type="text"
        placeholder="Placeholder"
        value={placeholder}
        onChange={handlePlaceholderChange}
        required
        className="checkbox__placeholder"
      />

      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e)}
            placeholder={`Option ${index + 1}`}
            required
            className="checkbox__option"
          />
        </div>
      ))}
      <Button type="button" onClick={addOption} text="Add Checkbox" className="btn--secondary"/>
          {options.length > 1 && (
            <Button type="button" onClick={removeLast} text="Remove Checkbox" className="btn--delete" icon=""/>
          )}
    </div>
  );
}