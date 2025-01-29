import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: null,
    token: null,
    first_name: null,
    last_name: null,
    authorities:[]
  });
console.log(user);
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    try {
      const userStorage = localStorage.getItem("user");
      if (userStorage) {
        const user = JSON.parse(userStorage);
        setUser(user);
        setIsLogged(true);
  
        // Verificar si el usuario tiene el rol ADMIN
        if (!user.authorities.includes("ROLE_ADMIN")) {
          setIsAdmin(false);
          setIsUser(true); // Si es admin, no debe ser tratado como usuario común
        } else {
          setIsAdmin(true);
          setIsUser(false); // Si no es admin, es un usuario común
        }
  

      }
    } catch (error) {
      console.error("Error al obtener el usuario del localStorage:", error);
    }
  }, []);

        useEffect(() => {
          console.log("Estado actualizado -> Es admin:", isAdmin);
          console.log("Estado actualizado -> Es usuario común:", isUser);
        }, [isAdmin, isUser]);


  const login =  (token, email) =>{
    const decoded = jwtDecode(token);
    
  }


  
  const logout = () => {
    localStorage.clear();
    setUser({ email: "", token: "" });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, isUser,isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useMyUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  return context;
};
