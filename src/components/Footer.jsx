
import { Grid2, Typography } from '@mui/material'
import React from 'react'

export const Footer = () => {
  return (
    <Grid2      sx={{
        backgroundColor: "#E8621D",
        color: "#fff",
        textAlign: "center",
        padding: 1,
        marginTop: "auto", // Empuja el footer hacia abajo
        height: "20rem",
        marginTop:"3rem",
        display:"flex",
        flexDirection: "column",
        justifyContent:"space-between",
        alignItems: "center",
      }}
>
            <img
              src="/Logo/LogoMega1.png"
              alt="Logo"
              style={{ width: "500px" }}
            />
      <Typography variant="h6">Mega Ofertas 2025 | Todos los derechos reservados </Typography>
      </Grid2>
  )
}

