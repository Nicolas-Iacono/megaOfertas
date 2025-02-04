import Link from "next/link";
import { useRouter } from "next/router";
import API from '../utils/api';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { CategoryContextProvider, useCategory } from "../context/categoryContext";
import { useMyCarritoContext } from "@/context/carritoContext";
import LikeButton from "../components/buttons/ProductLikeButton"

const ProductCard = ({producto}) => {

  // const [productos, setProductos] = useState([]);
  const { category, fetchCategory, updateCategory } = useCategory();
  const {carrito, setCarrito, agregarAlCarrito,eliminarDelCarrito, vaciarCarrito,totalCarrito} = useMyCarritoContext();
 const [user, setUser] = useState(null);
  
  const productosCategory = category.products

  console.log("prod de categoria: " , productosCategory)


  const router = useRouter();

  const handleViewDetails = (id) => {
    router.push(`/product/${id}`);
  };


  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

  const userId = user ? user.id : null;

 
 return (
<>



    <Card elevation={8} key={producto.id} sx={{width:{md:"15rem", xs:"10rem"}, height:{md:"22rem", xs:"15rem"}, display:"flex", flexDirection:"column", backgroundColor:"white", borderRadius:"25px",padding:{xs:".5rem",md:"1rem" ,  
     "@media (max-width: 400px)": { // 🛠 Ajuste extra para pantallas < 400px
      width: "9rem",
      height: "15rem",
      padding: ".3rem",
    },}}}>
    
        <CardMedia  sx={{width:"100%", height:"9rem", backgroundPosition:"center center", backgroundRepeat:"no-repeat", backgroundSize:"cover", borderRadius:"20px", }}
              image={producto.imagenes && producto.imagenes.length > 0 
                ? producto.imagenes[0] 
                : "/placeholder.jpg"}
              alt={producto.name || "Imagen del producto"}
          >
        </CardMedia>
        <CardContent sx={{ width:"90%", height:"50%",display:"flex", flexDirection:"column", flexWrap:"nowrap",justifyContent:"space-between",alignItems:"start",
        padding:".2rem"
        }}>
          <Box sx={{display:"flex",flexDirection:"column",}}>

          <Typography variant='body2' sx={{color:"black", color:"gray", }}>
            {producto.brand} 
          </Typography>
          <Typography variant='body2' sx={{color:"black",}}>
            {producto.name} 
          </Typography>
          </Box>

          <Typography variant='h6' sx={{color:"black"}}>
              $ {producto.price}
          </Typography>

        </CardContent>
        <CardActions sx={{backgroundColor:"rgb(250, 241, 233)", borderRadius:"20px", display:"flex", justifyContent:"space-between"}}>
            <Button variant='contained'
          onClick={() => handleViewDetails(producto.id)}
          sx={{borderRadius:"20px", height:{xs:"2rem"}}}>
              <Typography  variant="body2"  sx={{
                  color: "white",
                  textAlign: "center",
                  textTransform: "lowercase",
                }}>
                  Ver producto
              </Typography>
            </Button>
            {producto?.id && user?.id &&<LikeButton productId={producto.id} userId={userId} sx={{width:{xs:"1rem"},height:"1rem"}}/>}
        </CardActions>
        
    </Card>



</>


  );
};

export default ProductCard;
