import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FilterType} from '../types';

const initialState: {value: FilterType} = {
  value: {},
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFirstFilter: (state, action: PayloadAction<{firstFilter: string}>) => {
      state.value = {firstFilter: action.payload.firstFilter};
    },
    setSecondFilter: (state, action: PayloadAction<{secondFilter: string}>) => {
      state.value = {...state.value, secondFilter: action.payload.secondFilter};
    },
    deleteFirstFilter: state => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state.value = {};
    },
    deleteSecondFilter: state => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state.value = {...state.value, secondFilter: undefined};
    },
    updateFilter: (
      state,
      action: PayloadAction<{filter: FilterType | null}>,
    ) => {
      state.value = {...action.payload.filter};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFirstFilter,
  setSecondFilter,
  deleteFirstFilter,
  deleteSecondFilter,
  updateFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
