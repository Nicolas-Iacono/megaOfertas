// components/Layout.js
import React from "react";
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline } from "@mui/material";
import { UserContextProvider,useMyUserContext } from "@/context/userContext";
import Fondo from "../components/Fondo"
import { Header } from "./Header";
const Layout = ({ children }) => {

  const {user} = useMyUserContext()
  return (
    <>
      <Header/>
      {/* Main Content */}
      <Fondo >
        {children}
      </Fondo>

      {/* Footer */}
      {/* <Box
        component="footer"
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          textAlign: "center",
          padding: 1,
          marginTop: 0,
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Mi Sitio Web. Todos los derechos reservados.
        </Typography>
      </Box> */}
    </>
  );
};



export default Layout;
