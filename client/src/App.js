import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import MatchForm from './components/MatchForm';
import MatchList from './components/MatchList';
import Notification from './components/Notification';
import matchService from './services/match';
import './App.css';

function App() {
  const [matches, setMatches] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    matchService.getAll().then((initialMatches) => {
      setMatches(initialMatches);
    });
  }, []);

  const addMatch = (newMatch) => {
    matchService.create(newMatch).then((returnedMatch) => {
      setMatches(matches.concat(returnedMatch));
      setErrorMessage(`New match "${returnedMatch.name}" added`);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    });
  };

  return (
    <div className="container">
      <div className="navbar">
        <Link to="/" className="navlink">Football App</Link>
        <Link to="/matches" className="navlink">Matches</Link>
        <Link to="/new-match" className="navlink">Add Match</Link>
      </div>
      <div className="content">
        <Notification message={errorMessage} />
        <Switch>
          <Route path="/matches">
            <MatchList matches={matches} />
          </Route>
          <Route path="/new-match">
            <MatchForm addMatch={addMatch} />
          </Route>
          <Route path="/">
            <div>
              <h2>Welcome to the Football App</h2>
              <p>This app lets you create and schedule matches with your friends.</p>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
