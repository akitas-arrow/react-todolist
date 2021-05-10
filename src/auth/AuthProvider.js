import React,{useEffect, useState} from 'react'
import { auth } from '../firebase/index'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser ] = useState(null);
  const login = async (email, password , history) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }

  const signup = async (email, password, history) => {
    try {
    await auth.createUserWithEmailAndPassword(email, password);
    history.push("/");
    } catch(error) {
      alert(error);
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser)
  },[])

  return (
    <AuthContext.Provider
      value={{
        login: login,
        signup: signup,
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}