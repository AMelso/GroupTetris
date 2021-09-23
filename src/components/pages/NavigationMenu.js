import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from '../../firebase';
import icon  from '../../img/4453896.png';
const NavigationMenu = () => {
    const { user } = useAuthState() ;
    const[open,setOpen] = useState(false);
    return (
        <>
        {/*  set up navigation menu while using bootstrap classes */}
<nav className="navbar navbar-expand-lg  border">
<div className="container">
    <span className="navbar-brand"></span>
    {/* html will show icon for  menu icon for mobile version  and able to toggle nav menu when using button  */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" onClick={(e)=>{setOpen(!open)}}>
                {/* image for the icome  and imported image from img directory and created image folder  */}
                <img src={icon} alt=""/>
            </span>
        </button>
{/* bootsnip code from bootstrap4 navbar  */} 
{/* we are showing and hiding navigation in mobile version */}
{/* always show navigation in desktop version */}
<div className={open === true ? "collapse navbar-collapse show" : "collapse navbar-collapse"}  id="navbarText">

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

export default NavigationMenu
