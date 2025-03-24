import './SectionCheck.scss';
import React, { useState } from 'react';
import Button from '../Button/Button';
import Add from '../../assets/images/icon_add.svg'
import Remove from '../../assets/images/icon_x.svg'

export default function CheckboxInput({ onChange }) {
  const [label, setLabel] = useState('');
  const [options, setOptions] = useState(['']); 
  const [placeholder, setPlaceholder] = useState('');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    onChange({ type: 'checkbox', label, options, placeholder:null });
  };
  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
    onChange({ type: 'checkbox', label, options: newOptions, placeholder:null });
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

  return (
    <div className='checkbox-section'>
      <div className='checkbox-section__inputs'>
        <input
        type="text"
        placeholder="What would you like to ask?"
        value={label}
        onChange={handleLabelChange}
        required
        className="checkbox-section__label"
      />
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e)}
            placeholder={`Option ${index + 1}`}
            required
            className="checkbox-section__option"
          />
        </div>
      ))}
      <div className='checkbox-section__btns'>
      <Button 
                  type="button" 
                  onClick={addOption} 
                  icon={<img src={Add} alt="Add Option" />}
                  iconPosition="icon-only" 
                  className="btn--add"/>

          {options.length > 1 && (
            <Button 
              type="button" 
              onClick={removeLast} 
              icon={<img src={Remove} alt="Remove Option" />}
              iconPosition="icon-only" 
              className="btn--delete"
            />
          )}
          </div>
      </div>
      
    </div>
  );
}