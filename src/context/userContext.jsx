import { createContext, useContext, useState } from "react";
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


  const login =  (token, email) =>{
    const decoded = jwtDecode(token);
    
  }


  
  const logout = () => {
    localStorage.clear();
    setUser({ email: "", token: "" });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
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
