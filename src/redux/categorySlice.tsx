import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  [key: string]: any;
}

const initialState: CategoryState = {};

const categorySlice = createSlice({
  name: "categoryData",
  initialState,
  reducers: {
    setCategoryData(
      state,
      action: PayloadAction<{ label: string; data: any }>
    ) {
      const { label, data } = action.payload;
      return {
        ...state,
        [label]: data,
      };
    },
  },
});

export const { setCategoryData } = categorySlice.actions;
export default categorySlice.reducer;
