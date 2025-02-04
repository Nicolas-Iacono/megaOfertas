import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  InputBase,
  IconButton,
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
  Slide,
  Grid2
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMyUserContext } from "@/context/userContext";
import MenuCategoria from "../MenuCategoria";
import CarritoCompras from "../CarritoCompras";
import { useRouter } from "next/router";
import MenuMobile from "../buttons/MenuMobile";
import SearchBar from "../bucador/SearchBar";

export const HeaderMobile = () => {
  
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [carritoView, setCarritoView] = useState(false)
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const {isAdmin,isUser} = useMyUserContext();
  const router = useRouter();
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("./login")
  }
  const logIn = () => {
    router.push("./login")
  }
  useEffect(() => {
    const userStorage = localStorage.getItem("user");

    if (userStorage) {
      const user = JSON.parse(userStorage);
      setUser(user);
      setUsername(`${user.first_name} ${user.last_name}`);
    }
  }, []);
  


  const verCarrito = () => {
    setCarritoView(!carritoView); // Alterna entre true y false
    console.log("Estado previo:", carritoView); // Muestra el estado previo
  };
  
  // Efecto para ver el cambio en el estado
  useEffect(() => {
    console.log("Estado actualizado:", carritoView);
  }, [carritoView]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const linkStyles = {
    color: "#fff",
    textDecoration: "none",
    marginLeft: "15px",
    fontSize: "16px",
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: "#e8621d" }}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1rem",
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: isMobile ? "auto" : "10rem",
             
            }}
          >
            <img
              src="/Logo/LogoMega1.png"
              alt="Logo"
              style={{ width: isMobile ? "50px" : "100px" }}
            />
          </Box>

          {/* Search and Navigation */}
        
  
             <SearchBar/>

  
          

          {/* User Section */}

          {/* Mobile Menu Button */}
        <>
        <MenuMobile/>
        </>
            
        
        </Toolbar>

      </AppBar>
      {
        carritoView ? ( <CarritoCompras/>):(<></>)
      }
     

    </>
  );
};

export default HeaderMobile;