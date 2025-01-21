import { createContext, useContext, useState, useEffect } from 'react';

const carritoContext = createContext();

export const CarritoContextProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Cargar el carrito desde localStorage al montar el componente
  useEffect(() => {
    const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoInicial);
  }, []);

  // Sincronizar el estado del carrito con localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    if (!producto || !producto.id) return; // Validar el producto

    const carritoActualizado = [...carrito];
    const productoExistente = carritoActualizado.find((item) => item.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += 1; // Incrementar cantidad si existe
    } else {
      carritoActualizado.push({ ...producto, cantidad: 1 }); // Agregar nuevo producto
    }

    setCarrito(carritoActualizado);
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
    const carritoActualizado = carrito.filter((item) => item.id !== id);
    setCarrito(carritoActualizado);
  };

  // Vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Calcular el total del carrito
  const totalCarrito = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  return (
    <carritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        totalCarrito,
        setCarrito
      }}
    >
      {children}
    </carritoContext.Provider>
  );
};

export const useMyCarritoContext = () => {
  const context = useContext(carritoContext);
  if (!context) {
    throw new Error("El contexto de carrito no está disponible.");
  }
  return context;
};
