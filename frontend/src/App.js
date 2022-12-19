import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ActionPage from "./components/ActionPage";
import TableDemo from "./components/TableDemo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/actionpage/:id" element={<ActionPage />} />
        <Route exact path="/:token" element={<TableDemo />} />
      </Routes>
    </Router>
  );
};

export default App;
