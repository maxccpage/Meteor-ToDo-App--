import React from 'react';

export const ToDo = ({ item, toggleComplete, removeToDo }) => (
  <li>
    {item.title}
    <input
      type="checkbox"
      id={item._id}
      checked={item.complete}
      onChange={toggleComplete}
    />
    <label htmlFor={item._id} />
    <button onClick={removeToDo}>
      <i className="fa fa-trash" />
    </button>
  </li>
);
