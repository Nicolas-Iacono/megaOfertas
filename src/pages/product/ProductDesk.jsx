import React from 'react';
import { Container, Typography, Box, CardMedia, Button } from "@mui/material";
import LikeButton from "../../components/buttons/ProductLikeButton";

const ProductDesk = ({ product, imgSelected, handleImageClick, handleRedirect }) => {
  return (
    <Container sx={{ marginTop: 10, height: { md: "40rem" } }}>
      <Box sx={{ display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" }, justifyContent: "start", alignItems: "center", height: { md: "33rem" } }}>
        
        {/* Contenedor de imágenes */}
        <Box sx={{ display: "flex", width: { md: "33rem", xs: "100%" }, height: { md: "90%", xs: "30rem" }, justifyContent: "space-between" }}>
          {/* Miniaturas */}
          <Box sx={{ width: { xs: "30%", md: "7rem" }, display: "flex", flexDirection: "column", gap: ".4rem" }}>
            {product?.imagenes?.map((imagen, index) => (
              <CardMedia
                key={index}
                component="img"
                image={imagen}
                onClick={() => handleImageClick(index)}
                sx={{ width: { xs: "100%", md: "80%" }, height: "5rem", cursor: "pointer", borderRadius: "5px" }}
              />
            ))}
          </Box>

          {/* Imagen principal */}
          <Box sx={{ width: { xs: "70%" } }}>
            <CardMedia
              component="img"
              image={product?.imagenes?.[imgSelected]}
              alt={product?.nombre}
              sx={{ width: { xs: "80%", md: "70%" }, height: { xs: "20rem", md: "90%" }, borderRadius: 2, margin: "auto" }}
            />
          </Box>
        </Box>

        {/* Información del producto */}
        <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "white", height: "85%", padding: "1rem", justifyContent: "space-between", width: { md: "50%", xs: "80%" } }}>
          
          {/* Marca y nombre */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <Typography variant="subtitle1" color="gray" sx={{ fontWeight: 700 }}>
                {product?.marca}
              </Typography>
              <Typography variant="h3" gutterBottom>
                {product?.nombre}
              </Typography>
            </Box>
            <LikeButton productId={product?.id} />
          </Box>

          {/* Descripción */}
          <Typography variant="body1" color="gray">
            {product?.descripcion}
          </Typography>

          {/* Medios de pago */}
          <Box sx={{ display: "flex", gap: "1rem" }}>
            {["visa.webp", "master.webp", "mercadoPago.webp"].map((img, index) => (
              <Box key={index} sx={{
                backgroundImage: `url('/mediosPagos/${img}')`,
                width: "3rem",
                height: "3rem",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                border: "0.1px solid gray",
                borderRadius: 2
              }} />
            ))}
          </Box>

          {/* Precio y botón */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h4" sx={{ textDecoration: product?.descuento ? "line-through" : "none" }}>
              <span style={{ color: "orange" }}>$</span>{product?.precioLista}
            </Typography>
            <Button onClick={handleRedirect} variant="contained" sx={{ backgroundColor: "orange", height: "2rem", borderRadius: 3 }}>
              Comprar producto
            </Button>
          </Box>

        </Box>
      </Box>
    </Container>
  );
};

export default ProductDesk;
