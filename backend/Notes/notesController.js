
const express=require('express')
const { Note } = require("../models/notes.js")
const { User } = require('../models/usermodel.js')

exports.getallnotes=async(req,res)=>{
    try {
        const notes= await Note.find({user:req.user.id}).sort({createdAt:-1})
        res.status(200).json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'internsl server error'})
        
    }
}


exports.createnote=async(req,res)=>{
    try {
        const { title, content}=req.body
        
         if (!title || !content) {
      return res.status(400).send( 'Title and content are required');
    }
        const newNote = new Note({
      title,
      content,
      user: req.user.id,
    });

    const savedNote=await newNote.save()

        res.status(201).json(savedNote)
        
    } catch (error) {

         console.log(error)
        res.status(500).json({message:'error while creating you note'})
        
    }
    
}

exports.getanote=async(req,res)=>{
    try{
    const fetchedNote= await Note.findById(req.params.id)

      if (!fetchedNote) {
  return res.status(404).json({ message: 'Note not found' });
}

     if (fetchedNote.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

  

    res.status(200).json(fetchedNote)
    } 
    catch(error){
        console.log(error)
        res.status(500).json({message:'error while fetching you note'})
    }
}

exports.updatenote=async(req,res)=>{
    try {
        const {title,content}=req.body
        const user=await User.findById(req.user.id)
     
          if(!user){
           return res.json({message:"user not found"})
        }
        
        const note=await Note.findById(req.params.id)
        
      
          if(!note) {
            return res.status(404).json({message:"note can't be found"})
        }
        if(note.user.toString() !== user.id){
            res.json({message:"user not authorised"})
        }
        const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
        
      
        res.status(200).json(updatedNote)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'error while updating you note'})
        
    }
}

exports.deletenote=async(req,res)=>{
    
    try {
        const user=await User.findById(req.user.id)
        if(!user){
            return res.send("user not found")
        }
        const deleteNote=await Note.findById(req.params.id)

        if(!deleteNote){
            return res.send("note can't be found")
        }

        if(deleteNote.user.toString() !== user.id){
           return res.json({
                message:"not authorized"
            })
        }

        const notedelete=await Note.findByIdAndDelete(req.params.id)
        return res.json({message:"note id deleted",notedelete})
        
        
       
    } catch (error) {
         console.log(error)
        res.status(500).json({message:'error while deleting your note'})
    }
}