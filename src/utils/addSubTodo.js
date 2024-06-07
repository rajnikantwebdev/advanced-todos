export const addSubTodo = (id, todos, value, isCompleted, setTodos) => {
  const updatedTodo = todos.map((todo) => {
    if (id === todo.id) {
      return {
        ...todo,
        isSubTodo: true,
        subTodo: [
          ...todo.subTodo,
          {
            id: Math.floor(Date.now() * Math.random()),
            value: value,
            isCompleted: isCompleted,
          },
        ],
      };
    } else {
      return todo;
    }
  });

  setTodos(updatedTodo);
};
