// pages/_app.js
import Layout from "../components/Layout";
import {UserContextProvider} from "../context/userContext.jsx";
import { CategoryContextProvider } from "@/context/categoryContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CarritoContextProvider } from "@/context/carritoContext";

export default function MyApp({ Component, pageProps }) {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#e8621d",
      },
    },
  });

  return (
  
    <ThemeProvider theme={theme}>
<CategoryContextProvider>
<CarritoContextProvider>

      <UserContextProvider>

            <Layout>
                <Component {...pageProps} />
            </Layout>
        

      </UserContextProvider>
      </CarritoContextProvider>

</CategoryContextProvider>
</ThemeProvider>
  );
}
