import { RECEIVE_DATA } from '../actions/Todos';
import { action } from '../models/reducerAction';

export const loadingReducer = (state: boolean = true, action: action) => {
  switch (action.type) {
    case RECEIVE_DATA:
      return false;
    default:
      return state;
  }
};
