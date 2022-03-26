import { createSlice } from "@reduxjs/toolkit";

export const GeneralSlice = createSlice({
  name: "general",
  initialState: {
    sliderToggle: false,
  },
  reducers: {
    slider: (state, action) => {
      state.sliderToggle = !state.sliderToggle;
    },
  },
});

export const { slider } = GeneralSlice.actions;
export default GeneralSlice.reducer;
