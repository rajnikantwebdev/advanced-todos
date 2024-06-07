import { useState } from "react";
import { useDispatch } from "react-redux";
import { editSubTodo, markSubTodoAsComplete } from "../utils/todoStore";

const SubTodoList = ({ subTodo, mainTodoId, removeSubTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(subTodo?.value);
  const dispatch = useDispatch();

  // Function to handle updating the text of a sub-todo
  const handleUpdateText = () => {
    if (newText !== "") {
      dispatch(editSubTodo({ id: mainTodoId, subTodoId: subTodo.id, newText }));
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`max-w-96 px-4 flex justify-between items-center py-2 bg-ten border border-black cursor-pointer ${
        subTodo.isCompleted ? "bg-ten bg-opacity-50" : "bg-ten"
      } `}
    >
      {!isEditing ? (
        <div
          onDoubleClick={() =>
            subTodo.isCompleted === false && setIsEditing(true)
          }
          className="flex items-center gap-4"
        >
          <div>
            {/* Checkbox to mark sub-todo as completed */}
            <input
              type="checkbox"
              name="todo"
              id={`todo-${subTodo.id}`}
              checked={subTodo?.isCompleted}
              onChange={() =>
                dispatch(
                  markSubTodoAsComplete({
                    id: mainTodoId,
                    subTodoId: subTodo.id,
                  })
                )
              }
              className="regular-checkbox hidden"
            />
            <label htmlFor={`todo-${subTodo.id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={"black"}
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
          {/* Display sub-todo text */}
          <span>{subTodo?.value}</span>
        </div>
      ) : (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleUpdateText}
          onKeyDown={(e) => e.key === "Enter" && handleUpdateText()}
          className="h-full px-4 py-2 w-full focus:outline-none bg-white text-black italic text-xl"
        />
      )}
      {/* Button to remove sub-todo */}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
          onClick={removeSubTodo}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>
    </div>
  );
};

export default SubTodoList;
