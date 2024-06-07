import { createSlice } from "@reduxjs/toolkit";

const loadTodos = () => {
  try {
    const serializedTodos = localStorage.getItem("todos");
    if (serializedTodos === null) {
      return [];
    }
    return JSON.parse(serializedTodos);
  } catch (e) {
    console.error("Could not load todos from localStorage", e);
    return [];
  }
};

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    value: loadTodos(),
  },

  reducers: {
    addTodo: (state, action) => {
      state.value.push({
        id: Math.floor(Date.now() * Math.random()),
        value: action.payload.value,
        isCompleted: false,
        isSubTodo: false,
        subTodo: [],
      });
    },

    removeTodo: (state, action) => {
      const filteredState = state.value.filter(
        (todo) => todo.id !== action.payload.id
      );
      state.value = filteredState;
    },

    toggleTodo: (state, action) => {
      const updatedTodo = state.value.map((todo) => {
        if (todo.id === action.payload.id) {
          const newIsCompleted = !todo.isCompleted;
          return {
            ...todo,
            isCompleted: newIsCompleted,
            subTodo: todo.subTodo.map((subTodo) => ({
              ...subTodo,
              isCompleted: newIsCompleted,
            })),
          };
        } else {
          return todo;
        }
      });

      state.value = updatedTodo;
    },

    addSubTodo: (state, action) => {
      const upadtedTodo = state.value.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            subTodo: [
              ...todo.subTodo,
              {
                id: Math.floor(Date.now() * Math.random()),
                value: action.payload.value,
                isCompleted: false,
              },
            ],
          };
        } else {
          return todo;
        }
      });

      state.value = upadtedTodo;
    },

    updateTodoText: (state, action) => {
      const { id, newText } = action.payload;
      const updatedTodos = state.value.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value: newText };
        } else {
          return todo;
        }
      });

      state.value = updatedTodos;
    },

    removeSubTodo: (state, action) => {
      const { id, subTodoId } = action.payload;
      const updatedTodos = state.value.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            subTodo: todo.subTodo.filter((sub) => sub.id !== subTodoId),
          };
        } else {
          return todo;
        }
      });

      state.value = updatedTodos;
    },

    editSubTodo: (state, action) => {
      const { id, subTodoId, newText } = action.payload;
      const updatedTodo = state.value.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            subTodo: todo.subTodo.map((sub) => {
              if (sub.id === subTodoId) {
                return {
                  ...sub,
                  value: newText,
                };
              } else {
                return sub;
              }
            }),
          };
        } else {
          return todo;
        }
      });

      state.value = updatedTodo;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  toggleTodo,
  addSubTodo,
  updateTodoText,
  removeSubTodo,
  editSubTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
