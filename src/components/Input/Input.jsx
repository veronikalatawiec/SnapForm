import React from 'react';

const Input = ({ label, type, value, onChange, required, placeholder }) => {
  return (
    <div className="input">
      {label && <label className="input__label">{label}</label>}
      <input className="input__field"
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;