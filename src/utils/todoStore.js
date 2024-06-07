import { createSlice } from "@reduxjs/toolkit";

// Function to load todos from localStorage
// This function attempts to retrieve and parse the todos stored in localStorage.
// If no todos are found, it returns an empty array. If an error occurs, it logs the error and returns an empty array.
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

// Create a Redux slice for todos
// This slice manages the state of todos including their creation, deletion, and modification.
export const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    value: loadTodos(), // Initialize state with todos loaded from localStorage
  },

  reducers: {
    // Add a new todo
    // This reducer adds a new todo item to the state with a unique id, value from action payload, and default properties.
    addTodo: (state, action) => {
      state.value.push({
        id: Math.floor(Date.now() * Math.random()), // Generate a unique id for the new todo
        value: action.payload.value, // Set the value of the todo from action payload
        isCompleted: false, // Initialize the todo as not completed
        subTodo: [], // Initialize an empty array for potential subTodos
      });
    },

    // Remove an existing todo by id
    // This reducer removes a todo item from the state based on the id provided in the action payload.
    removeTodo: (state, action) => {
      const filteredState = state.value.filter(
        (todo) => todo.id !== action.payload.id
      );
      state.value = filteredState; // Update the state with the filtered todos
    },

    // Toggle the completion status of a todo and its subtodos
    // This reducer toggles the isCompleted status of a todo and its subTodos based on the id provided in the action payload.
    toggleTodo: (state, action) => {
      const updatedTodo = state.value.map((todo) => {
        if (todo.id === action.payload.id) {
          const newIsCompleted = !todo.isCompleted; // Toggle the completion status
          return {
            ...todo,
            isCompleted: newIsCompleted, // Update the main todo's completion status
            subTodo: todo.subTodo.map((subTodo) => ({
              ...subTodo,
              isCompleted: newIsCompleted, // Update the subTodos' completion status
            })),
          };
        } else {
          return todo; // Return the todo as is if it doesn't match the id
        }
      });

      state.value = updatedTodo; // Update the state with the modified todos
    },

    // Add a new subTodo to an existing todo by id
    // This reducer adds a subTodo to a specific todo item based on the id provided in the action payload.
    addSubTodo: (state, action) => {
      const updatedTodo = state.value.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            subTodo: [
              ...todo.subTodo,
              {
                id: Math.floor(Date.now() * Math.random()), // Generate a unique id for the new subTodo
                value: action.payload.value, // Set the value of the subTodo from action payload
                isCompleted: false, // Initialize the subTodo as not completed
              },
            ],
          };
        } else {
          return todo; // Return the todo as is if it doesn't match the id
        }
      });

      state.value = updatedTodo; // Update the state with the modified todos
    },

    // Update the text of an existing todo by id
    // This reducer updates the value of a specific todo based on the id and new text provided in the action payload.
    updateTodoText: (state, action) => {
      const { id, newText } = action.payload;
      const updatedTodos = state.value.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value: newText }; // Update the text of the matched todo
        } else {
          return todo; // Return the todo as is if it doesn't match the id
        }
      });

      state.value = updatedTodos; // Update the state with the modified todos
    },

    // Remove a subTodo from an existing todo by id
    // This reducer removes a subTodo from a specific todo item based on the ids provided in the action payload.
    removeSubTodo: (state, action) => {
      const { id, subTodoId } = action.payload;
      const updatedTodos = state.value.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            subTodo: todo.subTodo.filter((sub) => sub.id !== subTodoId), // Filter out the subTodo with the matching subTodoId
          };
        } else {
          return todo; // Return the todo as is if it doesn't match the id
        }
      });

      state.value = updatedTodos; // Update the state with the modified todos
    },

    // Edit the text of a subTodo by id
    // This reducer updates the value of a specific subTodo within a todo item based on the ids and new text provided in the action payload.
    editSubTodo: (state, action) => {
      const { id, subTodoId, newText } = action.payload;
      const updatedTodo = state.value.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            subTodo: todo.subTodo.map((sub) => {
              if (sub.id === subTodoId && todo.isCompleted === false) {
                return {
                  ...sub,
                  value: newText, // Update the text of the matched subTodo
                };
              } else {
                return sub; // Return the subTodo as is if it doesn't match the subTodoId
              }
            }),
          };
        } else {
          return todo; // Return the todo as is if it doesn't match the id
        }
      });

      state.value = updatedTodo; // Update the state with the modified todos
    },

    markSubTodoAsComplete: (state, action) => {
      const { id, subTodoId } = action.payload;
      // Map through todos to find the one that matches the provided id
      const updatedTodos = state.value.map((todo) => {
        if (todo.id === id) {
          // For the matched todo, map through its subTodos to find the one that matches subTodoId
          return {
            ...todo,
            subTodo: todo.subTodo.map((sub) => {
              // Toggle the isCompleted status of the matched subTodo if the main todo is not completed
              if (sub.id === subTodoId && todo.isCompleted === false) {
                return {
                  ...sub,
                  isCompleted: !sub.isCompleted,
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
      // Update the state with the modified todos list
      state.value = updatedTodos;
    },
  },
});

// Export actions and reducer
// These exports allow the actions and the reducer to be used in other parts of the application.
export const {
  addTodo,
  removeTodo,
  toggleTodo,
  addSubTodo,
  updateTodoText,
  removeSubTodo,
  editSubTodo,
  markSubTodoAsComplete,
} = todoSlice.actions;
export default todoSlice.reducer;
