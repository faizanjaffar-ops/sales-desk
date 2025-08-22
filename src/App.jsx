import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Products from "./Products";

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/signup" style={{ marginRight: 10 }}>Signup</Link>
        <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
        <Link to="/products">Products</Link>
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
