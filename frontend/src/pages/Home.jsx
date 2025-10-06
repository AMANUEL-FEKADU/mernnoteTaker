import React from 'react'
import Navbar from '../components/Navbar'
import vi from '../assets/o.mp4'
import { ReactTyped } from "react-typed";
 
function Home() {
async function fetchNotes(){

  
    try {
      const res=await fetch("http://localhost:5000/api/notes")
      const data=await res.json()
      console.log(data)

    } catch (error) {
      console.log(error)
      
    }
  }
  fetchNotes()
  return (
    <div>
        <Navbar/>
        <div className='im'>
           <video src={vi}  autoPlay loop muted ></video>
        </div>
       <div>
        <div className='hom'>
            <h1>BLUE NOTES</h1>
       
    </div> 
     <div className='text'>
            <p className='ph'>
                a place to store your{' '} 
                <ReactTyped strings={['notes','thoughts','memories']}
                    typeSpeed={30}
                    backSpeed={30}
                    loop
                    />
            </p>
           
        </div>
        <div>
              <h3>Where ideas come alive</h3>
        </div>
           
        </div>


        </div>
  )
}

export default Home