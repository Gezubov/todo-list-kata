import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { formatDistanceToNow } from 'date-fns';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import './todoapp.css';

export default class TodoApp extends Component {
  state = {
    listData: [
      this.createTodoItem('Task 1'),
      this.createTodoItem('Task 2'),
      this.createTodoItem('Task 3'),
      this.createTodoItem('Task 4'),
    ],
    filter: 'All',
  };

  deleteItem = (id) => {
    this.setState(({ listData }) => {
      const idx = listData.findIndex((el) => el.id === id);
      const newListData = [...listData];
      newListData.splice(idx, 1);

      return {
        listData: newListData,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ listData }) => {
      const newListData = [...listData, newItem];
      return {
        listData: newListData,
      };
    });
  };

  editItem = (id, text) => {
    const { listData } = this.state;
    const [item] = listData.filter((el) => el.id === id);
    const newItem = { ...item, description: text, edit: false };
    this.setState(({ listData: newListData }) => {
      const idx = newListData.findIndex((el) => el.id === id);
      const newList = { listData: [...newListData.slice(0, idx), newItem, ...newListData.slice(idx + 1)] };
      return newList;
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ listData }) => ({
      listData: this.toggleProperty(listData, id, 'completed'),
    }));
  };

  onToggleEdit = (id) => {
    this.setState(({ listData }) => ({
      listData: this.toggleProperty(listData, id, 'edit'),
    }));
  };

  clearCompleted = () => {
    const { listData } = this.state;
    const newListData = listData.filter((el) => !el.completed);
    this.setState({
      listData: newListData,
    });
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  createTodoItem(text) {
    
    const created = formatDistanceToNow(new Date(Date.now()), { addSuffix: true, includeSeconds: true });
    const todoItem = {
      id: uuidv4(),
      created: `created ${created} ago`,
      description: text,
      completed: false,
      edit: false,
    };
    return todoItem;
    
  }

  render() {
    const { listData, filter } = this.state;
    const itemsLeft = listData.length - listData.filter((el) => el.completed).length;

    let showData;
    switch (filter) {
      case 'Active':
        showData = listData.filter((el) => !el.completed);
        break;
      case 'Completed':
        showData = listData.filter((el) => el.completed);
        break;
      default:
        showData = listData;
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={showData}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEdit={this.onToggleEdit}
            editItem={this.editItem}
          />
          <Footer
            itemsLeft={itemsLeft}
            changeFilter={this.changeFilter}
            filter={filter}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
