import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { NavLink} from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'


class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu icon='labeled'>
        <Menu.Item
          as={NavLink} to="/"
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          <Icon name='home'/>
          Home
        </Menu.Item>
        <Menu.Item
          as={NavLink} to="/login"
          name='login'
          active={activeItem === 'login'}
          onClick={this.handleItemClick}
        >
          <Icon name='sign in alternate'/>
          Sign in
        </Menu.Item>
        <Menu.Item
          as={NavLink} to="/signup"
          name='signup'
          active={activeItem === 'signup'}
          onClick={this.handleItemClick}
        >
          <Icon name='plus'/>
          Register
        </Menu.Item>
        <Menu.Item
          as={NavLink} to="/tetris"
          name='tetris'
          active={activeItem === 'tetris'}
          onClick={this.handleItemClick}
        >
          <Icon name='gamepad'/>
          Tetris
        </Menu.Item>


        {/* menu position right starts elements on right side of navbar */}
        <Menu.Menu position='right'>
          <Menu.Item
            as={NavLink} to="/logout"
            name='logout'
            active={activeItem === 'logout'}
            onClick={() => signOut(getAuth())}
          >
            <Icon name='sign out alternate'/>
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Navbar;