import { todo } from '../models/todo';
import { connect } from 'react-redux';
import { state } from '../models/state';
import {
  handleRemoveTodo,
  handleToggleTodo,
  clearTodo,
} from '../actions/Todos';
import removeIcon from '../assets/icon-cross.svg';
import completed from '../assets/icon-check.svg';
import { setFilter } from '../actions/filter';
import { MouseEventHandler } from 'react';

const List = ({
  todos,
  filter,
  theme,
  loading,
  handleToggleTodo,
  handleRemoveTodo,
  setFilter,
  clearTodo,
}: {
  todos: todo[];
  filter: string;
  theme: string;
  loading: boolean;
  handleToggleTodo: Function;
  handleRemoveTodo: Function;
  setFilter: Function;
  clearTodo: Function;
}) => {
  const activeTodos = todos.filter((todo) => todo.complete === false).length;
  const completeness = filter === 'active' ? false : true;
  const processClick = (e: Event) => {
    const filterName = (e.target as HTMLElement).textContent!.toLowerCase();
    setFilter(filterName);
  };
  return (
    <div id="listContainer" className={theme === 'dark' ? 'dark' : ''}>
      {loading === true && (
        <div className="loadingDiv">
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          <span>Loading Saved Todos</span>
        </div>
      )}
      {loading !== true &&
        filter === 'all' &&
        todos.map((todo, index) => {
          return (
            <div
              className={theme === 'dark' ? 'todoItem dark' : 'todoItem'}
              key={index}
              onClick={(e) => {
                ((e.target as HTMLElement).nodeName === 'SPAN' ||
                  ((e.target as HTMLElement).nodeName === 'IMG' &&
                    (e.target as HTMLElement).classList.contains(
                      'completeTask'
                    ))) &&
                  handleToggleTodo(todo.id);
                (e.target as HTMLElement).nodeName === 'IMG' &&
                  (e.target as HTMLElement).classList.contains('removeIcon') &&
                  handleRemoveTodo(todo);
              }}
            >
              <div className="todoData">
                <span className="borderCircle">
                  <span
                    className={
                      todo.complete === true
                        ? 'completedCircleDiv'
                        : theme === 'dark'
                        ? 'circleDiv dark'
                        : 'circleDiv'
                    }
                  >
                    <img
                      className="completeTask"
                      src={completed}
                      alt="complete task"
                    />
                  </span>
                </span>
                <span
                  className={
                    todo.complete === true
                      ? theme === 'dark'
                        ? 'completedTodo dark'
                        : 'completedTodo'
                      : theme === 'dark'
                      ? 'todo dark'
                      : 'todo'
                  }
                >
                  {todo.name}
                </span>
              </div>
              <img
                className="removeIcon"
                src={removeIcon}
                alt="remove todo item"
              />
            </div>
          );
        })}

      {loading !== true &&
        filter !== 'all' &&
        todos
          .filter((todo) => todo.complete === completeness)
          .map((todo, index) => {
            return (
              <div
                className={theme === 'dark' ? 'todoItem dark' : 'todoItem'}
                key={index}
                onClick={(e) => {
                  ((e.target as HTMLElement).nodeName === 'SPAN' ||
                    ((e.target as HTMLElement).nodeName === 'IMG' &&
                      (e.target as HTMLElement).classList.contains(
                        'completeTask'
                      ))) &&
                    handleToggleTodo(todo.id);
                  (e.target as HTMLElement).nodeName === 'IMG' &&
                    (e.target as HTMLElement).classList.contains(
                      'removeIcon'
                    ) &&
                    handleRemoveTodo(todo);
                }}
              >
                <div className="todoData">
                  <span className="borderCircle">
                    <span
                      className={
                        todo.complete === true
                          ? 'completedCircleDiv'
                          : theme === 'dark'
                          ? 'circleDiv dark'
                          : 'circleDiv'
                      }
                    >
                      <img
                        className="completeTask"
                        src={completed}
                        alt="complete task"
                      />
                    </span>
                  </span>
                  <span
                    className={
                      todo.complete === true
                        ? theme === 'dark'
                          ? 'completedTodo dark'
                          : 'completedTodo'
                        : theme === 'dark'
                        ? 'todo dark'
                        : 'todo'
                    }
                  >
                    {todo.name}
                  </span>
                </div>
                <img
                  className="removeIcon"
                  src={removeIcon}
                  alt="remove todo item"
                />
              </div>
            );
          })}

      <div id="listActions">
        <span id="count" className={theme === 'dark' ? 'dark' : ''}>
          {activeTodos} items left
        </span>
        <div className={theme === 'dark' ? 'filters dark' : 'filters'}>
          <span
            className={filter === 'all' ? 'selected' : ''}
            onClick={
              processClick as unknown as MouseEventHandler<HTMLSpanElement>
            }
          >
            All
          </span>
          <span
            className={filter === 'active' ? 'selected' : ''}
            onClick={
              processClick as unknown as MouseEventHandler<HTMLSpanElement>
            }
          >
            Active
          </span>
          <span
            className={filter === 'completed' ? 'selected' : ''}
            onClick={
              processClick as unknown as MouseEventHandler<HTMLSpanElement>
            }
          >
            Completed
          </span>
        </div>
        <span
          id="clearList"
          className={theme === 'dark' ? 'dark' : ''}
          onClick={() => {
            clearTodo();
          }}
        >
          Clear Completed
        </span>
      </div>
    </div>
  );
};

export const ConnectedList = connect(
  (state: state) => ({
    todos: state.todos,
    filter: state.filter,
    theme: state.theme,
    loading: state.loading,
  }),
  {
    handleToggleTodo,
    handleRemoveTodo,
    setFilter,
    clearTodo,
  }
)(List);
