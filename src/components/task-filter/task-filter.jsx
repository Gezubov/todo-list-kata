import React from 'react';
import './task-filter.css';

import PropTypes from 'prop-types';

const TaskFilter = function TaskFilter({ changeFilter, filter }) {
  return (
    <ul className="filters">
      <li>
        <button type="submit" onClick={() => changeFilter('All')} className={filter === 'All' ? 'selected' : null}>
          All
        </button>
      </li>
      <li>
        <button
          type="submit"
          onClick={() => changeFilter('Active')}
          className={filter === 'Active' ? 'selected' : null}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="submit"
          onClick={() => changeFilter('Completed')}
          className={filter === 'Completed' ? 'selected' : null}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

TaskFilter.defaultProps = {
  filter: 'All',
  changeFilter: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  changeFilter: PropTypes.func,
};

export default TaskFilter;
