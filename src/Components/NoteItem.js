import { useContext } from "react";
import { Card } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import NoteContext from "../contexts/notes/noteContext";

const NoteItem = ({ note, editNote, showAlert }) => {
  const { deleteNote } = useContext(NoteContext);

  const handleUpdateNote = (noteId) => !!noteId && editNote(noteId);

  const handleDeleteNote = async (noteId) => {
    if (!!noteId) {
      const response = await deleteNote(noteId);
      if (response.success) {
        showAlert("Note Deleted");
      }
    }
  };

  return (
    <div className="col-md-3">
      <Card border="warning" text="dark" className="my-2">
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.description}</Card.Text>
          <Card.Footer>
            <div className="d-flex">
              <small className="text-muted mr-auto">{note.tag}</small>
              <AiOutlineDelete
                className="icon mx-1"
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteNote(note._id)}
              />
              <AiOutlineEdit
                className="icon mx-1"
                style={{ cursor: "pointer" }}
                onClick={() => handleUpdateNote(note._id)}
              />
            </div>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NoteItem;
