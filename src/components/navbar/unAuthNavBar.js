import { Icon, Menu } from 'semantic-ui-react'
import { NavLink} from 'react-router-dom'

// Icon names found at https://semantic-ui.com/elements/icon.html#status

const UnAuthNavBar = () => {

  return (
    <Menu icon='labeled'>
      {/* first item, give link, and component name (dev tools menu item name) */}
      {/* <Menu.Item
        as={NavLink} exact to="/"
        name='home' */}
        {/* // add a divider for html txt
      // > */}
        {/* set icon by name from icon names url */}
        {/* <Icon name='home'/> */}
        {/* text to label navbar menu item */}
        {/* Home
      </Menu.Item> */}
      <Menu.Item
        as={NavLink} exact to="/login"
        name='login'
      >
        <Icon name='sign in alternate'/>
        Login
      </Menu.Item>
      <Menu.Item
        as={NavLink} exact to="/signup"
        name='signup'
      >
        <Icon name='plus'/>
        Register
      </Menu.Item>
    </Menu>
  )
}

export default UnAuthNavBar