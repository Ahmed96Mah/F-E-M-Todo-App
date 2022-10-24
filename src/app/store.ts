import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { todosReducer } from '../reducers/todosReducer';
import { filterReducer } from '../reducers/filterReducer';
import { themeReducer } from '../reducers/themeReducer';
import { loadingReducer } from '../reducers/loadingReducer';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
    theme: themeReducer,
    loading: loadingReducer,
  },
  //@ts-ignore
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
