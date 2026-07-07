import TaskCard from "./TaskCard";

function Column({
  title,
  column,
  tasks,
  deleteTask,
  moveTask,
  editTask,
}) {
  return (
    <div className="column">
      <h2>{title}</h2>

      {tasks.length === 0 ? (
        <p className="empty">No Tasks</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            column={column}
            deleteTask={deleteTask}
            moveTask={moveTask}
            editTask={editTask}
          />
        ))
      )}
    </div>
  );
}

export default Column;