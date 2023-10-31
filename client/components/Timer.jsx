import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

export const Timer = ({ onTimerEnd }) => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      onTimerEnd();
    }
  }, [onTimerEnd, seconds]);

  return (
    <div>
      {seconds === 0 ? (
        <p>Time is up!</p>
      ) : (
        <p>Time remaining: {seconds} seconds</p>
      )}
    </div>
  );
}

Timer.propTypes = {
  onTimerEnd: PropTypes.func.isRequired,
}