<<<<<<< HEAD:src/components/Pages/Home.js
import { useAuthState } from '../../firebase'
=======
import { useAuthState } from '../firebase'
import TetrisDemo from './tetrisDemo/Tetris'
>>>>>>> 9bdd5bb1d38cadff5c7c2ded875f61b609b8f2f5:src/components/Home.js

export const Home = () => {
  const { user } = useAuthState() // Returns user object, can access user.UID from that.
  
  return (
    <>
      <h1>Welcome {user?.email}</h1>
      <TetrisDemo />
    </>
  )
}
