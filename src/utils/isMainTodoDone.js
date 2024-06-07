export const isTodoCompleted = (todos, todoId, setTodos) => {
  const updatedTodos = todos.map((todo) => {
    if (todoId === todo.id) {
      return {
        ...todo,
        isCompleted: !todo.isCompleted,
      };
    } else {
      return todo;
    }
  });
  setTodos(updatedTodos);
};
