import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import { Home } from './components/Home'
import { SignUp } from './components/authentication/SignUp'
import { Login } from './components/authentication/Login'
import { AuthContextProvider, useAuthState } from './firebase' // set in ./firebase.js file
import Tetris from './components/tetris/Tetris'
import NavBar from './components/pages/NavBar'
import ProfilePage from './components/pages/Profile'
import ChangePassword from './components/pages/ChangePassword'
import Blogs from './components/pages/Blogs'



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
          {/* Next 4 lines need to go in it's own Navbar component */}
          <div className="container">
          <NavBar/>
          <AuthenticatedRoute exact path="/" component={Home} />
          <AuthenticatedRoute exact path="/tetris" component={Tetris} />
          <AuthenticatedRoute exact path="/profile" component={ProfilePage} />
          <AuthenticatedRoute exact path="/change-password" component={ChangePassword}/>
          <AuthenticatedRoute exact path="/blogs" component={Blogs}/>
          <UnauthenticatedRoute exact path="/signup" component={SignUp} />
          <UnauthenticatedRoute exact path="/login" component={Login} />
          </div>
      </Router>
    </AuthContextProvider>
  )
}

export default App
