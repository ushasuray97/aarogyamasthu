import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from "./Sidebar/Sidebar";
import Header from './Header/Header';
import Box from "@mui/material/Box";

const MainDashboard = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ width: "100%", height: "100%" }}>
          <Header />
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default MainDashboard;