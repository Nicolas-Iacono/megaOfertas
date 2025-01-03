import { Grid2,Typography,Box,Divider, Button,IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMyCarritoContext } from '@/context/carritoContext'
const CarritoCompras = () => {
const{carrito, setCarrito, vaciarCarrito, totalCarrito, eliminarDelCarrito} = useMyCarritoContext()

  const [carritoStorage, setCarritoStorage] = useState([])

  useEffect(() =>{
    const carritoData = localStorage.getItem("carrito");
    setCarritoStorage(carritoData ? JSON.parse(carritoData) : []);
  }, [carrito])


  return (
    <Grid2 sx={{width:"30rem", height:"80%", backgroundColor:"red", position:"absolute",right:"0px", borderRadius:"0 0 0 60px", display:"flex", flexDirection:"column", padding:2,justifyContent:"space-between",gap:"1rem"}}>
      <Grid2>
      <Box>
        <Typography variant='h4'> 
          Mi Carrito
        </Typography>

      </Box>
     

      <Box sx={{display:"flex", width:"90%", justifyContent:"space-between", alignItems:"center", margin:"0 auto"}}>
        <Typography>
          producto
        </Typography>
          <Divider orientation='vertical'/>
        <Typography>
          cantidad
        </Typography>
          <Divider orientation='vertical'/>
        <Typography>
          precio
        </Typography>

      </Box>
      <Grid2 sx={{display:"flex", flexDirection:"column",justifyContent:"start", alignItems:"center", gap:"1rem"}}>

        {Array.isArray(carritoStorage) && carritoStorage.map((item) => (
          <Box key={item.id} sx={{display:"flex", width:"100%", justifyContent:"space-between", alignItems:"center", margin:"0 auto", borderBottom:"1px solid black", position:"relative", backgroundColor:"white",height:"4.5rem",flexDirection:"column"}}>
            <Box sx={{display:"flex", justifyContent:"space-between",alignItems:"", width:"100%"}}>

          
            <Box sx={{width:"10rem", backgroundColor:"blue",}}>
            <Typography variant='body2' sx={{width:"6.5rem"}}>
              {item.nombre}
            </Typography>
            </Box>
          
            <Box sx={{width:"4rem", backgroundColor:"blue", display:"flex", justifyContent:"end", alignItems:"center"}}> 
            <Typography>
              1
            </Typography>
            </Box>
          
            <Box sx={{width:"7rem", backgroundColor:"blue",display:"flex", justifyContent:"end", alignItems:"center"}}>
            <Typography>
              $ {item.precioLista}
            </Typography>
            </Box>
            </Box>
            <Box>
              <Button onClick={()=> eliminarDelCarrito(item.id)}>No lo quiero en mi carrito</Button>
            </Box>

          </Box>
          
        ))}
      </Grid2>
      </Grid2>

        <Box sx={{flexDirection:"column",}}>
          <Box>
            <Box>
            <Typography variant='h6'>Total</Typography>

            </Box>
            <Box>
              <Typography variant='h6'>${totalCarrito}</Typography>
            </Box>
          </Box>
          <Button>confirmar compra</Button>
        </Box>
    </Grid2>
  )
}

export default CarritoCompras