import { combineReducers } from 'redux';

export const update_data_Reducer = (state = [{ data: 'Item1' }, { data: 'Item2' }, { data: 'Item3' }], action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return [...state] = action.value;
    default:
      return state;
  }
};

export const update_OtherValue_Reducer = (state = { otherValue: 'Initial Value' }, action) => {

  switch (action.type) {
    case 'UPDATE_OTHERVALUE':
      const newState = { ...state, ...action.value };
      return newState;
    default:
      return state;
  }
};

export const update_rowData_Reducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_ROWDATA':
      const newState = [...state, ...action.value];
      return newState;
    default:
      return state;
  }
};

export const reducers = combineReducers({
  data: update_data_Reducer,
  otherValue: update_OtherValue_Reducer,
  rowData: update_rowData_Reducer
});

export default reducers;