import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./reducer/Categories.reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { Middleware } from "redux";
import expensesReducer from "@/store/reducer/Expenses.reducer";

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log("Dispatching:", action);
  const result = next(action);
  console.log("Next state:", store.getState());
  return result;
};

// Combine reducers
const rootReducer = combineReducers({
  expenses: expensesReducer,
  categories: categoriesReducer, // Fixed spelling mistake here
});

// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Create store with middleware
export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: true }).concat(loggerMiddleware),
  });

// Define AppDispatch for typed dispatch
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];

// Create wrapper for Next.js
export const wrapper = createWrapper(makeStore);

// Typed selector and dispatch hooks
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>(); // Fixed the typing here
