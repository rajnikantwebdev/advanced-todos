import { configureStore } from "@reduxjs/toolkit";
import todoStore from "../utils/todoStore";

export default configureStore({
  reducer: {
    todos: todoStore,
  },
});
