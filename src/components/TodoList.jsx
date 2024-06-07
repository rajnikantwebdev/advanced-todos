import React, { useState } from "react";
import SubTodoList from "./subTodoList";
import { useDispatch } from "react-redux";
import { updateTodoText, removeSubTodo } from "../utils/todoStore";

const TodoList = ({
  todo,
  isTodoCompleted,
  removeTodos,
  setAddSubTodo,
  setCurrentMainTodoId,
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo?.value);

  // Function to handle updating the text of a todo
  const handleUpdateText = () => {
    if (newText !== "") {
      dispatch(updateTodoText({ id: todo.id, newText: newText }));
      setIsEditing(false);
    }
  };

  return (
    <>
      <div
        className={`w-full border border-gray-600 shadow-md flex items-center px-4 py-4 justify-between ${
          todo?.isCompleted ? "bg-thirty bg-opacity-50" : "bg-thirty"
        } group`}
      >
        <div className="flex items-center gap-8">
          <div>
            {/* Checkbox to mark todo as completed */}
            <input
              type="checkbox"
              name="todo"
              id={`todo-${todo.id}`}
              checked={todo?.isCompleted}
              onChange={() => dispatch(isTodoCompleted({ id: todo.id }))}
              className="regular-checkbox hidden"
            />
            <label htmlFor={`todo-${todo.id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={todo.isCompleted ? "#333333" : "#1ABC9C"}
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </label>
          </div>
          {!isEditing ? (
            // Display todo text and enable editing on double click if not completed
            <div
              onDoubleClick={() =>
                todo.isCompleted === false && setIsEditing(true)
              }
            >
              <span
                className={`text-2xl italic ${
                  todo?.isCompleted ? "text-thirty" : "text-ten"
                } `}
              >
                {todo?.value}
              </span>
            </div>
          ) : (
            // Input field for editing the todo text
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onBlur={handleUpdateText}
              onKeyDown={(e) => e.key === "Enter" && handleUpdateText()}
              className="h-full px-4 py-2 w-full focus:outline-none bg-white text-black italic text-xl"
            />
          )}
        </div>
        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
          {!todo?.isCompleted && (
            // Button to add a sub-todo
            <button
              onClick={() => {
                setAddSubTodo(true);
                setCurrentMainTodoId(todo.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#1ABC9C"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          )}
          {/* Button to remove the todo */}
          <button onClick={() => dispatch(removeTodos({ id: todo.id }))}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Display sub-todos if they exist */}
      {todo?.subTodo.length !== 0 &&
        todo.subTodo.map((sub) => {
          return (
            <SubTodoList
              key={sub.id}
              subTodo={sub}
              mainTodoId={todo.id}
              removeSubTodo={() =>
                dispatch(removeSubTodo({ id: todo.id, subTodoId: sub.id }))
              }
            />
          );
        })}
    </>
  );
};

export default TodoList;
