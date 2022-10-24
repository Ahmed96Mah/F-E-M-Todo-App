import { connect } from 'react-redux';
import { ConnectedList } from './List';
import { useRef } from 'react';
import { handleAddTodo } from '../actions/Todos';
import { state } from '../models/state';
import completed from '../assets/icon-check.svg';

const Todo = ({
  theme,
  handleAddTodo,
}: {
  theme: string;
  handleAddTodo: Function;
}) => {
  const todoInput = useRef(null);

  const handleClick = () => {
    // @ts-ignore
    todoInput.current.value.length >= 10
      ? handleAddTodo(
          // @ts-ignore
          todoInput.current.value,
          // @ts-ignore
          () => (todoInput.current.value = '')
        )
      : alert('The Todo have to consist of at least 10 characters');
  };
  return (
    <div>
      <div id="inputDiv" className={theme === 'dark' ? 'dark' : ''}>
        <span
          className={theme === 'dark' ? 'dark circleDiv' : 'circleDiv'}
          onClick={handleClick}
        >
          <img className="addTodo" src={completed} alt="add todo" />
        </span>
        <input
          className={theme === 'dark' ? 'dark' : ''}
          type="text"
          placeholder="Create a new todo..."
          ref={todoInput}
        />
      </div>
      <ConnectedList />
    </div>
  );
};

export const ConnectedTodo = connect(
  (state: state) => ({
    theme: state.theme,
  }),
  { handleAddTodo }
)(Todo);
