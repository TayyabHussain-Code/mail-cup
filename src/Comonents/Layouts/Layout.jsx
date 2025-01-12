import React from "react";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import {  Box } from "@mui/material";
import Navbar from "./Header";

export const Layout = () => {
  return (
    <>
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <Box sx={{ flexGrow: 1, marginLeft: { xs: "60px", sm: "240px" } }}>
        <Navbar />
        <Box sx={{ padding: "80px 16px 16px" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
    </>
  );
};
