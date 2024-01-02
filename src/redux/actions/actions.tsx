import { ThunkAction } from "redux-thunk";
import { RootState } from "../store/store";
import { Action } from "redux";
import axios from "axios";
import { setCategoryData } from "../slice/categorySlice";

export const fetchCategoryData = (
  label: string
): ThunkAction<void, RootState, unknown, Action> => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/category/${label}`
      );
      const data = response.data;
      dispatch(setCategoryData({ label, data }));
    } catch (error) {
      // Handle errors
    }
  };
};

export const fetchProductsData = (
  label: string
): ThunkAction<void, RootState, unknown, Action> => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/${label}`
      );
      const data = response.data;
      dispatch(setCategoryData({ label, data }));
    } catch (error) {
      // Handle errors
    }
  };
};
