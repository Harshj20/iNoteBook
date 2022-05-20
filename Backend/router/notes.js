const express = require('express');
const { modelNames } = require('mongoose');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../modules/Notes');
const { body, validationResult } = require('express-validator');


router.get('/fetchNotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Notes.find({userId:req.user.id});
        res.send(notes);
    } catch (error) {
        res.status(500).send('some error occured while fetching a note');
    }
});

router.post('/addNote', fetchuser,[
    body('title', 'please enter a title').isLength({min:1}),
    body('description', 'please enter a proper description').isLength({ min: 3 })
], async (req, res)=>{
    try {
        const {title, description, tag} = req.body;
        const note = new Notes({
            title, description, tag, userId:req.user.id
        });
        const data = await note.save();
        res.json(data);
        console.log(data);
    } catch (error) {
        res.status(500).send('some error occured while adding a note');
    }
});

router.put('/updateNote/:id', fetchuser, async (req, res)=>{
    try {
        const {title, description, tag} = req.body;
        var newNote = {};
        if(title){
            newNote.title = title;
        }
        if(description)
        newNote.description = description;
        if(tag)
        newNote.tag = tag;

        const note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send('not found');
        }
    
        if(note.userId.toString() !== req.user.id)
        {
            return res.status(401).send('not allowed');
        }
        const data = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({data});
    } catch (error) {
        res.status(500).send('some error occured while updating a note');
        console.log(error.message);
    }
});

router.delete('/deleteNote/:id', fetchuser, async (req, res)=>{
    try {

        const note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send('not found');
        }
    
        if(note.userId.toString() !== req.user.id)
        {
            return res.status(401).send('not allowed');
        }
        const data = await Notes.findByIdAndDelete(req.params.id);
        res.json({data});
    } catch (error) {
        res.status(500).send('some error occured while deleting a note');
        console.log(error.message);
    }
});

module.exports = router;