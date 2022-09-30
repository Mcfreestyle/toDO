import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import { Box } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

import Aside from "./Aside";
import Header from "./Header";
import { useAuthContext } from "contexts/authContext";
import request from "services/request";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const params = useParams();
  const { user } = useAuthContext();
  const drawerWidth = 240;

  useEffect(() => {
    async function getData() {
      const todoLists = await request({path: `users/${user.id}/lists`});
      setLists(todoLists);
    }
    getData();
  }, [user, params]);
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header
        handleSidebar={{sidebarOpen, setSidebarOpen}}
        lists={lists}
      />
      <Aside
        drawerWidth={drawerWidth}
        handleSidebar={{sidebarOpen}}
        lists={lists}
      />
      <Outlet
        context={{drawerWidth, sidebarOpen, lists}}
      />
    </Box>
  );
}
