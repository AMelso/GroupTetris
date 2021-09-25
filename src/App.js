import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import { Home } from './components/Pages/Home'
import { Upgrade } from './components/Pages/Upgrade'
import { SignUp } from './components/authentication/SignUp'
import { Login } from './components/authentication/Login'
import  Navbar  from './components/navbar/Navbar'
import { AuthContextProvider, useAuthState } from './firebase' // set in ./firebase.js file
import ProfilePage from './components/Pages/Profile'
import ChangePassword from './components/Pages/ChangePassword'
import LeaderBoard from './components/Pages/LeaderBoard'

import Tetris from './components/tetris/Tetris'
// import TetrisDemo from './components/tetrisDemo/Tetris'



// C is a placeholder for passed component from route tree. 
const AuthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState() // isAuthenticated returns Boolean, pulled from useAuthState().isAuthenticated
  console.log(`AuthenticatedRoute: ${isAuthenticated}`)
  return (
    <Route
      {...props}
      render={routeProps =>
        // If user is authenticated send user to component, if not send to login
        isAuthenticated ? <C {...routeProps} /> : <Redirect to="/login" /> 
      }
    />
  )
}

// See comments for AuthenticatedRoute
const UnauthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState()
  console.log(`UnauthenticatedRoute: ${isAuthenticated}`)
  return (
    <Route
      {...props}
      render={routeProps =>
        // If user is NOT authenticated then load requested component, otherwise redirect user to home
        !isAuthenticated ? <C {...routeProps} /> : <Redirect to="/" />
      }
    />
  )
}

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
          <Navbar/>
          <AuthenticatedRoute exact path="/" component={Home} />
          <AuthenticatedRoute exact path="/tetris" component={Tetris} />
          <AuthenticatedRoute exact path="/profile" component={ProfilePage} />
          <AuthenticatedRoute exact path="/upgrade" component={Upgrade} />
          <AuthenticatedRoute exact path="/leaderboard" component={LeaderBoard} />
          <AuthenticatedRoute exact path="/change-password" component={ChangePassword}/>
          <Route exact path="/signup" render={(props) => <SignUp {...props} />} />

          
          <UnauthenticatedRoute exact path="/login" component={Login} />
      </Router>
    </AuthContextProvider>
  )
}

export default App
