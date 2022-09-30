import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Main from 'components/common/Main';
import request from 'services/request';
import { useAuthContext } from 'contexts/authContext';
import TasksSection from 'components/common/TasksSection/TasksSection';
import { divideTasksByDuedate } from 'services/functions';

export default function Home() {
  const [tasks, setTasks] = useState([[], []]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const { user } = useAuthContext();
  const params = useParams();
  const path = `users/${user.id}/tasks?status=false`;

  useEffect(() => {
    async function getData() {
      const allTasks = await request({ path });
      setTasks(divideTasksByDuedate(allTasks));
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
    <Main content={content} />
  );
}
