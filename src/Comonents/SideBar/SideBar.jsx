
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { logo, shortlogo } from "../../Images";
import { Navigate } from "react-router-dom";

const SideBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  const navItems = [
    { id: 1, label: "Dashboard", icon: <DashboardIcon />  },
    { id: 2, label: "Customer", icon: <PersonIcon /> },
    { id: 3, label: "Support Tickets", icon: <SupportAgentIcon /> },
    { id: 4, label: "Transactions", icon: <AccountBalanceIcon /> },
  ];
  
  const apiToken = localStorage.getItem("token")
  console.log(apiToken)
  // const ApiData = JSON.parse(localStorage.getItem("token"))
  // const tokenData = ApiData?.token;
  // console.log(ApiData, "it's a tokennnn")
  // console.log(tokenData, "it's our token data")
  if(!apiToken){
       return <Navigate to="/signin" />
    };
  return (
    <Drawer
      variant="permanent"
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
      PaperProps={{
        sx: {
          width: {
            xs: isDrawerOpen ? 200 : 0,  // Mobile: Show 200px or hide
            sm: isDrawerOpen ? 240 : 60 // Tablet/Desktop: Show 240px or collapse to 60px
          },
          // width: isDrawerOpen ? 240 : 60,
          transition: "width 0.3s",
          overflowX: "hidden",
          boxShadow: "3px 0 6px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15px 0",
          height: 64,
          backgroundColor: isDrawerOpen ? "#ffffff" : "#ffffff",
          transition: "background-color 0.3s",
          marginTop:5,
        }}
      >
        {isDrawerOpen  ? (
          <img src={logo} alt="Logo" style={{ width: "140px" }} />
        ) : (
          <img src={shortlogo} alt="Icon" style={{ width: "40px" }} />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isDrawerOpen ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "15px 0",
          textAlign: isDrawerOpen ? "left" : "center",
        }}
      >
        <Avatar sx={{marginTop:0, width: 40, height: 40, mb: isDrawerOpen ? 0 : 1 }}>
          M
        </Avatar>
        {isDrawerOpen && (
          <Box ml={2}
          sx={{marginTop:0}}
           >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Meta Logix
            </Typography>
            <Typography variant="caption" sx={{ color: "gray" }}>
              dynamiclogix@gmail.com
            </Typography>
          </Box>
        )}
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.id} sx={{marginTop:0.5}}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {isDrawerOpen && <ListItemText primary={item.label} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
export default SideBar;