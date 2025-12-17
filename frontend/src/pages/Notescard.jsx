import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
function Notescard( {note, setNotes}) {
  async function handledelete(e,id) {
    e.preventDefault()
    if(!window.confirm("do you want do delete this note"))return;
     try {
      const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" ,
       "Authorization": `Bearer ${localStorage.getItem("token")}`
     }});

      if (res.ok) {
        toast.success("Note Deleted Successfully");
  
        setNotes(prevNotes => prevNotes.filter(n => n._id !== id));
      } else {
        toast.error("Failed to delete note");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting your note");
    }
  }
  
  
  return (
    <div className='card'>
    <div className='notecard'>
      <Link to={`/notes/${note._id}`}>


        <h1>{note.title}</h1>
        <p>{note.content}</p>
      
           <span className='date'>{note.createdAt}</span>
         
       
        <div className='notebutton'>
             <button className='edit'>
            <PenSquareIcon/>
            </button>
            
            <button onClick={(e)=>handledelete(e,note._id)}>
                <Trash2Icon/>
            </button>
        </div>
         </Link>

      
      

    </div>
</div>
  )
}

export default Notescard