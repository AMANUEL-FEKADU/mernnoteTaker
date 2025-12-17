import React from 'react'
import Home from './Home'
import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegCircleXmark } from 'react-icons/fa6';
function Autho() {
    const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate=useNavigate()

  async function handlelogin(e) {
    e.preventDefault()
    
  
  
      try {
        const res = await fetch(`http://localhost:5000/api/user/login`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({email,password})
        })

        if (!res.ok) {
          toast.error("Failed to login")
          return
          
        }

        const data = await res.json()
        localStorage.setItem("token", data.token)
         localStorage.setItem("role", data.role);
         toast.success("Login successful")
    if (data.role === "admin") {
      console.log('API response:', data);

      navigate("/admin");
    }else{
        navigate("/notes") 
    }  
      } catch (error) {
        console.error(error)
        toast.error("Error loging in")
      } 
    }


  return (
    <div>

         <div>
        <Home/>
        </div>
    <div className='main'>
        <div className='autho'>
            <form onSubmit={handlelogin}>
               <div className='x'>
                <Link to={'/'}>
                      <FaRegCircleXmark/>
                      </Link>
                    </div>
                  <div className='insert'>

                   
              
                <label htmlFor="">email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required /> <br /> <br />
                  <label htmlFor="">password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/> <br /> <br />
               
                </div>
                <Link to={'/register'}>
                    <p> are you new? <span>   register here</span></p>
                </Link>
                <div className='butt'>
                   
                <button>sign in</button> <br />
                </div>
            </form>

        </div>
       </div>
    </div>
  )
}

export default Autho