import { useState } from 'react';
import PropTypes from "prop-types";

export const CounterApp = ({ value }) => {

  const [counter, setCounter ] = useState(value);

  const handleAdd = ( e, modif ) => {
    setCounter( counter + modif );
  };

  const handleReset = () => {
    setCounter( value );
  }

  return (
    <>
      <h2>Counter App</h2>
      <h3>{counter}</h3>

      <button onClick={(e) => handleAdd(e, -1)}>-1</button>
      <button onClick={(e) => handleAdd(e, 1)}>+1</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};

CounterApp.propTypes = {
  value: PropTypes.number.isRequired,
};

CounterApp.defaultProps = {
  value: -1,
};
