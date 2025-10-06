const express=require('express')
const { getallnotes, createnote, updatenote, deletenote, getanote } = require('./notesController')
const router=express.Router()
const {protect}=require('../middleware/autho')


router.get('/', protect,getallnotes)
router.get('/:id',protect, getanote)
router.post('/',protect,createnote)

router.put('/:id',protect,updatenote)

router.delete('/:id',protect,deletenote)

module.exports=router