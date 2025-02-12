import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  TextareaAutosize,
  IconButton,
  CardMedia
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import SelectAPI from "./selectCategoria"; 
import SwitchDisponibility from "./buttons/SwitchDisponibility";
import API from "@/utils/api";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  marca: Yup.string().required("La marca es obligatoria"),
  stock: Yup.number()
    .required("El stock es obligatorio")
    .min(0, "El stock debe ser mayor o igual a 0"),
  precioLista: Yup.number()
    .required("El precio de lista es obligatorio")
    .min(0, "El precio debe ser mayor o igual a 0"),
  precioVenta: Yup.number()
    .required("El precio de venta es obligatorio")
    .min(0, "El precio debe ser mayor o igual a 0"),
  descripcion: Yup.string().required("La descripción es obligatoria"),
  imagenes: Yup.array()
    .of(Yup.string().url("Debe ser una URL válida"))
    .min(1, "Debe agregar al menos una imagen"),
  categoriaId: Yup.number().required("La categoría es obligatoria"),
  disponible: Yup.boolean().required("La disponibilidad es obligatoria"),
});

const ProductoForm = () => {
const [view, setView] = useState(false);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      marca: "",
      stock: 0,
      precioLista: 0,
      precioVenta: 0,
      descripcion: "",
      categoriaName:'',
      categoriaId: "", // Inicializa en vacío
      imagenes: [""],
      disponible: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await API.post(
          "products/crear-producto",
          values
        );
        console.log("Producto creado exitosamente:", response.data);
        alert("Producto creado exitosamente");
      } catch (error) {
        console.error("Error al crear el producto:", error);
        alert("Hubo un error al crear el producto");
      }
    },
  });


  const handleCategorySelect = (categoryId) => {
    formik.setFieldValue("categoriaId", categoryId); // Actualiza el valor en formik
  };

  const handleAddImageField = () => {
    formik.setFieldValue("imagenes", [...formik.values.imagenes, ""]);
  };

  const handleRemoveImageField = (index) => {
    const newImages = formik.values.imagenes.filter((_, i) => i !== index);
    formik.setFieldValue("imagenes", newImages);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    formik.setFieldValue("imagenes", imageUrls);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        padding: 2,
        height: "90%",
        justifyContent: "flex-start", // El formulario crece hacia abajo
        position: "relative",
        marginTop: formik.values.imagenes.length > 0 ? "2rem" : "0", // Solo agrega espacio extra cuando hay imágenes
      transition: "margin-top 0.3s ease", // Transición suave
        marginBottom:{xs:"4rem", md:"0px"}
        
      }}
    >
      <Typography variant="h4" sx={{color:"black"}}>Crear Producto</Typography>
      <Box     sx={{
      marginTop: formik.values.imagenes.length > 0 ? "1rem" : "0", // Solo agrega espacio extra cuando hay imágenes
      transition: "margin-top 0.3s ease", // Transición suave
      width: "100%",
      border:{xs:"none", md:"1px solid black"},
      borderRadius:"10px",
      padding:{xs:0,md:2},
    }}
