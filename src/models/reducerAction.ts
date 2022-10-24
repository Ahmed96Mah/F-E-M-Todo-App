import { todo } from './todo';
export type action = {
  type: string;
  id?: string;
  todo?: todo;
  filter?: string;
  theme?: string;
  todos?: todo[];
};
