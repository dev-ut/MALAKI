import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    // State banayi hai user ke inputs ko track karne ke liye
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault(); // Page reload hone se rokta hai

    // Backend se request bhejna using fetch

    const response = await fetch("http://localhost:5000/api/CreateUser", {
        method: 'POST', // POST method specify karte hain
        headers: {
            'Content-Type': 'application/json' // JSON data format specify karte hain
        },

        body: JSON.stringify({
            name: credentials.name, 
            email: credentials.email, 
            password: credentials.password, 
            location: credentials.geolocation // credentials object ko stringify karke bhejna hai is frontend se backend
        })
    });

    const json = await response.json(); // Response ko parse karte hain
    console.log(json); // Debug ke liye console mein json output

    // Agar success false ho to alert dikhana
    if (!json.success) {
        alert("Enter valid credentials");
    } else {
        // Redirect to login page after successful signup
        navigate("/"); // Use navigate to go to the home page
    }
};


        // onChange function jo har input field ke change ko handle karega
        const onChange = (event) => {
            // Spread operator se purane state ko preserve karte hain aur naye value ko update karte hain
            setcredentials({ ...credentials, [event.target.name]: event.target.value });
        };

        // Signup form ka UI
        return (
            <div className="container mt-4">
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <input type="text" className="form-control" placeholder="Name" name="name" value={credentials.name} onChange={onChange} />
                    <input type="email" className="form-control" placeholder="Email" name="email" value={credentials.email} onChange={onChange} />
                    <input type="password" className="form-control" placeholder="Password" name="password" value={credentials.password} onChange={onChange} />
                    <input type="text" className="form-control" placeholder="Address" name="geolocation" value={credentials.geolocation} onChange={onChange} />
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/login" className="btn btn-danger">Already a User</Link>
                    </div>
                </form>
            </div>
        );
    }

