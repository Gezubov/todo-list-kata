import React, { Component } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdded: () => {},
  };

  static propTypes = {
    onItemAdded: PropTypes.func,
  };

  state = {
    description: '',
  };

  onDescriptionChange = (evt) => {
    this.setState({ description: evt.target.value });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    const { onItemAdded } = this.props;
    const { description } = this.state;
    onItemAdded(description);
    this.setState({ description: '' });
  };

  render() {
    const { description } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onDescriptionChange}
          value={description}
        />
      </form>
    );
  }
}
