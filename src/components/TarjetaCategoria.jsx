import { Paper,Typography,Box } from '@mui/material'
import React from 'react'

const TarjetaCategoria = ({categoria}) => {
  return (

    <Paper elevation={"9"} sx={{width:"18rem", height:"100%", backgroundColor:"#D9D9D9", display:"flex", flexDirection:"column", justifyContent:"flex-end",borderRadius:"10px",}}>
        <Typography variant='h6' sx={{fontWeight:"600", fontStyle:"oblique", padding:3}}>
          {categoria.name}
        </Typography>
        <Box sx={{width:"100%", height:"70%", display:"flex",position:"relative", borderRadius:"10px" }}>
            <img src={categoria.img} width={"150px"} height={"200rem"}  alt={categoria.name} style={{position:"absolute",right:"0px", bottom:"0px", borderRadius:"0 0 19px 0"}} />
        </Box>
    </Paper>
  )
}

export default TarjetaCategoria