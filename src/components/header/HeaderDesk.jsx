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
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMyUserContext } from "@/context/userContext";
import MenuCategoria from "../MenuCategoria";
import CarritoCompras from "../CarritoCompras";
import { useRouter } from "next/router";
import SearchBar from "../bucador/SearchBar";

export const HeaderDesk = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [carritoView, setCarritoView] = useState(false)
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null);
  const router = useRouter();
const {isAdmin,isUser} = useMyUserContext();
  
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
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
  
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                gap: "0.5rem",
              }}
            >
              <SearchBar/>
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
  

          {/* User Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              alignItems: "center",
              gap: isMobile ? "1rem" : "0.5rem",
            }}
          >
            {user ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: "0.2rem", alignItems: "center" }}>
                          <Typography sx={{ fontSize: isMobile ? "12px" : "16px" }}>
                          {username}
                          </Typography>
                          <Button sx={{backgroundColor:"white", height:"1.4rem", color:" #e8621d"}} onClick={logOut}>
                            Log out
                          </Button>
              </Box>

            ):(
              <>
              <Typography sx={{ fontSize: isMobile ? "12px" : "16px" }}>
              Invitado
              </Typography>
              <Button sx={{backgroundColor:"white", height:"1.4rem", color:" #e8621d"}}>
                Log In
              </Button>
  </>
            )}
        
       {
        isAdmin ? (
<Box
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >

              
              <IconButton>
              <a href="/admin">
              <img src="/iconos/admin/agregarProd.png" alt="Agregar un producto" style={{ width: "24px" }} />
              </a>
              </IconButton>
              <a href="/listado">
              <IconButton>
                <img src="/iconos/admin/productos.png" alt="productos" style={{ width: "24px" }} />
              </IconButton>
              </a>
              <IconButton >
                <img src="/iconos/admin/pedidos.png" alt="pedidos" style={{ width: "24px" }} />
              </IconButton>
              <IconButton >
                <img src="/iconos/admin/usuarios.png" alt="usuarios" style={{ width: "24px" }} />
              </IconButton>
            </Box>
        ):(<Box
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >

          <IconButton>
          <a href="/login">
          <img src="/iconos/usuario.svg" alt="User" style={{ width: "24px" }} />
          </a>
          </IconButton>
          <IconButton>
            <img src="/iconos/corazon.svg" alt="Likes" style={{ width: "24px" }} />
          </IconButton>
          <IconButton onClick={verCarrito}>
            <img src="/iconos/cart.svg" alt="Carrito" style={{ width: "24px" }} />
          </IconButton>
        </Box>
        )}
            



          
              <Typography sx={{ fontSize: "12px" }}>Buenos Aires, Argentina</Typography>
            
          </Box>

       
         
        </Toolbar>

      </AppBar>
      {
        carritoView ? ( <CarritoCompras/>):(<></>)
      }
     

    </>
  );
};
export default HeaderDesk