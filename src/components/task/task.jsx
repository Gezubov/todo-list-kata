import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task.css';
import { formatDistanceToNow } from 'date-fns/esm';

export default class Task extends Component {
  static defaultProps = {
    created: Date.now(),
    editItem: () => {},
    onDeleted: () => {},
    onToggleCompleted: () => {},
    onToggleEdit: () => {},
  };

  static propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    editItem: PropTypes.func,
    created: PropTypes.number,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    completed: PropTypes.bool.isRequired,
    onToggleEdit: PropTypes.func,
    edit: PropTypes.bool.isRequired,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    description: this.props.description,
  };

  onDescriptionChange = (evt) => {
    this.setState({ description: evt.target.value });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    const { editItem, id } = this.props;
    const { description } = this.state;
    editItem(id, description);
    this.setState({ description });
  };

  render() {
    const { id, description, created, onDeleted, onToggleCompleted, completed, onToggleEdit, edit } = this.props;
    const { description: newDescription } = this.state;
    let className;
    let checked = '';
    if (completed) {
      className = 'completed';
      checked = 'checked';
    }
    if (edit) className = 'editing';

    return (
      <li className={className}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={() => {
              onToggleCompleted(id);
            }}
            checked={checked}
          />
          <label>
            <span className="description">{description}</span>
            <span className="created">{formatDistanceToNow(created, { includeSeconds: true })}</span>
          </label>
          <button
            type="submit"
            className="icon icon-edit"
            onClick={() => {
              onToggleEdit(id);
            }}
          >
            {}
          </button>
          <button
            type="submit"
            className="icon icon-destroy"
            onClick={() => {
              onDeleted(id);
            }}
          >
            {}
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            className="edit"
            value={newDescription}
            onKeyDown={this.editItem}
            onChange={this.onDescriptionChange}
          />
        </form>
      </li>
    );
  }
}
