import { Grid2 } from '@mui/material';
import { styled } from '@mui/material/styles';

const Fondo = styled(Grid2) (({theme}) =>  ({
  backgroundColor: "rgb(237, 237, 237)",
  // Asegura que ocupa el alto de la pantalla
   marginLeft:"0px",
   position:"absolute",
   left: 0,
   width:"100%",
   flex: "1",
   zIndex:"-1",
   top: "50px",
   [theme.breakpoints.down("sm")]: {
    height: "160vh", // Para pantallas pequeñas (móviles)
  },

}));



export default function CustomGrid({ children }) {
  return (
    <Fondo justifyContent="center" alignItems="center">
      {children}
    </Fondo>
  );
}