import { useState, useEffect } from "react";
import API from "../../utils/api";

const useHasLiked = (userId, productId) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLike = async () => {
      if (!userId || !productId) {
        console.error("Error: Faltan parámetros necesarios para verificar el like.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await API.get(`like/products/${productId}/likes/${userId}`);
        console.log("Respuesta del servidor:", response.data); // Log para verificar
        setHasLiked(response.data.hasLiked);
      } catch (error) {
        setError(error.response?.data?.message || "Error al verificar el like.");
      } finally {
        setLoading(false);
      }
    };
  
    checkLike();
  }, [userId, productId]);
  

  return { hasLiked, setHasLiked, loading, error };
};

export default useHasLiked;
