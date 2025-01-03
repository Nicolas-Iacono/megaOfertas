import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Box, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import splideGlobal from "../styles/splideGlobal.css"
export const VerticalSlider = () => {
  const [products, setProducts] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products/latestfive');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        height: '100%', 
        width:"100%",
        padding: '4rem',
        backgroundColor:"#FFBA9E",
       position: 'relative',
       margin:"0 auto",
       borderRadius:"10px",
        gap: '2rem',
      }}
    >


      <Box sx={{width:"50%", height:"15rem"}}>
          <Typography variant='h2' style={{fontWeight:"100",fontStyle:"oblique" }}>
            NUEVAS  <span style={{fontWeight:"800",fontStyle:"oblique", color:"#5105E8"}}>OFERTAS TODOS</span> LOS DIAS
          </Typography>
        
      </Box>

      <Splide
      style={{position:"relative"}}
        options={{
          direction: 'ttb', // Vertical slider
          height: '25rem',
          type: 'loop',
          perPage: 1,
          autoplay: true,
          gap: '1rem',
          width: '100%',
          arrows: false, // Desactiva los botones de control
        
        }}
      >
        {products.map((product) => (
          <SplideSlide key={product.id}>
            <Paper
            elevation={9}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '1rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                width:"95%"
                
              }}
            >
              {/* First Row */}
              <Box
                sx={{
                  display: 'flex',
                  gap: '4rem',
                  justifyContent: 'space-between',
                }}
              >
                {/* Column 1 */}
                <Box sx={{ display:"flex" , justifyContent:"space-between",flexDirection:"column",padding:"2rem"}}>
                  <Typography variant="body1" fontWeight="bold" sx={{color:"gray"}}>
                    {product.brand}
                  </Typography>
                  <Typography variant="h3" color="textSecondary">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.descripcion}
                  </Typography>
                  <Typography variant="h5" color="primary" mt="0.5rem">
                    ${product.price}
                  </Typography>

                   {/* Second Row */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <Button variant="contained" color="primary">
                  Ver más
                </Button>
              </Box>
                </Box>

                {/* Column 2 */}
                <Box
                  sx={{
                    flex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    width:"60%",
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    padding:1,
                    borderRadius:3

                  }}
                >
                  <img
                    src={
                      product.imagenes && product.imagenes.length > 0
                        ? product.imagenes[0]
                        : 'default-image-url.jpg'
                    }
                    alt={product.name}
                    style={{
                      maxWidth: '80%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      borderRadius: '10px'
                    }}
                  />
                </Box>
              </Box>

             
            </Paper>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};

export default VerticalSlider;
