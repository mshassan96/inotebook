import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = ({ children }) => {
  const data = [
    {
      _id: "62eb011c296e89e856afcc49",
      user: "62d0852e9f8ed1f8c7c5beb7",
      title: "Recievables",
      description: "5000 Jade Smith",
      tag: "debt",
      date: "2022-08-03T23:13:32.139Z",
      __v: 0,
    },
    {
      _id: "62eb011c296e89e856afcc4c",
      user: "62d0852e9f8ed1f8c7c5beb7",
      title: "Recievables",
      description: "5000 Jade Smith",
      tag: "debt",
      date: "2022-08-03T23:13:32.864Z",
      __v: 0,
    },
    {
      _id: "62eb011d296e89e856afcc4f",
      user: "62d0852e9f8ed1f8c7c5beb7",
      title: "Recievables",
      description: "5000 Jade Smith",
      tag: "debt",
      date: "2022-08-03T23:13:33.512Z",
      __v: 0,
    },
    {
      _id: "62eb011e296e89e856afcc52",
      user: "62d0852e9f8ed1f8c7c5beb7",
      title: "Recievables",
      description: "5000 Jade Smith",
      tag: "debt",
      date: "2022-08-03T23:13:34.165Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(data);

  const contextValue = {
    notes,
    setNotes,
  };

  return (
    <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>
  );
};

export default NoteState;
