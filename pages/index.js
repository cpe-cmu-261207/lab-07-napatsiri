import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [todos, setTodo] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    const todosStr = JSON.stringify(todos);
    localStorage.setItem("todo-react", todosStr);
  }, [todos]);

  useEffect(() => {
    const todoStr = localStorage.getItem("todo-react");
    if (!todoStr) setTodo([]);
    else setTodo(JSON.parse(todoStr));
  }, []);

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    // const newTodo = { ...todos };
    setTodo([...todos]);
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed;
    setTodo([...todos]);
  };

  const moveUp = (idx) => {
    if (idx == 0) return;
    let temp = todos[idx];
    todos[idx] = todos[idx - 1];
    todos[idx - 1] = temp;
    setTodo([...todos]);
  };

  const moveDown = (idx) => {
    if (idx == todos.length - 1) return;
    let temp = todos[idx];
    todos[idx] = todos[idx + 1];
    todos[idx + 1] = temp;
    setTodo([...todos]);
  };

  const addTodo = (title, completed) => {
    setTodo([{ title: title, completed: completed }, ...todos]);
  };

  const handleInput = (event) => {
    if (event.key == "Enter") {
      if (event.target.value === "") {
        alert("Todo cannot be empty");
        return;
      }
      addTodo(event.target.value, false);
      event.target.value = "";
    }
  };

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onKeyUp={handleInput}
        />
        {todos.map((element, index) => (
          <Todo
            key={index}
            title={element.title}
            completed={element.completed}
            onMark={() => markTodo(index)}
            onDelete={() => deleteTodo(index)}
            onMoveUp={() => moveUp(index)}
            onMoveDown={() => moveDown(index)}
          />
        ))}

        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">
            Pending ({todos.filter((el) => el.completed == false).length})
          </span>
          <span className="text-success">
            Completed ({todos.filter((el) => el.completed == true).length})
          </span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Napatsiri Phetsri 640612181
        </p>
      </div>
    </div>
  );
}
