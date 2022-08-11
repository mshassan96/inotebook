import { useState } from "react";
import { Alert } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import NoteProvider from "./contexts/notes/NoteState";
import routes from "./routes/routes";

function App() {
  const [alert, setAlert] = useState(null);
  const [variant, setVariant] = useState("info");
  const showAlert = (msg, type = "info") => {
    setAlert(msg);
    setVariant(type);
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteProvider>
        <Router>
          <Navbar />
          {!!alert && (
            <Alert variant={variant} className="mx-4 my-2">
              {alert}
            </Alert>
          )}
          <div className="container">
            <Routes>
              {routes.map((route, idx) => (
                <Route
                  path={route.path}
                  element={<route.component showAlert={showAlert} />}
                  key={idx}
                  exact
                />
              ))}
            </Routes>
          </div>
        </Router>
      </NoteProvider>
    </>
  );
}

export default App;
