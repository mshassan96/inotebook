const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { getAllNotes, addNote, updateNote, validationAddNote, deleteNote } = require("../controllers/notes");

// ROUTE 1: Fetch all notes using: GET "api/notes". Login required
router.get("/", fetchuser, getAllNotes);

// ROUTE 2: Add a new note using: POST "api/notes". Login required
router.post("/", fetchuser, validationAddNote, addNote);

// ROUTE 3: Update an existing note using: PUT "api/notes/:id". Login required
router.put("/:id", fetchuser, updateNote);

// ROUTE 4: Delete a note using: DELETE "api/notes/:id". Login required
router.delete("/:id", fetchuser, deleteNote);

module.exports = router;
