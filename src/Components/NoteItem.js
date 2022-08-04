import { Button, Card } from "react-bootstrap";

const NoteItem = ({ note }) => {
  return (
    <div className="col-md-3">
      <Card bg="info" text="white" className="my-2">
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.description}</Card.Text>
          <Card.Footer>
            <small className="text-muted">{note.tag}</small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NoteItem;
