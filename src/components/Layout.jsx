// components/Layout.js
import React from "react";
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline } from "@mui/material";
import { UserContextProvider,useMyUserContext } from "@/context/userContext";
import Fondo from "../components/Fondo"
import { Header } from "./Header";
import {Footer} from "./Footer"
const Layout = ({ children }) => {

  const {user} = useMyUserContext()
  return (
    <g>
      <Header/>
      {/* Main Content */}
      <Fondo >
        {children}
      </Fondo>
      {/* Footer */}
    </g>
  );
};



export default Layout;
