import Link from "next/link";
import { useRouter } from "next/router";
import API from '../utils/api';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { CategoryContextProvider, useCategory } from "../context/categoryContext";
import { useMyCarritoContext } from "@/context/carritoContext";

const ProductCard = ({producto}) => {

  // const [productos, setProductos] = useState([]);
  const { category, fetchCategory, updateCategory } = useCategory();
  const {carrito, setCarrito, agregarAlCarrito,eliminarDelCarrito, vaciarCarrito,totalCarrito} = useMyCarritoContext();
  
  const productosCategory = category.products

  console.log("prod de categoria: " , productosCategory)


  // useEffect(() => {
  //   API.get('/products/all')
  //     .then((res) => setProductos(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  const router = useRouter();

  const handleViewDetails = (id) => {
    router.push(`/product/${id}`);
  };

 // Extraer imágenes de cada producto
//  const imagenes = productos.map((producto) => producto.imagenes);


 
 return (
<>

  {/* {productos.map((producto) => ( */}

    <Card elevation={8} key={producto.id} sx={{width:"15rem", height:"22rem", display:"flex", flexDirection:"column", backgroundColor:"white", borderRadius:"5px",padding:"1.5rem 2rem"}}>
    
        <CardMedia  sx={{width:"100%", height:"9rem", backgroundPosition:"center center", backgroundRepeat:"no-repeat", backgroundSize:"contain", borderRadius:"5px", }}
              image={producto.imagenes && producto.imagenes.length > 0 
                ? producto.imagenes[0] 
                : "/placeholder.jpg"}
              alt={producto.name || "Imagen del producto"}
          >
        </CardMedia>
        <CardContent sx={{ width:"90%", height:"50%",display:"flex", flexDirection:"column", flexWrap:"nowrap",justifyContent:"space-between",alignItems:"start",
        padding:".5rem"
        }}>
          <Typography variant='h7' sx={{color:"black", color:"gray", }}>
            {producto.brand} 
          </Typography>
          <Typography variant='h6' sx={{color:"black",}}>
            {producto.name} 
          </Typography>
          <Typography variant='h5' sx={{color:"black"}}>
              $ {producto.price}
          </Typography>

        </CardContent>
        <CardActions>
            <Button variant='contained'
          onClick={() => handleViewDetails(producto.id)}>
              Ver producto
            </Button>
        </CardActions>
        
    </Card>
  {/* ))} */}


</>


  );
};

export default ProductCard;
