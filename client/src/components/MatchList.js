import React from 'react';
import Match from './Match';

const MatchList = ({ matches, onDelete }) => {
  return (
    <div>
      {matches.map((match) => (
        <Match key={match.id} match={match} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default MatchList;
