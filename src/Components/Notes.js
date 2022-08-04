import { useContext } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../contexts/notes/noteContext";

const Notes = () => {
  const { notes } = useContext(NoteContext);
  return notes.map((note) => <NoteItem note={note} />);
};

export default Notes;
