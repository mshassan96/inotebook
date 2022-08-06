import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import NoteContext from "../contexts/notes/noteContext";

const UpdateNote = ({ show, editNoteId, handleClose }) => {
  const { updateNote, getNoteById } = useContext(NoteContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleFormInput = (e) => {
    const newInput = { [e.target.name]: e.target.value };
    setNote({ ...note, ...newInput });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNote(editNoteId, note.title, note.description, note.tag);
    handleClose();
  };

  useEffect(() => {
    setNote(getNoteById(editNoteId));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter Note Title"
                value={note?.title}
                onChange={handleFormInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter Note Description"
                value={note?.description}
                onChange={handleFormInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tag">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                name="tag"
                placeholder="Enter Note Tag"
                value={note?.tag}
                onChange={handleFormInput}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateNote;
