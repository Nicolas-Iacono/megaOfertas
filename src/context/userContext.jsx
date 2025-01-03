import { createContext, useContext, useState, useEffect } from 'react';

const userContextGlobal = createContext();

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState({
    email : '',
    authorities: [],
  })

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setUser({
        email,
        authorities: [],
      });
    }
  }, []); 
  

  return (
    <userContextGlobal.Provider value={{ user, setUser }}>
      {children}
    </userContextGlobal.Provider>
  );
}

export const useMyUserContext = () => {
  const context = useContext(userContextGlobal);
  if(!context) {
    throw new Error("Inicie sesion para realizar este paso");
  }
  return context;
} 