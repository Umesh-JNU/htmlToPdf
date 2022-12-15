import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ActionPage from "./components/ActionPage.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/actionpage/:id" element={<ActionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
