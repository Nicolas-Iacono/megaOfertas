import { Grid2 } from '@mui/material';
import { styled } from '@mui/material/styles';

const Fondo = styled(Grid2) (({theme}) =>  ({
  backgroundColor: "#ededed",
  minHeight: '100vh', // Asegura que ocupa el alto de la pantalla
  marginLeft:"0px",
  position:"absolute",
  left: 0,
  width:"100%",
  zIndex:"-1"
}));



export default function CustomGrid({ children }) {
  return (
    <Fondo justifyContent="center" alignItems="center">
      {children}
    </Fondo>
  );
}