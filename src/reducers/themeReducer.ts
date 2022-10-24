import { SET_THEME } from '../actions/theme';
import { action } from '../models/reducerAction';

export const themeReducer = (state = 'light', action: action) => {
  switch (action.type) {
    case SET_THEME:
      return action.theme;
    default:
      return state;
  }
};
