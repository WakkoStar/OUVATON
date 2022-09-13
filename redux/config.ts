import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BaseSearch, LatLng, RankBy} from '../types';

const initialState: BaseSearch = {
  location: {
    lat: NaN,
    lng: NaN,
  },
  radius: 50000,
  type: '',
  keyword: '',
  rankby: 'prominence',
  pagetoken: '',
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    updateLocation: (state, action: PayloadAction<{location: LatLng}>) => {
      state.location = action.payload.location;
    },
    updateRadius: (state, action: PayloadAction<{radius: number}>) => {
      state.radius = action.payload.radius;
    },
    updateRankBy: (state, action: PayloadAction<{rankby: RankBy}>) => {
      state.rankby = action.payload.rankby;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateLocation, updateRadius, updateRankBy} = configSlice.actions;

export default configSlice.reducer;
