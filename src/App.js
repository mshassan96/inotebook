import { Alert } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import NoteProvider from "./contexts/notes/NoteState";
import routes from "./routes/routes";

function App() {
  const alertMessage = "";

  return (
    <>
      <NoteProvider>
        <Router>
          <Navbar />
          {false && <Alert variant="info">{alertMessage}</Alert>}
          <div className="container">
            <Routes>
              {routes.map((route, idx) => (
                <Route
                  path={route.path}
                  element={<route.component />}
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
