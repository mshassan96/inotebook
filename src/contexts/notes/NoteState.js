import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = ({ children }) => {
  const host = "http://localhost:5000";
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMDg1MmU5ZjhlZDFmOGM3YzViZWI3In0sImlhdCI6MTY1Nzg4MzE1OX0.08uSa4w7-W5rs5wpPR091lm8Kd06BBbhz5CBuFJovhU";

  const [notes, setNotes] = useState();

  // Fetch All Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });

    const jsonResponse = await response.json();
    setNotes(jsonResponse);

    return jsonResponse;
  };

  // Add New Note
  const addNote = async (newNote) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify(newNote),
    });

    const jsonResponse = await response.json();
    setNotes([...notes, newNote]);

    return jsonResponse;
  };

  // Edit existing Note
  const updateNote = async (noteId, title, description, tag) => {
    console.log(noteId, title, description, tag);
    const response = await fetch(`${host}/api/notes/updatenote/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const jsonResponse = await response.json();
    setNotes(
      notes.map((note) =>
        note._id === noteId ? { title, description, tag } : note
      )
    );

    return jsonResponse;
  };

  // Delete existing Note
  const deleteNote = async (noteId) => {
    const response = await fetch(`${host}/api/notes/deletenote/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });

    const jsonResponse = await response.json();

    (!!jsonResponse.Success) && setNotes(notes.filter((note) => note._id !== noteId));

    return jsonResponse;
  };

  const contextValue = {
    notes,
    addNote,
    getNotes,
    updateNote,
    deleteNote,
  };

  return (
    <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>
  );
};

export default NoteState;
