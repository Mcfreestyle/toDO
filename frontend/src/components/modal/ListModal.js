import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box'
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';

import { useAuthContext } from 'contexts/authContext';
import request from 'services/request';

export default function ListModal() {
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");
  const {user} = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  async function createList() {
    if (listName === "") return;

    const body = {
      name: listName
    };
    await request({ method: "POST", path: `users/${user.id}/lists`, body});
    setOpen(false);
    navigate(location.pathname);
  }

  return (
    <>
      <IconButton
        color="primary"
        aria-label="add list"
        sx={{ marginLeft: 2 }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              '& .MuiTextField-root': { width: '40ch' },
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nueva lista"
              helperText={listName === "" ? "Ingrese nombre de lista" : ""}
              value={listName}
              onChange={(event) => setListName(event.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={createList}>Añadir</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
