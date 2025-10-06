import React from 'react'
import Home from './Home'
import { Link } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
function Register() {
  return (
    <div>
           
         <div>
        <Home/>
        
        </div>
        
    <div className='main'>
          
        <div className='autho'>
               <div className='backh'>
        <Link to={'/'}>
        <button>  <ArrowLeftIcon/>Back to Home</button>
        </Link>
        </div>
            <form>
              
                <div className='insert'>
                <label htmlFor="">Name</label>
                <input type="text"  required/> <br /> <br />
                <label htmlFor="">email</label>
                <input type="email" required /> <br /> <br />
                <label htmlFor="">password</label>
                <input type="password" required /> <br /> <br />
               
                </div>
                
                <div className='butt'>
                   <button>sign up</button>
                
                </div>
            </form>

        </div>
       </div>
    </div>
  )
}

export default Register