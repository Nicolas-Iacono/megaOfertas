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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMyUserContext } from "@/context/userContext";
import MenuCategoria from "./MenuCategoria";
import CarritoCompras from "./CarritoCompras";

export const Header = () => {
  const { user } = useMyUserContext();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [carritoView, setCarritoView] = useState(false)

  const verCarrito = () => {
    setCarritoView(!carritoView); // Alterna entre true y false
    console.log("Estado previo:", carritoView); // Muestra el estado previo
  };
  
  // Efecto para ver el cambio en el estado
  useEffect(() => {
    console.log("Estado actualizado:", carritoView);
  }, [carritoView]);


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
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                gap: "0.5rem",
              }}
            >
              <InputBase
                placeholder="Buscar productos..."
                sx={{
                  width: "100%",
                  padding: "0.5rem",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              />
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <MenuCategoria />
                <a href="/" style={linkStyles}>
                  Inicio
                </a>
                <a href="/contact" style={linkStyles}>
                  Contacto
                </a>
              </Box>
            </Box>
          )}

          {/* User Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              alignItems: "center",
              gap: isMobile ? "1rem" : "0.5rem",
            }}
          >
            <Typography sx={{ fontSize: isMobile ? "12px" : "16px" }}>
              {user?.email ? user.email : "Nicolas Iacono"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <IconButton>
                <img src="/iconos/usuario.svg" alt="User" style={{ width: "24px" }} />
              </IconButton>
              <IconButton>
                <img src="/iconos/corazon.svg" alt="Likes" style={{ width: "24px" }} />
              </IconButton>
              <IconButton onClick={verCarrito}>
                <img src="/iconos/cart.svg" alt="Carrito" style={{ width: "24px" }} />
              </IconButton>
            </Box>
            {!isMobile && (
              <Typography sx={{ fontSize: "12px" }}>Buenos Aires, Argentina</Typography>
            )}
          </Box>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>

      </AppBar>
      {
        carritoView ? ( <CarritoCompras/>):(<></>)
      }
     

    </>
  );
};
