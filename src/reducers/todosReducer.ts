import {
  ADD_TODO,
  CLEAR_TODO,
  RECEIVE_DATA,
  REMOVE_TODO,
  TOGGLE_TODO,
} from '../actions/Todos';
import { action } from '../models/reducerAction';
import { todo } from '../models/todo';

export const todosReducer = (state: todo[] = [], action: action): todo[] => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo!]);
    case TOGGLE_TODO:
      return state.map((todo) => {
        return todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete });
      }) as unknown as todo[];
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case CLEAR_TODO:
      return state.filter((todo) => todo.complete !== true);
    case RECEIVE_DATA:
      return action.todos as unknown as todo[];
    default:
      return state;
  }
};
