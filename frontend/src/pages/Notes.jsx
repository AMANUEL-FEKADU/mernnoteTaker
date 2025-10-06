import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from "react-router-dom"
import  {PlusIcon} from "lucide-react"
import { useState } from 'react'
import { useEffect } from 'react'
import toast from "react-hot-toast"
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Notescard from './Notescard'
import { TbNotebookOff } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom'
function Notes() {
  const [notes,setNotes]=useState([])
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate()
 
 
  useEffect (()=>{

    
    const fetchNotes=async()=>{

      const token = localStorage.getItem("token");
    if (!token) {
      navigate('/signup'); 
    }
      try{
        const res=await fetch('http://localhost:5000/api/notes/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })

        const data= await res.json();
        setNotes(data)
        console.log(data)
        setLoading(false)
        if(!res.ok){
          toast.error('please try again')

        }
        
      }
      catch (error){
        console.log("error in fetching")
        toast.error("error in fetching your notes")
        setLoading(false)
      }
    }
    fetchNotes()
  },[])

  return (
    <div className='notesdiv'>
      <Navbar/>

      <div className='icone'>
        <Link to={'/create'}>
        <PlusIcon/>
        <span className='spantxt'>create</span>
      </Link>
      </div>

     <div className='notelist'>
      {loading && <div className='loading'> <AiOutlineLoading3Quarters/></div>}
      {!loading && notes.length > 0 && (
    <div className='cardcontain'>
      {notes.map(note => (
        <Notescard key={note._id} note={ note } setNotes={setNotes}/>
      ))}
    </div>
  )}

  {!loading && notes.length === 0 && <div>
    <div className='none'> 
      <TbNotebookOff/> <br /> 
      
      </div>
      <p className='p'>No Notes Created Yet. Create One Now...</p>
      
      </div>}
  </div>

        
           
  </div>
  )
}

export default Notes