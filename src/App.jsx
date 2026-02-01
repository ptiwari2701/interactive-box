import React, { useState } from 'react';
import InputField from './components/InputField/InputField';
import BoxGrid from './components/BoxGrid/BoxGrid';
import { useBoxInteraction } from './hooks/useBoxInteraction';
import { validateBoxCount } from './utils/inputValidation';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [boxCount, setBoxCount] = useState(null);
  const [error, setError] = useState(null);

  const { boxes, isDisabled, handleBoxClick } = useBoxInteraction(boxCount);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const validation = validateBoxCount(value);
    setError(validation.error);

    if (validation.isValid) {
      setBoxCount(validation.number);
    } else {
      setBoxCount(null);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>Interactive Box Display</h1>
          <p className="app-subtitle">
            Enter a number between 5 and 25 to generate boxes in a C-shape
          </p>
        </header>

        <main className="app-main">
          <InputField
            value={inputValue}
            onChange={handleInputChange}
            error={error}
          />

          {boxCount && boxes.length > 0 && (
            <BoxGrid
              boxes={boxes}
              onBoxClick={handleBoxClick}
              isDisabled={isDisabled}
            />
          )}

          {boxCount && (
            <div className="info-section">
              <p className="info-text">
                Click boxes to change them from red to green. When all boxes are
                green, they will revert to red in reverse order (one per second).
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
