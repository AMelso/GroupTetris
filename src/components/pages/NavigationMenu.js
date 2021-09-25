import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { NavLink} from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../..//firebase'
const NavigationMenu = () => {
    const { user } = useAuthState() ;

    return (
        <Menu icon='labeled'>
        <Menu.Item as={NavLink} exact to="/"><Icon name='home'/>Home</Menu.Item>
        { (!user) ? 
        <><Menu.Item as={NavLink} exact to="/login"><Icon name='sign in alternate'/>Login </Menu.Item>
          <Menu.Item as={NavLink} exact to="/signup"><Icon name='plus'/> Register</Menu.Item>
          </>
        :
       <> <Menu.Item as={NavLink} exact to="/profile"><Icon name='user'/>Profile</Menu.Item>
          <Menu.Item as={NavLink} exact to="/tetris"><Icon name='gamepad'/> Tetris</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item onClick={() => signOut(getAuth())} ><Icon name='sign out alternate'/>Logout</Menu.Item>
            </Menu.Menu></>
            }
        </Menu>
      )
    }

export default NavigationMenu;