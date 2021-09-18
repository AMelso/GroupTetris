import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import { Home } from './components/Home'
import { SignUp } from './components/authentication/SignUp'
import { Login } from './components/authentication/Login'
import { AuthContextProvider, useAuthState } from './firebase' // set in ./firebase.js file



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

function App() {
  return (
    <AuthContextProvider>
      <Router>
          {/* Next 4 lines need to go in it's own Navbar component */}
          <div>
            <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{' '}
            <Link to="/signup">SignUp</Link> | <Link to="/tetris">Tetris!</Link> |{' '}
          </div>
          <AuthenticatedRoute exact path="/" component={Home} />
          <UnauthenticatedRoute exact path="/signup" component={SignUp} />
          <UnauthenticatedRoute exact path="/login" component={Login} />
      </Router>
    </AuthContextProvider>
  )
}

export default App
