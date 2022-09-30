import * as React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import TaskModal from 'components/modal/TaskModal';
import request from 'services/request';
import { toISOString } from 'services/functions';

function TasksSection({ tasks, handleSnackBar }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentTask, setCurrentTask] = useState({});
  const [taskName, setTaskName] = useState('');
  const [date, setDate] = useState(dayjs());
  const [listName, setListName] = useState('');
  const { lists } = useOutletContext(); 
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  async function handleToggle(task) {
    const body = {
      status: String(!task.status),
      due_date : toISOString(new Date(task.due_date))
    };

    await request({ method: 'PUT', path: `tasks/${task.id}`, body })
    handleSnackBar.setOpenSnackBar(true);
  }

  function validate(inputs) {
    const errorsList = {};

    if (inputs.taskName === "") {
      errorsList.taskName = "Ingrese nombre de tarea";
    }
    return errorsList;
  }

  async function updateTask() {
    const inputs = { taskName, date, listName };
    const result = validate(inputs);

    setErrors(result);
    if (Object.keys(result).length) {
      return;
    }

    const todoList = lists.find((list) => list.name === listName);
    const body = {
      name: taskName,
      due_date: toISOString(date),
      status: String(currentTask.status),
      todo_list_id: todoList.id,
    };

    await request({ method: 'PUT', path: `tasks/${currentTask.id}`, body })
    closeModal();
  }

  async function openModal(task) {
    for (const list of lists) {
      if (list.id === task.todo_list_id) {
        setListName(list.name);
      }
    }
    setCurrentTask(task);
    setTaskName(task.name);
    setDate(new Date(task.due_date));
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setErrors({});
    setTaskName('');
    setDate(dayjs());
    navigate(pathname);
  }

  async function deleteTask(task) {
    await request({ method: 'DELETE', path: `tasks/${task.id}` });
    navigate(pathname);
  }

  function printListName(listId) {
    const list = lists.find((list) => list.id === listId);
    if (list && (pathname === '/' || pathname === '/completed')) {
      return ' - ' + list.name;
    }
    return '';
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, maxWidth: 752, margin: "auto" }}>
        <Grid container>
          {tasks.map((tasksGroup, index) => {
            let grid;
            if (tasksGroup.length) {
              let title = "";
              if (pathname === '/completed') {
                title = "Tareas completadas";
              } else {
                title = index === 0 ? "Tareas vencidas" : "Tareas pendientes";
              }
              grid = (
                <Grid key={index} item xs={12}>
                  <Typography
                    sx={{ textAlign: "center" }}
                    variant="h6"
                    component="div"
                  >
                    {title}
                  </Typography>
                  <List sx={{ width: '100%', maxWidth: 450, margin: 'auto' }}>
                    {tasksGroup.map((task) => {
                      const labelId = `checkbox-list-label-${task.id}`;
                      return (
                        <ListItem
                          key={task.id}
                          secondaryAction={
                            <>
                              <Checkbox
                                edge="start"
                                onChange={() => handleToggle(task)}
                                checked={JSON.parse(task.status)}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                              <IconButton
                                edge="end"
                                aria-label="comments"
                                onClick={() => deleteTask(task)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          }
                          sx={{ bgcolor: '#75FF72', mb: 1, borderRadius: 2 }}
                          disablePadding
                        >
                          <ListItemButton
                            sx={{ pr: '100px' }}
                            role={undefined}
                            dense
                            onClick={() => openModal(task)}
                          >
                            <ListItemText
                              id={labelId}
                              primary={task.name}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="caption"
                                    color="text.primary"
                                  >
                                    {task.due_date}
                                  </Typography>
                                  {printListName(task.todo_list_id)}
                                </React.Fragment>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Grid>
              );
            } else {
              grid = (<div key={index}></div>);
            }
            return (grid);
          })}
        </Grid>
      </Box>
      <TaskModal
        handleModal={{ open, closeModal }}
        lists={lists}
        errors={errors}
        inputStates={{
          taskName,
          setTaskName,
          date,
          setDate,
          listName,
          setListName
        }}
        handleClick={updateTask}
        titleButton="Actualizar"
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        open={handleSnackBar.openSnackBar}
        onClose={() => handleSnackBar.setOpenSnackBar(false)}
      >
        <Alert severity="success">{handleSnackBar.message}</Alert>
      </Snackbar>
    </>
  );
}
export default React.memo(TasksSection);
