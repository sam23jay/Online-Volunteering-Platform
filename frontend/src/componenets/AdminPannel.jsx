import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { ThemeProvider } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, useTheme } from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const drawerWidth = 250;

const menu = [
  { name: "Dashboard", path: "/homeD", icon: <DashboardIcon /> },
  {
    name: "Profile",
    icon: <AccountCircleIcon />,
  },
  { name: "Volunteers", icon: <GroupIcon /> },
  { name: "Analytics", icon: <AnalyticsIcon /> },
  { name: "Events", icon: <EventIcon /> },
  { name: "Add Event", icon: <AddCircleIcon /> },
];

const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9155FD",
    },
    secondary: {
      main: "#f48fb1",
    },
    white: {
      main: "#fff",
    },
    orange: {
      main: "#ffdb0f",
    },
    background: {
      default: "",
      paper: "rgb(1, 1, 1)",
    },
  },
});

const AdminPannel = ({ onItemClick }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = React.useState(false);
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState("Dashboard"); 

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onItemClick(item); 
    navigate(item.path);
  };

  const drawer = (
    <div>
      <Box
        sx={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {isLargeScreen && <Toolbar />}
        <List>
          {menu.map((item, index) => (
            <ListItem
              key={item.name}
              disablePadding
              onClick={() => handleItemClick(item.name)}
              button
            >
              <ListItemButton selected={selectedItem === item.name}>
                {" "}
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );

  const handleCloseSideBar = () => {
    setSideBarVisible(false);
  };

  const drawerVariant = true ? "permanent" : "temporary";

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: `${isLargeScreen ? "flex" : "block"}` }}>
        <CssBaseline />
        <Drawer
          variant={drawerVariant}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              ...(drawerVariant === "temporary" && {
                top: 0,
                [`& .MuiPaper-root.MuiDrawer-paperAnchorTop.MuiDrawer-paperTemporary`]:
                  {
                    position: "fixed",
                    left: 0,
                    right: 0,
                    height: "100%",
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                  },
              }),
            },
          }}
          open={isLargeScreen || sideBarVisible}
          onClose={handleCloseSideBar}
        >
          {drawer}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            position: "relative", 
            zIndex: 1,
          }}
        >
          <Toolbar />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminPannel;
