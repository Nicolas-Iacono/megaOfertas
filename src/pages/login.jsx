import { Grid2, Typography } from '@mui/material';
import LoginAdminForm from '../pages/user/LoginAdminForm';
import UserForm from '@/components/formularios/UserForm';
import { useState } from 'react';
import { useMyUserContext } from "@/context/userContext";

export default function LoginPage() {
    const {user, setUser, isUser,isAdmin} = useMyUserContext();

    const[registerView, setRegisterView] = useState(false)

    const toggleView = () =>{
    if(!registerView){
        setRegisterView(true);
    }else{
        setRegisterView(false);
    }
    }
    return (
        <Grid2
          container
          sx={{
            backgroundColor: "#e8621d",
            position: "absolute",
            height: "100%",
            top: 0,
            width: "100%",
            left: 0,
            padding: 0,
            boxSizing: "border-box",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {registerView ? (
            <Grid2 sx={{display:"flex", flexDirection:"column"}}>
              <UserForm />
              <Typography
                onClick={toggleView}
                variant="body2"
                sx={{
                  color: "white",
                  margin: "20px auto",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                Ya tengo una cuenta
              </Typography>
            </Grid2>
          ) : (
            < Grid2 sx={{display:"flex", flexDirection:"column"}}>
              <LoginAdminForm />
              <Typography
                onClick={toggleView}
                variant="body2"
                sx={{
                  color: "white",
                  margin: "20px auto",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                Aún no estoy registrado
              </Typography>
            </Grid2>
          )}
        </Grid2>
      );
    }
    
    LoginPage.getLayout = function getLayout(page) {
      return page;
    };