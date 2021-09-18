import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import { Home } from './Home'
import { SignUp } from './SignUp'
import { Login } from './Login'
import { AuthContextProvider, useAuthState } from './firebase'
import Tetris from './components/Tetris'

const AuthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState()
  console.log(`AuthenticatedRoute: ${isAuthenticated}`)
  return (
    <Route
      {...props}
      render={routeProps =>
        isAuthenticated ? <C {...routeProps} /> : <Redirect to="/login" />
      }
    />
  )
}

const UnauthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState()
  console.log(`UnauthenticatedRoute: ${isAuthenticated}`)
  return (
    <Route
      {...props}
      render={routeProps =>
        !isAuthenticated ? <C {...routeProps} /> : <Redirect to="/" />
      }
    />
  )
}

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <AuthenticatedRoute exact path="/tetris" component={Tetris} />
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
