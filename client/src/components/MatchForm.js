import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMatch } from '../redux/actions/matchActions';

const MatchForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const dispatch = useDispatch();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addMatch({ name, date, time, location }));
    setName('');
    setDate('');
    setTime('');
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Match Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="date">Match Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
        />
      </div>
      <div>
        <label htmlFor="time">Match Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={handleTimeChange}
        />
      </div>
      <div>
        <label htmlFor="location">Match Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
        />
      </div>
      <button type="submit">Create Match</button>
    </form>
  );
};

export default MatchForm;
