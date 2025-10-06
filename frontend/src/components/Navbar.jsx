import React, { useState, useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom'

function Navbar() {

  const navigate=useNavigate();
  const[logged, setLogged]=useState(false)

   useEffect(() => {
    const token = localStorage.getItem('token');
    setLogged(!!token);
  }, []);

  const handleLogout = () => {
    if(!window.confirm("sure you want to log out"))return
    localStorage.removeItem('token');
    setLogged(false);
    navigate('/'); 
  };


  return (
    <div className='navbardiv'>
      <h1 style={{color:"gray"}}>BLUE NOTES</h1>
      <nav className="navbar">
        <ul className='nav-ul'>
    <li> < Link to='/'>Home</Link></li> 
  
      <li>  < Link to='/Notes'>Notes</Link></li> 
     
     
     </ul>
    </nav>
    {logged? (
      <button className='sign' onClick={handleLogout}>Log out</button>
    ):(
     <button className='sign'> <Link to='/signup'>Get Started</Link></button>
    )}
  </div>
    
  )
}

export default Navbar