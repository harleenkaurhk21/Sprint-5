import { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import Column from "./components/Column";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanbanTasks");
    return saved
      ? JSON.parse(saved)
      : {
          todo: [],
          progress: [],
          done: [],
        };
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, priority) => {
    const newTask = {
      id: Date.now(),
      text,
      priority,
    };

    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  const deleteTask = (column, id) => {
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== id),
    }));
  };

  const moveTask = (from, to, task) => {
    setTasks((prev) => ({
      ...prev,
      [from]: prev[from].filter((t) => t.id !== task.id),
      [to]: [...prev[to], task],
    }));
  };

  const editTask = (column, id, newText) => {
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].map((task) =>
        task.id === id ? { ...task, text: newText } : task
      ),
    }));
  };

  const filteredTasks = (column) =>
    tasks[column].filter((task) =>
      task.text.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="container">
      <h1>React Kanban Board</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <AddTask addTask={addTask} />

      <div className="board">
        <Column
          title="To Do"
          column="todo"
          tasks={filteredTasks("todo")}
          deleteTask={deleteTask}
          moveTask={moveTask}
          editTask={editTask}
        />

        <Column
          title="In Progress"
          column="progress"
          tasks={filteredTasks("progress")}
          deleteTask={deleteTask}
          moveTask={moveTask}
          editTask={editTask}
        />

        <Column
          title="Done"
          column="done"
          tasks={filteredTasks("done")}
          deleteTask={deleteTask}
          moveTask={moveTask}
          editTask={editTask}
        />
      </div>
    </div>
  );
}