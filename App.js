import React from "react";
import Home from './screens/Home';
import Login from "./screens/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from "./screens/Signup.js";

// Import CartProvider here
import { CartProvider } from './components/ContextReducer.js'; // Adjust the path based on where CartProvider is located
import Cart from "./screens/Cart.js";

const App = () => {
  return (
    <CartProvider> {/* Wrap the whole app with CartProvider */}
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/cart" element={<Cart/>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;


 



