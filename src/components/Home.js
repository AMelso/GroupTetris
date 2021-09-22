import { useAuthState } from '../firebase'

export const Home = () => {
  const { user } = useAuthState() // Returns user object, can access user.UID from that.
  
  return (
    <>
      <h1>Welcome {user?.email}</h1>
    </>
  )
}
