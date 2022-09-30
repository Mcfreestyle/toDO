import { useNavigate } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import ListModal from 'components/modal/ListModal';

export default function Aside({ drawerWidth, handleSidebar, lists }) {
  const navigate = useNavigate();
  
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={handleSidebar.sidebarOpen}
    >
      <Toolbar />
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, marginTop: 15, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        <TreeItem nodeId="1" label="Listas de tareas">
          <TreeItem component="button" nodeId="3" label="Todas" onClick={() => navigate("/")} />
          {lists.map((list) => {
            return (
              <TreeItem key={list.id} component="button" nodeId={String(list.id + 3)} label={list.name} onClick={() => navigate(`/list/${list.id}`)} />
            );
          })}
          <ListModal />
        </TreeItem>
        <TreeItem component="button" nodeId='2' label="Tareas finalizadas" onClick={() => navigate("/completed")} />
      </TreeView>
    </Drawer>
  );
}
