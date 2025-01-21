import { Grid2 } from '@mui/material';
import { styled } from '@mui/material/styles';

const Fondo = styled(Grid2) (({theme}) =>  ({
  backgroundColor: "#ededed",
 // Asegura que ocupa el alto de la pantalla
  marginLeft:"0px",
  position:"absolute",
  left: 0,
  width:"100%",
   flex: "1",
  zIndex:"-1",
  top: "50px",
  height:"100%",
}));



export default function CustomGrid({ children }) {
  return (
    <Fondo justifyContent="center" alignItems="center">
      {children}
    </Fondo>
  );
}