import React, { useEffect, useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((tasks) => {
        setTasks(tasks);
      });
  }, []);

  return (
    <main>
      {tasks.map((task) => (
        <span className="task" key={task.id}>
          {task.description}
        </span>
      ))}
    </main>
  );
};

export default App;
