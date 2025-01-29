import { useEffect, useState } from 'react';
import API from '../utils/api';
import {Grid2, Typography,Box,Button,Select,MenuItem,Checkbox, Paper, IconButton} from '@mui/material'
import ListaCategorias from "../components/ListaCategorias"
import Categorias from "../components/Categorias"
import ProductCard from '@/components/ProductCard';
import { CategoryContextProvider, useCategory } from "../context/categoryContext";
import UltimoProducto from '@/components/UltimoProducto';
import Fondo from '@/components/Fondo';
import VerticalSlider from '@/components/VerticalSlider';
import splideGlobal from "../styles/splideGlobal.css";
import TarjetaCategoria from '@/components/TarjetaCategoria';
import categorias from "../data/categorias"
import { Footer } from '@/components/Footer';
 // Importa tu contexto
export default function Home() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const { category, fetchCategory, updateCategory } = useCategory();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [productsPerPage, setProductsPerPage] = useState(5);
   useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth < 1900) { // Cambia "768" por la cantidad de píxeles deseada
        setProductsPerPage(4);
      } else {
        setProductsPerPage(5);
      }
    };

    // Configura el valor inicial
    updateProductsPerPage();

    // Escucha los cambios de tamaño de la ventana
    window.addEventListener("resize", updateProductsPerPage);

    // Limpia el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", updateProductsPerPage);
    };
  }, []);
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(productos.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  useEffect(() => {
    API.get('/products/all')
      .then((res) => setProductos(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch and set filtered products based on selected category
  useEffect(() => {
    if (categoriaSeleccionada) { // Only fetch if a category is selected
      API.get(`/category/${categoriaSeleccionada}`)
        .then((res) => setProductosFiltrados(res.data))
        .catch((err) => console.error(err));
    } else { // If no category is selected, set filtered products to all products
      setProductosFiltrados(productos);
    }
  }, [categoriaSeleccionada, productos]); // Update on category change and product change

  const handleCategoryChange = (id) => {
    updateCategory({ id: id });
  };





  if (category.loading) {
    return <div>Cargando categoría...</div>;
  }

  if (category.error) {
    return <div>Error: {category.error}</div>;
  }

  const handleCategorySelected = (categoryId) => {
    setCategoriaSeleccionada(categoryId);
    //Aquí puedes usar el Id de la categoría para realizar otras acciones.
};

  return (
    <Grid2 sx={{color:"white", }}>
      <Box sx={{width:"90%", height:"26rem",display:"flex", justifyContent:"center", alignItems:"center", boxShadow:"2px 2px 10px black", margin:"20px auto",borderRadius:"10px"}}>
          <VerticalSlider/>
      </Box>

      <Box
        sx={{
          width: '80%',
          height: '19rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '20px auto',
        }}
      >
        {categorias.map((category) => (
          <TarjetaCategoria key={category.id} categoria={category} />
        ))}
      </Box>
      



    
      
      <Grid2 sx={{width:"100%", display:"flex",justifyContent:"space-between", alignItems:"center", padding:"1rem", borderRadius:"10px", flexDirection:"column", }}>
      


        <Grid2 sx={{width:"90%", height:"25rem", display:"flex", justifyContent:"space-around", margin:"0 auto", alignItems:"end", padding:".5rem", borderRadius:"10px",flexWrap:"wrap"}}>

     {
      currentProducts.map((producto) =>(

        <ProductCard key={producto.id} producto={producto}/>
      ))
     }

     
        </Grid2>
        <Grid2 style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
  {[...Array(totalPages)].map((_, index) => (
    <IconButton
      key={index}
      onClick={() => handlePageChange(index + 1)}
      sx={{
        margin: "0 0.5rem",
        padding: "1rem",
        backgroundColor: currentPage === index + 1 ? " #e8621d" : " #e8621d",
        width:currentPage === index + 1 ? "3rem" : "2rem",
        height:currentPage === index + 1 ? "3rem" : "2rem",
        color: "white",
        border: "none",
        borderRadius: "50%",

      }}
    >
      {index + 1}
    </IconButton>
  ))}
</Grid2>
      </Grid2>

      
    <Grid2 sx={{display:"flex", height:"14rem", width:"80%", margin:"0 auto", justifyContent:"space-between", gap:"1rem"}}>
        <Paper elevation={3} sx={{backgroundColor:"#3DD34A",display:"flex", height:"100%", width:"100%",borderRadius:"20px", justifyContent:"space-around"}}>

          <Box sx={{width:"50%", padding:4}}>
            <Typography variant='h2' color='white'>
              Canal de difusion
            </Typography>
            <Typography variant='h5' color='black'>
            Seguinos y enterate de todas las ofertas 
            </Typography>
          </Box>
          <img src={"/categorias/contacto.png"} alt="" />
        </Paper>
   
    </Grid2>

    <Footer/>
    </Grid2>
  );
}
