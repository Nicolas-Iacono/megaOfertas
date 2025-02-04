import { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import API from "@/utils/api";

const useSearch = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchData = debounce(async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/products/search?query=${query}`);
        setResults(data);
      } catch (error) {
        console.error("Error en la búsqueda:", error);
      } finally {
        setLoading(false);
      }
    }, 500); // Espera 500ms después del último input antes de ejecutar

    fetchData();
    
    return () => fetchData.cancel(); // Cancelar petición anterior si el usuario sigue escribiendo

  }, [query]);

  return { results, loading };
};

export default useSearch;
