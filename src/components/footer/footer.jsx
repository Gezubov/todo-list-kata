import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../task-filter/task-filter';
import './footer.css';

const Footer = function Footer({ itemsLeft, filter, changeFilter, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{`${itemsLeft} items left`}</span>
      <TaskFilter changeFilter={(filt) => changeFilter(filt)} filter={filter} />
      <button type="submit" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  itemsLeft: 0,
  clearCompleted: () => {},
  filter: 'All',
  changeFilter: () => {},
};

Footer.propTypes = {
  itemsLeft: PropTypes.number,
  clearCompleted: PropTypes.func,
  filter: PropTypes.string,
  changeFilter: PropTypes.func,
};

export default Footer;
