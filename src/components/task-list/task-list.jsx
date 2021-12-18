import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';
import './task-list.css';

export default function TaskList({ todos, onDeleted, onToggleCompleted, onToggleEdit, editItem }) {
  // Создаем элемент списка
  const elements = todos.map((item) => {
    const { ...itemProps } = item;

    return (
      <Task
        key={item.id}
        {...itemProps}
        onDeleted={onDeleted}
        onToggleCompleted={onToggleCompleted}
        onToggleEdit={onToggleEdit}
        editItem={editItem}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  editItem: () => {},
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onToggleEdit: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  editItem: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onToggleEdit: PropTypes.func,
};
