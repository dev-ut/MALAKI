import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal'; // Assuming Modal is in the same directory
import Cart from '../screens/Cart'; // Assuming Cart is in the same directory
import { useCart } from '../components/ContextReducer';

export default function Navbar() {

  let data = useCart(); // Cart data
  const [cartView, setCartView] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [orderData, setOrderData] = useState(null); // For storing order data fetched from backend

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Navbar style
  const navbarStyle = {
    backgroundColor: isScrolled ? '#85c715' : '#9ce619',
    color: 'white',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: isScrolled ? 'inset 0 -4px 6px rgba(0, 0, 0, 0.2)' : 'none',
    transition: 'all 0.3s ease',
  };

  const btnStyle = {
    backgroundColor: 'white',
    color: '#9ce619',
    border: '1px solid #9ce619',
    borderRadius: '5px',
    padding: '5px 10px',
    fontSize: '14px',
    height: '30px',
    lineHeight: 'normal',
  };

  // Check if authToken is present in localStorage
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

  // Fetch order data when the component is mounted
  useEffect(() => {
    if (authToken) {
      // Assuming the email is stored in the JWT token, or you can retrieve it another way
      const email = localStorage.getItem("userEmail");

      fetch("http://localhost:5000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then(response => response.json())
        .then(data => setOrderData(data.orderData)) // Store order data in state
        .catch(error => console.error("Error fetching order data:", error));
    }
  }, [authToken]);

  // Handle logout
  const handleSignout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div style={navbarStyle}>
      <nav className="navbar navbar-expand-lg" style={navbarStyle}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" style={{ color: 'white', fontSize: '2rem' }} to="/">Malaki</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" style={{ color: 'white', fontSize: '1.25rem' }} aria-current="page" to="/">Home</Link>
            </div>

            <div className="d-flex ms-auto">
              {authToken ? (
                <div className="d-flex">
                  <div className="me-1 btn btn-outline-light" style={btnStyle} onClick={() => setCartView(true)}>
                    My Cart{"   "}
                    <Badge pill bg='danger' className="ms-2">{data.length}</Badge>
                  </div>

                  {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}

                  <div className="me-2">
                    <div className="me-1 btn btn-outline-light" style={btnStyle}>
                      <Link className="nav-link" to="/myOrderData">
                        <button className="btn btn-outline-light" style={btnStyle}>My Orders</button>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button className="btn btn-outline-light" style={btnStyle} onClick={handleSignout}>Sign out</button>
                  </div>
                </div>
              ) : (
                <div className="d-flex">
                  <div className="me-2">
                    <Link className="nav-link" to="/loginuser">
                      <button className="btn btn-outline-light" style={btnStyle}>Login</button>
                    </Link>
                  </div>
                  <div>
                    <Link className="nav-link" to="/createuser">
                      <button className="btn btn-outline-light" style={btnStyle}>Signup</button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
