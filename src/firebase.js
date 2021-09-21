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

export const AuthContext = createContext() // Creates context (global state)

export const AuthContextProvider = props => {
  const [user, setUser] = useState() // Stores user information
  const [error, setError] = useState() // Stores error related to user

  useEffect(() => { // Runs on app mount
    // onAuthStateChanged == Event listener, only needs to be called once and then updates in real time.
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError) // Not sure, I believe this updates setUser and setError with auth information based on onAuthStateChanged
    return () => unsubscribe() // What is running unsubscribe as a function doing here?
    // Suspect that unsubscribe refreshes auth state based on what is happening in the browser
  }, [])
  return <AuthContext.Provider value={{ user, error }} {...props} /> // Provides user and error state to all child components
}

export const useAuthState = () => {
  const auth = useContext(AuthContext)
  return { ...auth, isAuthenticated: auth.user != null }
  // useAuthState.isAuthenticated == user state exists or doesn't exist (boolean value) from AuthContextProvider
}
