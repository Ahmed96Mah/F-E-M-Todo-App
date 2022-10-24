import { todo } from './todo';

export type state = {
  todos: todo[];
  filter: string;
  theme: string;
};
