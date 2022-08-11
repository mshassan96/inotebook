import { useState, useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../contexts/notes/noteContext";
import AddNote from "./AddNote";
import UpdateNote from "./UpdateNote";
import { useNavigate } from "react-router-dom";

const Notes = ({ showAlert }) => {
  const { notes, getNotes } = useContext(NoteContext);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [editNoteId, setEditNoteId] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (!!localStorage.getItem("authToken")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const editNote = (noteId) => {
    setEditNoteId(noteId);
    handleShow();
  };

  return (
    <>
      <AddNote showAlert={showAlert} />
      {!!show && (
        <UpdateNote
          show={show}
          editNoteId={editNoteId}
          handleClose={handleClose}
          showAlert={showAlert}
        />
      )}
      <div className="container my-3">
        {!!notes && (
          <>
            <h2 className="text-center">My Notes</h2>
            {!notes.length && (
              <div className="text-center my-5">No Notes Available</div>
            )}
            <div className="row">
              {notes?.map((note) => (
                <NoteItem
                  key={`${note._id}_${Math.random() * 1000}`}
                  note={note}
                  editNote={editNote}
                  showAlert={showAlert}
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