>
      <form onSubmit={formik.handleSubmit}>
       <Box sx={{display:"flex", flexDirection:{xs:"column",md:"row"},gap:2}}>

        <TextField
          label="Nombre"
          name="nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          error={formik.touched.nombre && Boolean(formik.errors.nombre)}
          helperText={formik.touched.nombre && formik.errors.nombre}
        />
        <TextField
          label="Marca"
          name="marca"
          value={formik.values.marca}
          onChange={formik.handleChange}
          error={formik.touched.marca && Boolean(formik.errors.marca)}
          helperText={formik.touched.marca && formik.errors.marca}
        />
        <TextField
          type="number"
          label="Stock"
          name="stock"
          value={formik.values.stock}
          onChange={formik.handleChange}
          error={formik.touched.stock && Boolean(formik.errors.stock)}
          helperText={formik.touched.stock && formik.errors.stock}
        />
        <TextField
          type="number"
          label="Precio de Lista"
          name="precioLista"
          value={formik.values.precioLista}
          onChange={formik.handleChange}
          error={formik.touched.precioLista && Boolean(formik.errors.precioLista)}
          helperText={formik.touched.precioLista && formik.errors.precioLista}
        />
        <TextField
          type="number"
          label="Precio de Venta"
          name="precioVenta"
          value={formik.values.precioVenta}
          onChange={formik.handleChange}
          error={formik.touched.precioVenta && Boolean(formik.errors.precioVenta)}
          helperText={formik.touched.precioVenta && formik.errors.precioVenta}
        />
        </Box>
        <Box sx={{width:{xs:"100%", md:"100%"},marginTop:"1rem", gap:2, display:"flex", flexDirection:{xs:"column", md:"row"}, justifyContent:{md:"space-between"}, height:{md:"auto"}}}>

        <Box sx={{display:"flex", flexDirection:"column",gap:2, width:{xs:"100%",md:"60%"}}}>
        <Typography variant="h6" sx={{color:"black"}}>Agregar descripcion</Typography>
        <TextareaAutosize
          minRows={4}
          placeholder="Descripción del Producto"
          name="descripcion"
          value={formik.values.descripcion}
          onChange={formik.handleChange}
          style={{width:"100%", borderRadius:"11px", padding:"10px", height:"auto"}}
        />
        </Box>
          <Box sx={{height:{md:"15rem",xs:"100%"}, display:"flex", justifyContent:"start", alignItems:{xs:"center",md:"center"},flexDirection:{xs:"column",}}}>
            <Box sx={{display:"flex", justifyContent:{xs:"center",md:"start"}, alignItems:{xs:"center",md:"center"}, flexDirection:{xs:"column"}, padding:1, gap:1, backgroundColor:"rgb(255, 106, 19)", borderRadius:3, width:{xs:"100%",md:"15rem"}}}>
            <Typography variant="h6" sx={{color:"white"}}>
              Habilitar
            </Typography>
            
            <SwitchDisponibility 
              checked={formik.values.disponible} 
              onChange={() => formik.setFieldValue("disponible", !formik.values.disponible)} 
              />
            </Box>
           

          </Box>
        </Box>
        <Box>

        <Typography variant="h6" sx={{color:"black"}}>Seleccionar Categoría</Typography>
        <SelectAPI onSelect={handleCategorySelect} />
        {formik.touched.categoriaId && formik.errors.categoriaId && (
          <Typography color="error">{formik.errors.categoriaId}</Typography>
        )}
        </Box>
        <Box>
        <Typography variant="h6" sx={{color:"black"}}>Agregar imágenes de producto</Typography>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          style={{ margin: '10px 0' }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {formik.values.imagenes.map((imagen, index) => (
            <CardMedia
              key={index}
              component="img"
              image={imagen}
              alt={`Imagen ${index + 1}`}
              sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
            />
          ))}
        </Box>
        {formik.values.imagenes.map((imagen, index) => (
          <Box key={index}>
            <TextField
              sx={{marginTop:"1rem"}}
              label={`Imagen URL ${index + 1}`}
              value={imagen}
              onChange={(e) =>
                formik.setFieldValue(
                  `imagenes[${index}]`,
                  e.target.value
                )
              }
            />
            <IconButton onClick={() => handleRemoveImageField(index)}>
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Button onClick={handleAddImageField}>Agregar Imagen</Button>
        </Box>
        <Box sx={{ width:"100%",display:"flex",justifyContent:{xs:"center", md:"end"},alignItems:"center"}}>
        <Button type="submit" variant="contained" color="primary">
          Crear Producto
        </Button>
        </Box>
      </form>
      </Box>
      
      
    </Box>
  );
};

export default ProductoForm;

