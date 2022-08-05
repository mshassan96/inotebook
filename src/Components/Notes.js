import { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../contexts/notes/noteContext";
import AddNote from "./AddNote";

const Notes = () => {
  const { notes, getNotes } = useContext(NoteContext);

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AddNote />
      <div className="container my-3">
        {!!notes && (
          <>
            <h2 className="text-center">My Notes</h2>
            <div className="row">
              {notes?.map((note) => (
                <NoteItem
                  key={`${note._id}_${Math.random() * 1000}`}
                  note={note}
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
