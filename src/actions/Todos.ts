import { todo } from '../models/todo';
import { action } from '../models/reducerAction';
import { Dispatch } from '@reduxjs/toolkit';
//@ts-ignore
import API from 'goals-todos-api';

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const CLEAR_TODO = 'CLEAR_TODO';
export const RECEIVE_DATA = 'RECEIVE_DATA';

// Action Creators
const addTodo = (todo: todo): action => {
  return {
    type: ADD_TODO,
    todo,
  };
};

const toggleTodo = (id: string): action => {
  return {
    type: TOGGLE_TODO,
    id,
  };
};

const removeTodo = (id: string): action => {
  return {
    type: REMOVE_TODO,
    id,
  };
};

export const clearTodo = (): action => {
  return {
    type: CLEAR_TODO,
  };
};

const receiveData = (todos: todo[]): action => {
  return {
    type: RECEIVE_DATA,
    todos,
  };
};

// Asynchronous Action Creators
export const handleAddTodo = (todo: string, callback: Function) => {
  return async (dispatch: Dispatch) => {
    try {
      const todoObject = await API.saveTodo(todo);
      dispatch(addTodo(todoObject));
      callback();
    } catch (err) {
      alert('Oops.. Something went wrong. Please try again!');
    }
  };
};

export const handleToggleTodo = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      // Using optimistic updates approach the store is updated first
      dispatch(toggleTodo(id));
      await API.saveTodoToggle(id);
    } catch (err) {
      alert('Oops.. Something went wrong. Please try again!');
      // In case of an error, revert the changes.
      dispatch(toggleTodo(id));
    }
  };
};

export const handleRemoveTodo = (todo: todo) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(removeTodo(todo.id));
      await API.deleteTodo(todo.id);
    } catch (err) {
      alert('Oops.. Something went wrong. Please try again!');
      dispatch(addTodo(todo));
    }
  };
};

export const handleReceiveData = () => {
  return async (dispatch: Dispatch) => {
    try {
      const todos = await API.fetchTodos();
      dispatch(receiveData(todos));
    } catch (err) {
      alert('Oops.. Something went wrong. Please refresh the page!');
    }
  };
};
