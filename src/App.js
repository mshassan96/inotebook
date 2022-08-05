import { Alert } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import NoteProvider from "./contexts/notes/NoteState";

function App() {
  const alertMessage = '';
  
  return (
    <>
      <NoteProvider>
        <Router>
          <Navbar />
          {false && <Alert variant="info">{alertMessage}</Alert>}
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteProvider>
    </>
  );
}

export default App;
