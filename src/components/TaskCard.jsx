import { useState } from "react";

function TaskCard({ task, deleteTask, moveTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const saveEdit = () => {
    if (newText.trim() !== "") {
      editTask(task.id, newText);
    }
    setIsEditing(false);
  };

  return (
    <div className={`task-card ${task.priority.toLowerCase()}`}>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveEdit();
            }
          }}
          autoFocus
        />
      ) : (
        <h3 onClick={() => setIsEditing(true)}>
          {task.text}
        </h3>
      )}

      <p className="priority">
        Priority: <strong>{task.priority}</strong>
      </p>

      <div className="buttons">
        {task.status !== "done" && (
          <button onClick={() => moveTask(task.id)}>
            Move →
          </button>
        )}

        <button
          className="delete-btn"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;