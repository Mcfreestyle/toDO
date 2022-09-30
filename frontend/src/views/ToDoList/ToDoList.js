import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import request from "services/request";
import Main from "components/common/Main";
import TasksSection from "components/common/TasksSection/TasksSection";
import { divideTasksByDuedate } from "services/functions";

export default function ToDoList() {
  const [tasks, setTasks] = useState([[], []]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const params = useParams();
  const path = `lists/${params.listId}/tasks?status=false`;

  useEffect(() => {
    async function getData() {
      const list_tasks = await request({ path });
      setTasks(divideTasksByDuedate(list_tasks));
    }
    getData();
  }, [path, params, openSnackBar]);

  const content = (
    <TasksSection 
      tasks={tasks}
      handleSnackBar={{
        openSnackBar,
        setOpenSnackBar,
        message: "Tarea completada"
      }}
    />
  );

  return (
    <Main content={content}/>
  );
}
