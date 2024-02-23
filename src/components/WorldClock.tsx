import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import './WorldClock.css'; // Import the CSS file

interface WorldClockProps {
  timezone: string;
}

const WorldClock: React.FC<WorldClockProps> = ({ timezone }) => {
  const [currentTime, setCurrentTime] = useState<string>(moment().tz(timezone).format('HH:mm:ss'));

  useEffect(() => {
    const intervalId = setInterval(() => {
    setCurrentTime(moment().tz(timezone).format('MMMM DD YYYY -  h:mm:ss A'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timezone]);

  const getHourRotation = () => {
    const hours = moment().tz(timezone).hours();
    return (hours % 12) * 30 + moment().tz(timezone).minutes() * 0.5;
  };

  const getMinuteRotation = () => {
    return moment().tz(timezone).minutes() * 6 + moment().tz(timezone).seconds() * 0.1;
  };

  const getSecondRotation = () => {
    return moment().tz(timezone).seconds() * 6;
  };

  return (
    <div className="world-clock">
      <h2>World Clock ({timezone})</h2>
      <div className="analog-clock">
        
        <div className="hour hand" style={{ transform: `rotate(${getHourRotation()}deg)` }}></div>
        <div className="minute hand" style={{ transform: `rotate(${getMinuteRotation()}deg)` }}></div>
        <div className="second hand" style={{ transform: `rotate(${getSecondRotation()}deg)` }}></div>
        <div className="center"></div>
      </div>
      <p>{currentTime}</p>
    </div>
  );
};

export default WorldClock;
