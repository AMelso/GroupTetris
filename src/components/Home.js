import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase'

export const Home = () => {
  const { user } = useAuthState() // Returns user object, can access user.UID from that.
  
  return (
    <>
      <h1>Welcome {user?.email}</h1>
      <button onClick={() => signOut(getAuth())}>Sign out</button> 
      {/* Need to move Sign out button to NavBar */}
    </>
  )
}
