import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function TaskModal({
  handleModal,
  lists,
  errors,
  inputStates,
  handleClick,
  titleButton
})
{
  return (
    <Dialog open={handleModal.open} onClose={handleModal.closeModal}>
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
            label="Nueva tarea"
            helperText={errors.taskName ? errors.taskName : ""}
            value={inputStates.taskName}
            onChange={(event) => inputStates.setTaskName(event.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField margin="dense" {...props} />}
              label="Fecha de vencimiento"
              value={inputStates.date}
              onChange={(newDate) => {
                inputStates.setDate(newDate);
              }}
              inputFormat="DD/MM/YYYY hh:mm a"
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            id="lista"
            select
            label="Lista"
            value={inputStates.listName}
            onChange={(event) => inputStates.setListName(event.target.value)}
          >
            {lists.map((list) => (
              <MenuItem key={list.id} value={list.name}>
                {list.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModal.closeModal}>Cancelar</Button>
        <Button onClick={handleClick}>{titleButton}</Button>
      </DialogActions>
    </Dialog>
  );
}
