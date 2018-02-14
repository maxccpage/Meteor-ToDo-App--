import React, { Component } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { ToDo } from '../../components/ToDoItem';
import { ToDoCount } from '../../components/ToDoCount';
import { ClearButton } from '../../components/ClearButton';
import AccountsUIWrapper from '../../components/AccountsWrapper/index';
//Meteor imports
import { ToDos } from '../../../api/todo'; //Collection Todo file
import { createContainer } from 'meteor/react-meteor-data'; //HOC

class App extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: ''
    };

    this.removeCompleted = this.removeCompleted.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  addToDo(event) {
    event.preventDefault();
    if (this.toDoInput.value) {
      ToDos.insert({
        title: this.toDoInput.value,
        complete: false
      });
    }
    this.toDoInput.value = '';
  }

  toggleComplete(todo) {
    ToDos.update(todo._id, { $set: { complete: !todo.complete } });
  }

  removeToDo(todo) {
    ToDos.remove(todo._id);
  }

  removeCompleted() {
    let todoIds = this.props.todos
      .filter(todo => {
        return todo.complete;
      })
      .map(todo => todo._id);

    todoIds.forEach(id => ToDos.remove(id));
  }

  hasCompleted() {
    // let completed = this.props.todos.filter(todo => todo.complete)
    let completed = this.props.todos.filter(todo => {
      return todo.complete;
    });

    return completed.length > 0 ? true : false;
  }

  componentDidMount() {
    console.log('Props', this.props.todos);
    this.props.currentUser ? this.toDoInput.focus() : null;
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="login-wrapper">
          <AccountsUIWrapper />
        </div>
        {this.props.currentUser ? (
          <div className="todo-list">
            <h1>Todo App</h1>
            <div className="add-todo">
              <form name="addTodo" onSubmit={this.addToDo}>
                <input type="text" ref={input => (this.toDoInput = input)} />
                <span>(press enter to add)</span>
              </form>
            </div>
            <ul>
              {this.props.todos.map((todo, i) => (
                <ToDo
                  key={todo.id}
                  item={todo}
                  toggleComplete={this.toggleComplete.bind(this, todo)}
                  removeToDo={this.removeToDo.bind(this, todo)}
                />
              ))}
            </ul>
            <div className="todo-admin">
              <ToDoCount number={this.props.todos.length}>HI there</ToDoCount>
              {this.hasCompleted() ? (
                <ClearButton removeCompleted={this.removeCompleted} />
              ) : (
                  ''
                )}
            </div>
          </div>

        ) : (
            <div className="logged-out-message">
              <p> Please sign in to see your todos </p>
            </div>
          )}
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    todos: ToDos.find({}).fetch(),// Query to database to grab all docs---
    currentUser: Meteor.user(), //Grab current logged in User 
    currentUserId: Meteor.userId(),// Grab the current user's ID
  };
}, App);

ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};

ClearButton.propTypes = {
  removeCompleted: PropTypes.string.isRequired
};

ToDo.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  })
};
