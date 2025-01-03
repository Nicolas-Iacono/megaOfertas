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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SelectAPI from "./selectCategoria"; // Asegúrate de importar correctamente
import axios from "axios";

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
});

const ProductoForm = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      marca: "",
      stock: 0,
      precioLista: 0,
      precioVenta: 0,
      descripcion: "",
      imagenes: [""],
      categoriaId: "", // Inicializa en vacío
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/products/crear-producto",
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "80%",
        padding: 2,
      }}
    >
      <Typography variant="h4">Crear Producto</Typography>
      <form onSubmit={formik.handleSubmit}>
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
        <TextareaAutosize
          minRows={4}
          placeholder="Descripción del Producto"
          name="descripcion"
          value={formik.values.descripcion}
          onChange={formik.handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
        <Typography variant="h6">Seleccionar Categoría</Typography>
        <SelectAPI onSelect={handleCategorySelect} />
        {formik.touched.categoriaId && formik.errors.categoriaId && (
          <Typography color="error">{formik.errors.categoriaId}</Typography>
        )}
        <Typography variant="h6">Imágenes</Typography>
        {formik.values.imagenes.map((imagen, index) => (
          <Box key={index}>
            <TextField
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
        <Button type="submit" variant="contained" color="primary">
          Crear Producto
        </Button>
      </form>
    </Box>
  );
};

export default ProductoForm;
