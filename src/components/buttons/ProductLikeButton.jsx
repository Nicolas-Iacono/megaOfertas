import { IconButton, CircularProgress } from "@mui/material";
import API from "../../utils/api";
import useHasLiked from "./useHasLiked";

const ProductLikeButton = ({ productId, userId }) => {
  const { hasLiked, setHasLiked, loading, error } = useHasLiked(userId, productId);

  const handleLikeToggle = async () => {
    if (!userId || !productId) {
      console.error("Error: Faltan parámetros necesarios para alternar el like.");
      return;
    }
  
    try {
      if (hasLiked) {
        // Eliminar el like
        await API.delete("http://localhost:5000/like/", {
          data: { userId, productId },
        });
        setHasLiked(false); // Actualizar estado solo si la operación fue exitosa
      } else {
        // Agregar el like
        await API.post("http://localhost:5000/like/", { userId, productId });
        setHasLiked(true); // Actualizar estado solo si la operación fue exitosa
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
  
      if (errorMessage === "Ya diste like a este producto.") {
        console.warn("El servidor detectó que el producto ya tiene like.");
        setHasLiked(true); // Sincroniza el estado con el backend
      } else {
        console.error(`Error al ${hasLiked ? "quitar" : "dar"} like:`, errorMessage);
      }
    }
  };
  

  if (loading) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <IconButton
      sx={{
        width: "3rem",
        height: "3rem",
        border: "3px solid orange",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: hasLiked ? "orange" : "transparent",
        color: "orange",
      }}
      onClick={handleLikeToggle}
    >
      <img
        src={hasLiked ? "/iconos/corazon.svg" : "/iconos/corazonNaranja.png"}
        width="20px"
        alt="Like Icon"
      />
    </IconButton>
  );
};

export default ProductLikeButton;
