import { createContext, useContext, useState, useEffect } from 'react';

const carritoContext = createContext();

export const CarritoContextProvider = ({children}) => {
  const [carrito, setCarrito] = useState([])
  const [carritoStorage, setCarritoStorage] = useState([])

  const agregarAlCarrito = (producto) =>{
   
    // Obtener el carrito actual desde localStorage
  const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

  // Buscar si el producto ya existe en el carrito
  const productoExistente = carritoActual.find((item) => item.id === producto.id);

  if (productoExistente) {
    // Si existe, incrementa la cantidad
    productoExistente.cantidad += 1;
  } else {
    // Si no existe, agrega el producto con cantidad inicial de 1
    carritoActual.push({ ...producto, cantidad: 1 });
  }

  // Actualizar el localStorage con el carrito modificado
  localStorage.setItem("carrito", JSON.stringify(carritoActual));

  // Actualizar el estado del carrito
  setCarritoStorage(carritoActual);
  }

  const eliminarDelCarrito = (id) => {
      // Leer el carrito actual desde localStorage
  const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

  // Filtrar para excluir el producto con el ID proporcionado
  const carritoActualizado = carritoActual.filter((item) => item.id !== id);

  // Actualizar el localStorage con el carrito modificado
  localStorage.setItem("carrito", JSON.stringify(carritoActualizado));

  // Actualizar el estado del carrito
  setCarritoStorage(carritoActualizado);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalCarrito = (Array.isArray(carritoStorage) ? carritoStorage : []).reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  return (
    <carritoContext.Provider value={{ carrito, setCarrito, agregarAlCarrito,eliminarDelCarrito, vaciarCarrito,totalCarrito }}>
      {children}
    </carritoContext.Provider>
  );
}

export const useMyCarritoContext = () => {
  const context = useContext(carritoContext);
  if(!context) {
    throw new Error("Inicie sesion para realizar este paso");
  }
  return context;
} 