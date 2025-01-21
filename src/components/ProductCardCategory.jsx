


import {Box, Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { useRouter } from "next/router";

const ProductCardCategory = ({ id, name, price, image, brand, priceList }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/product/${id}`);
  };
  const porcentajeReduction = (price, priceList) => {
    if (priceList > price) {
      return Math.round(((priceList-price) / priceList) * 100);
    }
    return 0; 
  };

  return (
    <Card elevation={8} sx={{ width: "45rem", height: "17rem", display: "flex", flexDirection: "row", backgroundColor: "white", borderRadius: "5px", padding: "1.5rem", justifyContent:"start",alignItems:"center" }}>
      <CardMedia
        sx={{ width: "50%", height: "12rem", backgroundPosition: "center center", backgroundRepeat: "no-repeat",objectFit:"contain", backgroundSize:"contain",borderRadius: "5px", }}
        image={image}
        alt={name || "Imagen del producto"}
      />
      <CardContent sx={{ width: "90%", height: "100%", display: "flex", flexDirection: "column", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "start", padding: ".5rem",  }}>
        <Box sx={{}}>
        {brand && <Typography variant="h6" sx={{ color: "gray" }}>{brand}</Typography>}

        </Box>
        <Box sx={{marginBottom:"1.5rem"}}>
        <Typography variant="h4" fontWeight={"light"}sx={{ color: "black", fontWeight:"100" }}>{name}</Typography>

        </Box>
        <Box >
          
          <Typography variant="body2" sx={{ color: "black",  textDecoration: "line-through"}}>${priceList}</Typography>
    
          <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"7rem", gap:"1rem"}}>
        
        <Typography variant="h5" sx={{ color: "black" }}>${price}</Typography>
        <Typography variant="h6" sx={{ color: "orange" }}>{porcentajeReduction(price, priceList)}%</Typography>
        </Box>

        </Box>

        <CardActions>
          <Button variant="contained" onClick={handleViewDetails} sx={{height:"2rem", width:"9rem", marginLeft:"-8px"}}>
            <Typography variant="body2" sx={{ textTransform: "none"}}>
               Ver detalle            
            </Typography>
          </Button>
      </CardActions>
      </CardContent>
  
    </Card>
  );
};

export default ProductCardCategory;
