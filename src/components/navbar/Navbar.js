import { useAuthState } from '../../firebase'
import AuthNavBar from './authNavBar'
import UnAuthNavBar from './unAuthNavBar'

// Icon names found at https://semantic-ui.com/elements/icon.html#status


const Navbar = () => {
  
  const { isAuthenticated } = useAuthState()

  //function to retrieve the authBar or unAuthBar
  const renderedNavbar = () => {
    // If user is authenticated render necessary links if not render necessary links.
    if (isAuthenticated === true)
    // is logged in
      return (
        AuthNavBar()
      )
    // is not logged in
    else
      return (
        UnAuthNavBar()
      )
    }

    //return value of function deciding between which bars
    return (
      renderedNavbar()
    )
  
}

export default Navbar;