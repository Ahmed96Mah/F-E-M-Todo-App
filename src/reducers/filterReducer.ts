import { action } from '../models/reducerAction';
import { SET_FILTER } from '../actions/filter';

export const filterReducer = (state = 'all', actions: action) => {
  switch (actions.type) {
    case SET_FILTER:
      return actions.filter;
    default:
      return state;
  }
};
