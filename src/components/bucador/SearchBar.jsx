import React, { useState } from "react";
import useSearch from "./useSearch";
import { TextField, CircularProgress, List, ListItem, Paper, Box, Divider } from "@mui/material";
import Popper from "@mui/material/Popper";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { results, loading } = useSearch(query);
  const router = useRouter();

  const handleViewDetails = (id) => {
    setQuery(""); 
    router.push(`/product/${id}`);
    
  };
  return (
    <Box style={{ position: "relative", width:{xs:"16rem"}, height:"4rem",display:"flex", justifyContent:"start", alignItems:"center"}}>
      {/* Input de búsqueda */}
      <TextField
        id="search-input"
        variant="outlined"
        placeholder="Buscar artículos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ backgroundColor: "white", borderRadius:"30px", height:"2.5rem",width:{xs:"90%",md:"100%"}, display:"flex", justifyContent:"center", alighItems:"center"
      ,  "& .MuiOutlinedInput-root": { border: "none" },
      "& .MuiOutlinedInput-notchedOutline": { border: "none" }, 
      "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" }, }}
      />

      {/* Loader si está cargando */}
      {loading && <CircularProgress size={24} sx={{ position: "absolute", right: 10, top: 10 }} />}

      {/* Mostrar resultados en un dropdown */}
      {results.length > 0 && (
      <Popper
      open={results.length > 0}
      anchorEl={document.getElementById("search-input")}
      placement="bottom-start"
      sx={{
        position:"sticky",
        zIndex: 1200, // 🔥 Para que esté sobre todo
        width: "100%",
        maxHeight: "20rem",
        overflowY: "auto",
        marginTop:{xs:"4rem",md:"6rem"}
      }}
    >
      <Paper>
        <List>
          {results.map((item) => (
            <ListItem key={item.id} button onClick={() => handleViewDetails(item.id)}>
              {item.nombre}
            </ListItem>
          ))}
          <Divider/>
        </List>
      </Paper>
    </Popper>
      )}
    </Box>
  );
};

export default SearchBar;
