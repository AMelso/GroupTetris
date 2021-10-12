import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import { Home } from './components/Pages/Home'
import { UpgradeCards } from './components/Pages/Upgrade'
import { SignUp } from './components/authentication/SignUp'
import { Login } from './components/authentication/Login'
import  Navbar  from './components/navbar/Navbar'
import { AuthContextProvider, useAuthState } from './firebase' // set in ./firebase.js file
import ProfilePage from './components/Pages/Profile'
import ChangePassword from './components/Pages/ChangePassword'
import LeaderBoard from './components/Pages/LeaderBoard'

import Tetris from './components/tetris/Tetris'
import Forum from './components/Pages/Forum'
import AddForum from './components/Pages/AddForum'
import EditForum from './components/Pages/EditForum'
// import TetrisDemo from './components/tetrisDemo/Tetris'



// C is a placeholder for passed component from route tree. 
const AuthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState() // isAuthenticated returns Boolean, pulled from useAuthState().isAuthenticated
  
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

const redirect = (props) => {
  props.history.push("/upgrade"); 
}

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
          <div className="container">
          <Navbar/>
          <AuthenticatedRoute exact path="/" component={Home} />
          <AuthenticatedRoute exact path="/tetris" component={Tetris} redirect={redirect}/>
          <AuthenticatedRoute exact path="/forum/add" component={AddForum} />
          <AuthenticatedRoute exact path="/forum/:id/edit" component={EditForum} />
          <AuthenticatedRoute exact path="/forum" component={Forum} />
          <AuthenticatedRoute exact path="/profile" component={ProfilePage} />
          <AuthenticatedRoute exact path="/upgrade" component={UpgradeCards} />
          <AuthenticatedRoute exact path="/leaderboard" component={LeaderBoard} />
          <AuthenticatedRoute exact path="/change-password" component={ChangePassword}/>
          <Route exact path="/signup" render={(props) => <SignUp {...props} />} />

          
          <UnauthenticatedRoute exact path="/login" component={Login} />
          </div>
      </Router>
    </AuthContextProvider>
  )
}

export default App
