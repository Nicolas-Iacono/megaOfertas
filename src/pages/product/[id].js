import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Container, Typography, Box, CardMedia, Button, IconButton } from "@mui/material";
import API from "../../utils/api"; // Verifica que esta ruta sea correcta.
import { useMyCarritoContext } from "@/context/carritoContext";
import { Form } from "formik";


const ProductDetails = () => {
 
  const router = useRouter();
  const { id } = router.query; // Obtenemos el ID desde la URL.
  const [product, setProduct] = useState(null);
  const [imgSelected, setImgSelected] = useState(0)
  const [likeBtn, setLikeBtn] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState(false)
 const {carrito, setCarrito, agregarAlCarrito,eliminarDelCarrito, vaciarCarrito,totalCarrito} = useMyCarritoContext();
  console.log(carrito);
  
  const comprobacionAgregado = (id) => {

    if(!carrito.find((item) => item.id === item.id)){
      agregarAlCarrito(product)
      setProductoAgregado(true)
    }else{
      setProductoAgregado(false)

    }    
  }


  const handleImageClick = (index) => {
    setImgSelected(index); // Cambiar la imagen de portada al índice clickeado
  };
  useEffect(() => {
    if (id) {
      API.get(`/products/producto/${id}`) // Cambia por tu endpoint correcto.
        .then((response) => setProduct(response.data))

        .catch((error) => console.error("Error al cargar el producto:", error));
    }
  }, [id]);


  if (!product) {
    return (
      <Container sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography variant="h4" color="error">
          Producto no encontrado
        </Typography>
        <Button onClick={() => router.push("/shop")} variant="contained" sx={{ marginTop: 2 }}>
          Volver a la tienda
        </Button>
      </Container>
    );
  } 
  
  const viewLike = () => {
    setLikeBtn(!likeBtn);
  }
  const handleRedirect = () => {
    window.location.href = 'https://link.mercadopago.com.ar/mgofertas';
  };

  return (
    <Container sx={{ marginTop: 7, height:{md:"40rem"} }}>
      
      <Box sx={{ display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" },justifyContent:"start",alignItems:"center",height:{md:"33rem"} }}>
       
       <Box sx={{display:"flex", flexDirection:{md:"row", xs:"column-reverse"},width:{md:"35rem"}, height:{md:"90%"}}}>
       
       <Box sx={{ width: { xs: "100%", md: "7rem" },height:{md:"100%"}, display:"flex", flexDirection:{xs:"row", md:"column"}, justifyContent: "start", alignItems:"center", gap:".4rem", marginTop:{xs:"1rem",md:"0px"} }}>
        {
          product && product.imagenes && product.imagenes.map((imagen, index) => (
            <CardMedia key={index}
            component="img"
            image={imagen}
            onClick={() => handleImageClick(index)}
            sx={{width:{xs:"18%",md:"80%"}, borderRadius:"5px",cursor:"pointer"
            }}>
      
          </CardMedia> ))
        }

        </Box>
        <CardMedia
          component="img"
          image={product.imagenes[imgSelected]}
          alt={product.nombre}
          sx={{ width: { xs: "100%", md: "70%" },height:{md:"90%"} ,borderRadius: 2,margin:"auto",
        }}
        />
       </Box>
       
        <Box sx={{display:"flex",flexDirection:"column", backgroundColor:"white", height:"85%", padding:"1rem", justifyContent:"space-between", width:"50%"}}>
            <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Box sx={{display:"flex",flexDirection:"column", width:"100%"}}>
                    <Typography variant="subtitle1" color="gray" sx={{fontWeight:700}}>
                        {product.marca}
                      </Typography>
                      <Typography variant="h3" gutterBottom sx={{width:"100%"}}>
                    {product.nombre}
                  </Typography>
                </Box>

                {likeBtn ? 
                    
                    ( <IconButton sx={{width:"3rem", height:"3rem", border:"3px solid orange", borderRadius:"50%", display:"flex", justifyContent:"center", alignItems:"center", cursor:"pointer", backgroundColor:"orange",color:"orange"}} onClick={viewLike}>
                      <img src="/iconos/corazon.svg" width="20px"/>
                    </IconButton>) 
                    
                    : 
                    
                    ( <IconButton sx={{width:"3rem", height:"3rem", border:"3px solid orange", borderRadius:"50%", display:"flex", justifyContent:"center", alignItems:"center", cursor:"pointer", color:"orange", }} onClick={viewLike}>
                      <img src="/iconos/corazonNaranja.png" width="20px"/>
                    </IconButton>)
                    
                }
               
            </Box>
            

          <Box sx={{display:"flex",flexDirection:"column",}}>
          <Typography variant="body1" gutterBottom sx={{fontWeight:"400", color:"gray",  }}>
            {product.descripcion}
          </Typography>
         
         
          </Box>
          <Box
  sx={{
    width: "100%",
    height: "3rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center", 
    gap: "1rem",
  }}
>
  <Box
    sx={{
      backgroundImage: `url('/mediosPagos/visa.webp')`,
      width: "3rem", // Corregido
      height: "80%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
      border: ".1px solid gray",
      borderRadius: 2,
    }}
  ></Box>
  <Box
    sx={{
      backgroundImage: `url('/mediosPagos/master.webp')`,
      width: "3rem", // Corregido
      height: "80%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
      border: ".1px solid gray",
      borderRadius: 2,
    }}
  ></Box>
  <Box
    sx={{
      backgroundImage: `url('/mediosPagos/mercadoPago.webp')`,
      width: "3rem", // Corregido
      height: "80%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
      border: ".1px solid gray",
      borderRadius: 2,
    }}
  ></Box>
</Box>
        <Box 
        sx={{
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"center"}}>
     
        <Typography variant="h4" sx={{ textDecoration: product.descuento ? "line-through" : "none" }}>
        <span style={{color:"orange"}}>$</span>{product.precioLista}
          </Typography>
        
          <Button 
          key={product.id}
          onClick={handleRedirect} 
          variant="contained"  sx={{backgroundColor:"orange", height:"2rem", borderRadius:3}}>
             Comprar producto
          </Button>
        </Box>
          
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetails;
