import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid2, Typography, Button } from '@mui/material';
import BtnAd from "../components/BtnAd"
import ProductoForm from '@/components/formProduct';
const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
  });

  // Obtener productos desde la API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/product/all'); // Cambia esta URL según tu backend
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  // Crear un producto
  const createProduct = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      await axios.post('/crear-producto', newProduct); // Cambia esta URL según tu backend
      setNewProduct({ name: '', price: '' }); // Resetear formulario
      fetchProducts(); // Actualizar la lista de productos
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Grid2 sx={{ padding:{xs:"20px 0px", md:"20px"}, fontFamily: 'Arial, sans-serif', color:"white", display:"flex", flexDirection:"column",marginTop: {xs:"0", md:"0rem"}, height:"100vh"}}>
      
    


          <Grid2 sx={{width:"100%", display:"flex", flexDirection:"column", height:"auto",}}>
           

            <Grid2  sx={{width:{xs:"100%", md:"80%"},height:{xs:"auto", md:"80%"},display:"flex", justifyContent:"center", alignItems:"flex-start", position:"absolute" }}>

              <ProductoForm/>


              </Grid2>
          </Grid2>
     

    </Grid2>
  );
};

export default AdminPage;
