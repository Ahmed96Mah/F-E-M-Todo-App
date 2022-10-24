export const SET_FILTER = 'SET_FILTER';

export const setFilter = (filter: string) => {
  return {
    type: SET_FILTER,
    filter,
  };
};
