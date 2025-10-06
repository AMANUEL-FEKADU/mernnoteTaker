import React from 'react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router'
import { ArrowLeftIcon, SplineIcon, TrashIcon } from 'lucide-react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router-dom'
function Detail() {
  const [note,setNote]=useState(null)
  const[loading,setLoading]=useState(true)
  const [save,setSave]=useState(false)
  const {id}=useParams()
  const navigate=useNavigate()
  console.log(id)
  async function handledelete() {
   
    if(!window.confirm("do you want do delete this note"))return;
     try {
      const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
         },
        
      });

      if (res.ok) {
        toast.success("Note Deleted Successfully");
        setNote(null)
  
       
        navigate('/notes')
      } else {
        toast.error("Failed to delete note");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting your note");
    }
  }
  async function handlesave(e){
    e.preventDefault()
    if(!note.title.trim()|| !note.content.trim()){
      toast.error('insert title and content')
    }
    setSave(true)
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: note.title, content: note.content }),
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      });

      if (res.ok) {
        const data=await res.json()
        toast.success("Note Updated Successfully");
        setNote(data)
       
       
       
        navigate('/notes')
      } else {
        toast.error("Failed to Update note");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while updating your note");
    }
  }
    


  

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" ,
          "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
         
        })

        if (!res.ok) {
          toast.error("Failed to fetch note")
        }

        const data = await res.json()
        setNote(data) //
        
      } catch (error) {
        console.error(error)
        toast.error("Error fetching note")
      } finally {
        setLoading(false)
      }
    }

    fetchNote() 
  }, [id]) 

  if (loading) return (
    <div>
      <SplineIcon/>
     
    </div>
  )
  if (!note) return <p>Note not found</p>

  return (
    <div className='bigs'>
      <div className='show'>
        <Link to={'/notes'}>
        <button>  <ArrowLeftIcon/>Back to notes</button>
        </Link>
        <div className='del'>
         <button onClick={handledelete}>
          <TrashIcon/> delete note
              </button>
           </div>
           <form>
            <div className='titles'>
              <label>Title</label> <br />
              <input type="text" placeholder='insert title'
                value={note.title}
                onChange={(e)=>setNote({...note,title:e.target.value})} />
            </div>

             <div className='texts'>
              <label>content</label> <br />
              <textarea value={note.content} placeholder='write your notes here'
              onChange={(e)=>setNote({...note,content:e.target.value})}></textarea>
            
              <button onClick={handlesave}>save note</button>
        
            </div>


          </form>
       
    
    </div>
  </div>
  )
}



 


export default Detail