import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { initializeApp } from 'firebase/app'
import { useState, useEffect, useContext, createContext } from 'react'

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAdM8XsvIUKvVyhu6KpXqVEr_FPuS-iWng",
  authDomain: "tetris-lite.firebaseapp.com",
  projectId: "tetris-lite",
  storageBucket: "tetris-lite.appspot.com",
  messagingSenderId: "419803347309",
  appId: "1:419803347309:web:f64debc7483edc4cf70264",
  measurementId: "G-83ETDWSEH1"
})

export const AuthContext = createContext()

export const AuthContextProvider = props => {
  const [user, setUser] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
    return () => unsubscribe()
  }, [])
  return <AuthContext.Provider value={{ user, error }} {...props} />
}

export const useAuthState = () => {
  const auth = useContext(AuthContext)
  return { ...auth, isAuthenticated: auth.user != null }
}
