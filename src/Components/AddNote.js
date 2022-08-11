import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import NoteContext from "../contexts/notes/noteContext";

const AddNote = ({ showAlert }) => {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleFormInput = (e) => {
    const newInput = { [e.target.name]: e.target.value };
    setNote({ ...note, ...newInput });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Note Added.");
  };

  return (
    <div className="container my-3">
      <h2>Add New Note</h2>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={note.title}
            placeholder="Enter Note Title with atleast 5 characters"
            onChange={handleFormInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={note.description}
            placeholder="Enter Note Description with atleast 10 characters"
            onChange={handleFormInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="tag">
          <Form.Label>Tag</Form.Label>
          <Form.Control
            type="text"
            name="tag"
            value={note.tag}
            placeholder="Enter Note Tag"
            onChange={handleFormInput}
          />
        </Form.Group>
        <Button
          disabled={note?.title?.length < 5 || note?.description?.length < 10}
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Add Note
        </Button>
      </Form>
    </div>
  );
};

export default AddNote;
