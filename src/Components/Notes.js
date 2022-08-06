import { useState, useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../contexts/notes/noteContext";
import AddNote from "./AddNote";
import UpdateNote from "./UpdateNote";

const Notes = () => {
  const { notes, getNotes } = useContext(NoteContext);

  const [show, setShow] = useState(false);
  const [editNoteId, setEditNoteId] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const editNote = (noteId) => {
    setEditNoteId(noteId);
    handleShow();
  };

  return (
    <>
      <AddNote />
      {!!show && <UpdateNote
        show={show}
        editNoteId={editNoteId}
        handleClose={handleClose}
      />}
      <div className="container my-3">
        {!!notes && (
          <>
            <h2 className="text-center">My Notes</h2>
            {!notes.length && <div className="text-center my-5">No Notes Available</div>}
            <div className="row">
              {notes?.map((note) => (
                <NoteItem
                  key={`${note._id}_${Math.random() * 1000}`}
                  note={note}
                  editNote={editNote}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Notes;
