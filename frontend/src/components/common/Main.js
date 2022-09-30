import { useOutletContext } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

export default function Main({ content }) {
  const { drawerWidth, sidebarOpen } = useOutletContext();

  const MyMain = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  return (
    <MyMain open={sidebarOpen}>
      <Toolbar />
      {content}
    </MyMain>
  );
}
