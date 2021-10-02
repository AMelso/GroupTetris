import { useAuthState } from '../../firebase'
import TetrisDemo from '../tetris/tetrisDemo/Tetris'

export const Home = () => {
  const { user } = useAuthState() // Returns user object, can access user.UID from that.
  
  return (
    <>
      <h1>Welcome, {user?.displayName}<br/>Email: ({user?.email})</h1>
      <TetrisDemo />
    </>
  )
}
