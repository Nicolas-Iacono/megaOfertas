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
    <Grid2 sx={{ padding: '20px', fontFamily: 'Arial, sans-serif', color:"white", display:"flex", flexDirection:"column"}}>
      
      <Grid2>
          <Typography variant="h4" sx={{color:"black"}}>Panel de Administración</Typography>
      </Grid2>
      <Grid2 sx={{display:'flex', backgroundColor:"white", marginLeft:"0px", width:"100%", height:"85vh"}}>

          <Grid2 sx={{backgroundColor:"green", height:"40%", width:"10rem", display:"flex", flexDirection:"column", justifyContent:"space-around", alignItems:"center", borderRadius:"0px 0px 20px 0px ", boxShadow:4}}>

          <BtnAd>
            productos
          </BtnAd>

          <BtnAd>
            Ordenes
          </BtnAd>
          
           <BtnAd>
            Envios
          </BtnAd>
         
          
          </Grid2>
          <Grid2 sx={{width:"100%", display:"flex", flexDirection:"column"}}>
            <Grid2  sx={{backgroundColor:"blue",width:"100%", height:"3rem", display:"flex", justifyContent:"flex-end", gap:"1rem", alignItems:"center",paddingRight:"1rem"}}>
              <Button sx={{color:"white", background:"black"}}>
                Listado
              </Button>
              <Button sx={{color:"white", background:"black", }}>
                Agregar Producto
              </Button>
            </Grid2>

            <Grid2  sx={{width:"100%", height:"110%", }}>

              <ProductoForm/>


              </Grid2>
          </Grid2>
     
      </Grid2>
    
      {/* Sección de productos */}
     

      {/* Formulario para crear producto */}
      {/* <section>
        <h2>Crear Producto</h2>
        <form onSubmit={createProduct} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
          <label htmlFor="name">Nombre del Producto:</label>
          <input
            type="text"
            id="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />

          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />

          <button type="submit" style={{ marginTop: '10px', padding: '10px', backgroundColor: 'blue', color: 'white' }}>
            Crear Producto
          </button>
        </form>
      </section> */}
    </Grid2>
  );
};

export default AdminPage;
