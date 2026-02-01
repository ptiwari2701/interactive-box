import React from 'react';
import './InputField.css';

const InputField = ({ value, onChange, error }) => {
  return (
    <div className="input-field-container">
      <label htmlFor="box-count" className="input-label">
        Enter number of boxes (5-25):
      </label>
      <input
        id="box-count"
        type="number"
        min="5"
        max="25"
        value={value}
        onChange={onChange}
        className={`input-field ${error ? 'input-error' : ''}`}
        placeholder="Enter a number between 5 and 25"
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default InputField;
