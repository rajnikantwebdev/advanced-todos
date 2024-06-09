import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import { useDispatch } from "react-redux";
import { addTodo, removeTodo, toggleTodo, addSubTodo } from "./utils/todoStore";
import { useSelector } from "react-redux";

function App() {
  // State to manage the new todo input value
  const [value, setValue] = useState("");
  // State to manage the visibility of the add sub-todo modal
  const [addSubTodd, setAddSubTodo] = useState(false);
  // State to manage the new sub-todo input value
  const [subTodoValue, setSubTodoValue] = useState("");
  // State to keep track of the current main todo id for adding sub-todos
  const [currentMainTodoId, setCurrentMainTodoId] = useState(null);
  const [priority, setPriority] = useState(null);
  // useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch();
  // useSelector hook to select the todos state from the Redux store
  const todos = useSelector((state) => state.todos.value);

  // Function to handle adding a new todo
  const handleAddTodo = () => {
    dispatch(addTodo({ value: value }));
  };

  // Function to handle key down event for the new todo input
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value !== "" && priority !== null) {
      handleAddTodo();
      setValue("");
    }
  };

  // Function to handle adding a new sub-todo
  const handleAddSubTodo = () => {
    if (subTodoValue !== "" && currentMainTodoId !== null) {
      dispatch(addSubTodo({ id: currentMainTodoId, value: subTodoValue }));
      setSubTodoValue("");
    }
  };

  // useEffect hook to store todos in localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  console.log("priority: ", priority);
  return (
    <section className="min-h-screen flex flex-col justify-center items-center w-full">
      {/* Sub-todo modal */}
      {addSubTodd && (
        <div className="fixed z-10 px-6 py-9 min-w-[50%] min-h-[50%] bg-sixty">
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
      {/* End of sub-todo modal */}

      {/* Title section */}
      <div className="px-12 py-4 ">
        <h1 className="text-9xl font-bold italic text-ten">Todo</h1>
      </div>

      {/* New todo input */}
      <div className="w-1/2 mb-4">
        <input
          onKeyDown={handleKeyDown}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className="px-4 py-6 w-full focus:outline-none drop-shadow-lg bg-thirty text-white text-2xl"
          placeholder="What needs to be done?"
        />
        <div className="w-full bg-thirty flex items-center px-4 py-6 gap-8">
          <div>
            <input
              value={"High"}
              onChange={(e) => setPriority(e.target.value)}
              type="radio"
              name="priority"
              id="radioHigh"
              className="hidden"
            />
            <label
              htmlFor="radioHigh"
              className="text-ten px-2 py-1 border border-ten rounded-3xl"
            >
              High
            </label>
          </div>
          <div>
            <input
              value={"Medium"}
              onChange={(e) => setPriority(e.target.value)}
              type="radio"
              name="priority"
              id="radioMedium"
              className="hidden"
            />
            <label
              htmlFor="radioMedium"
              className="text-ten px-2 py-1 border border-ten rounded-3xl"
            >
              Medium
            </label>
          </div>
          <div>
            <input
              onChange={(e) => setPriority(e.target.value)}
              value={"Low"}
              type="radio"
              name="priority"
              id="radioLow"
              className="hidden"
            />
            <label
              htmlFor="radioLow"
              className="text-ten px-2 py-1 border border-ten rounded-3xl"
            >
              Low
            </label>
          </div>
        </div>
      </div>

      {/* Todo list */}
      <div className="w-1/2">
        {todos.length !== 0 ? (
          todos?.map((todo) => {
            return (
              <TodoList
                key={todo.id}
                todo={todo}
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
