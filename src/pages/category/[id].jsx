import {Box, Container, Typography, Button, Grid2, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from "../../utils/api"; // Verifica que esta ruta sea correcta.
import ProductCardCategory from "@/components/ProductCardCategory";

const CategoryDetails = () => {
  const router = useRouter();
  const { id } = router.query;

 

  useEffect(() => {
    if (id) {
      API.get(`/category/${id}`)
        .then((response) => {
          setProducts(response.data.products);
          setNameCategory(response.data.name);
        })
        .catch((error) => console.error("Error al cargar los productos:", error));
    }
  }, [id]);
  const [products, setProducts] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4; 
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);
 
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Grid2
          container
          sx={{
            backgroundColor: "#6D33BE",
            position: "absolute",
           
            top: 0,
            width: "100%",
            left: 0,
            padding: 0,
            boxSizing: "border-box",
    
          }}
        >

    <Grid2 sx={{ marginTop: 5, display:"flex", justifyContent:"flex-end", width:"100%", padding:"1rem", alignItems:"start"}}>
      <Grid2 sx={{ width:"70rem", display:"flex",flexDirection:"column", alignItems:"start",justifyContent:"start"}}>
      <Box  sx={{height:"2.5rem", width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <Typography variant="h6" sx={{ marginBottom: 2, color:"white" }}>
        Todos los produtos - {nameCategory}
      </Typography>
      </Box>
      <Box sx={{height:"2.5rem", width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <Typography variant="h6" sx={{ marginBottom:"2rem", color:"white"}}>
        {products.length} resulados
      </Typography>
        </Box>
        <Box sx={{height:"2.5rem", width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <Typography variant="h2" sx={{ marginBottom:"2rem", color:"white"}}>
       {nameCategory}
      </Typography>
        </Box>
      
      
  
      </Grid2>
      
      <Grid2 container spacing={1} sx={{width:"130%", marginTop:"5rem"}}>
        {
 currentProducts.map((product) =>(

    <Grid2 item key={product.id} xs={12} sm={6} md={4}>
      <ProductCardCategory
        id={product.id}
        name={product.name}
        price={product.price}
        priceList={product.priceLista}
        image={product.imagenes?.[0] || "/placeholder.jpg"}
        brand={product.brand} // If available
      />
    </Grid2>
  ))}
        
     
      </Grid2>
    </Grid2>
    <Grid2 style={{ display: "flex", justifyContent: "center", marginTop: "1rem", alignItems:"center",gap:".5rem", width:"100%",marginBottom:"3rem" }}>
  {[...Array(totalPages)].map((_, index) => (
    <IconButton
      key={index}
      onClick={() => handlePageChange(index + 1)}
      sx={{
        
        padding:"1rem",
        backgroundColor: currentPage === index + 1 ? "rgb(172, 72, 22)" : " #e8621d",
        width:currentPage === index + 1 ? "3rem" : "2rem",
        height:currentPage === index + 1 ? "3rem" : "2rem",
        color: "white",
        border: "none",
        borderRadius: "50%",

        cursor: "pointer",
      }}
    >
      {index + 1}
    </IconButton>
  ))}
</Grid2>
    </Grid2>

  );
};

export default CategoryDetails;
