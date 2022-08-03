const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { getAllNotes, addNote, updateNote, validationAddNote, deleteNote } = require("../controllers/notes");

// ROUTE 1: Fetch all notes using: GET "api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, getAllNotes);

// ROUTE 2: Add a new note using: POST "api/notes/addnote". Login required
router.post("/addnote", fetchuser, validationAddNote, addNote);

// ROUTE 3: Update an existing note using: PUT "api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, updateNote);

// ROUTE 4: Delete a note using: DELETE "api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, deleteNote);

module.exports = router;
