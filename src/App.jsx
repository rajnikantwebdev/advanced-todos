import { useEffect, useRef, useState } from "react";
import TodoList from "./components/TodoList";
// import { addSubTodo } from "./utils/addSubTodo";
import { isTodoCompleted } from "./utils/isMainTodoDone";
import { useDispatch } from "react-redux";
import { addTodo } from "./utils/todoStore";
import { useSelector } from "react-redux";
import { removeTodo } from "./utils/todoStore";
import { toggleTodo, addSubTodo } from "./utils/todoStore";

function App() {
  const [value, setValue] = useState("");
  const [isTodoDone, setIsTodoDone] = useState(false);
  const [addSubTodd, setAddSubTodo] = useState(false);
  const [subTodoValue, setSubTodoValue] = useState("");
  const [currentMainTodoId, setCurrentMainTodoId] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.value);

  const handleAddTodo = () => {
    dispatch(addTodo({ value: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value !== "") {
      handleAddTodo();
      setValue("");
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddSubTodo = () => {
    if (subTodoValue !== "" && currentMainTodoId !== null) {
      dispatch(addSubTodo({ id: currentMainTodoId, value: subTodoValue }));
      setSubTodoValue("");
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center w-full">
      {/* sub-todos */}
      {addSubTodd && (
        <div className="fixed z-10  px-6 py-9 min-w-[50%] min-h-[50%] bg-sixty">
          <div className="flex bg-yellow-400 items-center h-20">
            <input
              value={subTodoValue}
              onChange={(e) => setSubTodoValue(e.target.value)}
              type="text"
              className="h-full px-4 w-full focus:outline-none drop-shadow-lg bg-thirty text-white text-2xl"
              placeholder="Add a sub todo"
            />
            <button
              className="px-6 py-4 bg-ten h-full"
              onClick={handleAddSubTodo}
            >
              Add
            </button>
          </div>
          <div className="absolute bottom-10">
            <button
              onClick={() => setAddSubTodo(false)}
              className="bg-red-400 px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* sub-todos */}
      <div className="px-12 py-4 ">
        <h1 className="text-9xl font-bold italic text-ten">Todo</h1>
      </div>
      <div className="w-1/2 mb-4">
        <input
          onKeyDown={handleKeyDown}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className="px-4 py-6 w-full focus:outline-none drop-shadow-lg bg-thirty text-white text-2xl"
          placeholder="What needs to be done?"
        />
      </div>
      <div className="w-1/2">
        {todos.length !== 0 ? (
          todos?.map((todo) => {
            return (
              <TodoList
                key={todo.id}
                todo={todo}
                setIsTodoDone={setIsTodoDone}
                isTodoCompleted={toggleTodo}
                removeTodos={removeTodo}
                setAddSubTodo={setAddSubTodo}
                setCurrentMainTodoId={setCurrentMainTodoId}
                updateTodoText={(id, newText) =>
                  dispatch(updateTodo({ id, newText }))
                }
              />
            );
          })
        ) : (
          <div className="text-center">
            <span className="text-ten text-3xl italic">Nothing to do?</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
