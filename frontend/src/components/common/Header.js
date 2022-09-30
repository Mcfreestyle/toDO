import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import TaskModal from 'components/modal/TaskModal';
import { useAuthContext } from 'contexts/authContext';
import request from 'services/request';
import { toISOString } from 'services/functions';

export default function Header({ handleSidebar, lists }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [taskName, setTaskName] = useState('');
  const [date, setDate] = useState(dayjs());
  const [listName, setListName] = useState('');
  const [currentList, setCurrentList] = useState({});
  const { logout } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const settings = ['Cerrar sesión'];

  function handleSidebarOpen() {
    const { sidebarOpen, setSidebarOpen } = handleSidebar;
    return sidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true);
  }

  useEffect(() => {
    if (params.listId) {
      const list = lists.find((list) => list.id === Number(params.listId));
      if (list) setListName(list.name);
      setCurrentList(list);
    } else {
      setListName("Default");
    }
  }, [lists, params]);

  function validate(inputs) {
    const errorsList = {};

    if (inputs.taskName === "") {
      errorsList.taskName = "Ingrese nombre de tarea";
    }
    return errorsList;
  }

  async function createTask() {
    const inputs = { taskName, date, listName };
    const result = validate(inputs);
    let listId, list;

    setErrors(result);
    if (Object.keys(result).length) {
      return;
    }

    list = lists.find((list) => list.name === inputs.listName);
    listId = list.id;

    const body = {
      name: taskName,
      due_date: toISOString(date)
    }
    await request({ method: 'POST', path: `lists/${listId}/tasks`, body })
    closeModal();
  }

  function closeModal() {
    setOpen(false);
    setErrors({});
    setTaskName('');
    setDate(dayjs());
    currentList.name ? setListName(currentList.name) : setListName("Default");
    navigate(location.pathname);
  }

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            onClick={() => handleSidebarOpen()}
            aria-label="open drawer"
            edge="start"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={() => setOpen(true)}>
              <AddCircleIcon sx={{ fontSize: 45 }} />
            </IconButton>
            <Tooltip title="Abrir ajustes">
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => logout()}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
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
        handleClick={createTask}
        titleButton="Añadir"
      />
    </>
  );
}
