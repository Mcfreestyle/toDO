import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Main from "components/common/Main";
import TasksSection from "components/common/TasksSection/TasksSection";
import { useAuthContext } from "contexts/authContext";
import request from "services/request";

export default function Completed() {
  const [tasks, setTasks] = useState([[]]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const { user } = useAuthContext();
  const params = useParams();
  const path = `users/${user.id}/tasks?status=true`;

  useEffect(() => {
    async function getData() {
      const true_tasks = await request({ path });
      setTasks([true_tasks]);
    }
    getData();
  }, [path, params, openSnackBar]);

  const content = (
    <TasksSection
      tasks={tasks}
      handleSnackBar={{
        openSnackBar,
        setOpenSnackBar,
        message: "Se deshizo tarea"
      }}
    />
  );

  return (
    <Main content={content}/>
  );
}
