import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import NoteContext from "../contexts/notes/noteContext";

const AddNote = () => {

  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState();

  const handleFormInput = (e) => {
    const newInput = {[e.target.name] : e.target.value};
    setNote({...note, ...newInput});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note);
  }

  return (
    <div className="container my-3">
      <h2>Add New Note</h2>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" placeholder="Enter Note Title" onChange={handleFormInput} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" name="description" placeholder="Enter Note Description" onChange={handleFormInput} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="tag">
          <Form.Label>Tag</Form.Label>
          <Form.Control type="text" name="tag" placeholder="Enter Note Tag" onChange={handleFormInput} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Add Note
        </Button>
      </Form>
    </div>
  );
};

export default AddNote;
