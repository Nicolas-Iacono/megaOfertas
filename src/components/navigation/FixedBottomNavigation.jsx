import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useMyUserContext } from "@/context/userContext";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InventoryIcon from '@mui/icons-material/Inventory';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
const FixedBottomNavigation = () => {
  const [value, setValue] = useState(0);
  const {isAdmin,isUser} = useMyUserContext();
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };
  return (
    <>
      {/* Contenedor de la animación */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "red",
          zIndex: 10,
          borderRadius:"15px 15px 0 0"
        }}
      >
        <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
          {isAdmin ? (
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => setValue(newValue)}
            >
              <BottomNavigationAction label="Nuevo" icon={<AddCircleRoundedIcon />} onClick={() => handleNavigation("/admin")} />
              <BottomNavigationAction label="Inventario" icon={<InventoryIcon />} onClick={() => handleNavigation("/listado")} />
              <BottomNavigationAction label="Ventas" icon={<MonetizationOnIcon />} onClick={() => handleNavigation("/ventas")} />
              <BottomNavigationAction label="Usuarios" icon={<PeopleAltIcon />} onClick={() => handleNavigation("/users")} />
            </BottomNavigation>
          ) : (
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => setValue(newValue)}
            >
              <BottomNavigationAction label="Usuario" icon={<PersonRoundedIcon />} onClick={() => handleNavigation("/usuario")} />
              <BottomNavigationAction label="Favs" icon={<FavoriteRoundedIcon />} onClick={() => handleNavigation("/inventario")} />
              <BottomNavigationAction label="Carrito" icon={<ShoppingCartRoundedIcon />} onClick={() => handleNavigation("/carrito")} />
            </BottomNavigation>
          )}
        </Paper>
      </motion.div>
    </>
  );
};

export default FixedBottomNavigation;