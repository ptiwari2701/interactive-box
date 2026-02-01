/**
 * Validates the input number for box count
 * @param {string} value - Input value as string
 * @returns {Object} { isValid: boolean, error: string, number: number }
 */
export const validateBoxCount = (value) => {
  // Empty input
  if (value === '' || value === null || value === undefined) {
    return {
      isValid: false,
      error: 'Please enter a number',
      number: null,
    };
  }

  // Convert to number
  const num = Number(value);

  // Check if it's a valid number
  if (isNaN(num)) {
    return {
      isValid: false,
      error: 'Please enter a valid number',
      number: null,
    };
  }

  // Check if it's an integer
  if (!Number.isInteger(num)) {
    return {
      isValid: false,
      error: 'Please enter an integer (whole number)',
      number: null,
    };
  }

  // Check range
  if (num < 5) {
    return {
      isValid: false,
      error: 'Number must be at least 5',
      number: null,
    };
  }

  if (num > 25) {
    return {
      isValid: false,
      error: 'Number must be at most 25',
      number: null,
    };
  }

  return {
    isValid: true,
    error: null,
    number: num,
  };
};
