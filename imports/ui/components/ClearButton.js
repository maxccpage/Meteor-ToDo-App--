import React from 'react';

export const ClearButton = ({ removeCompleted }) => {
  return <button onClick={removeCompleted}>Remove Completed</button>;
};
