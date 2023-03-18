import React, { useState } from 'react';
import moment from 'moment';
import Calendar from './Calendar';

const Match = ({ match, onScoreChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [score1, setScore1] = useState(match.score1);
  const [score2, setScore2] = useState(match.score2);
  
  const handleScoreChange = (e) => {
    const { name, value } = e.target;
    if (name === 'score1') {
      setScore1(value);
    } else {
      setScore2(value);
    }
    onScoreChange(match.id, score1, score2);
  };
  
  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };
  
  return (
    <div className="match">
      <div className="match-details">
        <h3>{match.name}</h3>
        <p>Date: {moment(match.date).format('DD/MM/YYYY')}</p>
        <p>Time: {moment(match.date).format('HH:mm')}</p>
        <p>Location: {match.location}</p>
        <div className="scores">
          <input type="number" name="score1" value={score1} onChange={handleScoreChange} />
          <span>VS</span>
          <input type="number" name="score2" value={score2} onChange={handleScoreChange} />
        </div>
        <button onClick={handleCalendarClick}>Add to calendar</button>
      </div>
      {showCalendar && <Calendar match={match} />}
    </div>
  );
};

export default Match;
