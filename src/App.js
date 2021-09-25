import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import { Home } from './components/Home'
import { SignUp } from './components/authentication/SignUp'
import { Login } from './components/authentication/Login'
import  Navbar  from './components/navbar/Navbar'
import { AuthContextProvider, useAuthState } from './firebase' // set in ./firebase.js file
import Tetris from './components/tetris/Tetris'



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
          {/* <AuthenticatedRoute exact path="/profile" component={Profile} />
          <AuthenticatedRoute exact path="/upgrade" component={Upgrade} />
          <AuthenticatedRoute exact path="/leaderboard" component={Leaderboard} /> */}
          <Route exact path="/signup" render={(props) => <SignUp {...props} />} />

          
          <UnauthenticatedRoute exact path="/login" component={Login} />
      </Router>
    </AuthContextProvider>
  )
}

export default App
