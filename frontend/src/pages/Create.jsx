import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, Icon } from 'lucide-react'
import toast from 'react-hot-toast'
function Create() {
  const [title,setTitle]=useState('')
  const [content,setContent]=useState('')
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  async function handlesubmit(e){
    e.preventDefault()
    if(!title.trim() || !content.trim()){
      toast.error("all field must be fullfilled")
    }
    setLoading(true)
    try {
    const res = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // tell backend it's JSON
         "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ title, content }), // send data as JSON
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Note Created Successfully')
      navigate('/notes')
      setTitle("");
      setContent("");

      // maybe redirect back to notes
      // navigate("/notes");  <-- if using react-router's useNavigate
    } else {
      toast.error('Error Creating Note')
    }
  } catch (error) {
    toast.error('Request Failed')
    console.log(error)
  } finally {
    setLoading(false);
  }


  }
  return (
    <div >
      <div >
        <div className='backbox'>
          <Link to={'/notes'}>
            <ArrowLeftIcon  className='backicon'/>
            Back to notes
          </Link>
          
        </div>
      <div className='maincr'>
        <div className='cardcr'>
          <h2>create new note</h2>
          <form onSubmit={handlesubmit}>
            <div>
              <label>Title</label> <br />
              <input type="text" placeholder='insert title'
                value={title}
                onChange={(e)=>setTitle(e.target.value)} />
            </div>

             <div className='texta'>
              <label>content</label> <br />
              <textarea value={content} placeholder='write your notes here'
              onChange={(e)=>setContent(e.target.value)}></textarea>
            <div className='crno'>
              <button>create note</button>
          </div>
            </div>


          </form>
        </div>
      </div>
       
      </div>
       
    </div>
  )
}


export default Create