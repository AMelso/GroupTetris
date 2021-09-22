import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from '../../firebase';

const NavBar = () => {
    const { user } = useAuthState() ;
    console.log();
    return (
        <>
        
<nav className="navbar navbar-expand-lg  border">
<div className="container">
    <span className="navbar-brand"></span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

<div className="collapse navbar-collapse"  id="navbarText">

    <ul className="navbar-nav mr-auto">
        <li> <Link to="/" className="nav-link">Home</Link></li>
        {(!user ) && 
        <><li> <Link to="/login" className="nav-link">Login</Link> {' '}</li>
        <li> <Link to="/signup" className="nav-link">SignUp</Link> </li>
        </>
        }
        <li> <Link to="/tetris"className="nav-link" >Tetris!</Link> {' '}</li>
        <li><Link to="/profile" className="nav-link">Profile</Link> {' '}</li>
    </ul>
    </div>
    </div>
    </nav>
    </>
    )
}

export default NavBar
