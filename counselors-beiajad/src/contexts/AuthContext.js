import React, { createContext, useState, useEffect } from "react";
import decode from 'jwt-decode'
import Swal from 'sweetalert2'



export const AuthContext = createContext();

  const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [user1, setUser1] = useState({})

  const loginUser = (token) => {
    localStorage.setItem('app_token', token)
    const decoded = decode(token)
    setUser1(decoded)
    setToken(token);
    setIsAuth(true);
  };

  const logoutUser = (token) => {
    localStorage.removeItem("app_token");
    setToken({})
    setIsAuth(false);
    setUser1({})
  };
 
  const salir = () => {
    const token = localStorage.getItem("app_token");
    let dateNow = Math.floor(Date.now() / 1000);
    const decoded = decode(token)
    let timexp = decoded.exp
    if (dateNow >= timexp){
      localStorage.removeItem("app_token");
      setToken({})
      setIsAuth(false);
      setUser1({})
      Swal.fire({
        icon: 'warning',
        title: 'Tu sesión a caducado',
      })
    }
  }
  
  useEffect(() => {
    const item = localStorage.getItem("app_token");
    if (item) {
      const decoded = decode(item)
      setUser1(decoded)
      setToken(item);
      setIsAuth(true);
      salir()    
    }
  }, []);  

  return (
    <AuthContext.Provider value={{ 
      token, 
      isAuth,
      user1, 
      loginUser, 
      logoutUser
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;