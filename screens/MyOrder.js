import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    // State banaya order data store karne ke liye
    const [orderData, setOrderData] = useState([]); // Empty array initialize kiya

    // API se order data fetch karne ka function
    const fetchMyOrder = async () => {
        try {
            // Local storage se user email uthaya
            const email = localStorage.getItem('userEmail');
            console.log(email); // Debugging ke liye console log kiya

            // API call kiya order data ke liye
            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST', // POST method use kiya
                headers: {
                    'Content-Type': 'application/json', // JSON data bhej rahe hain
                },
                body: JSON.stringify({ email }), // Body me email bheja
            });

            // Response ko JSON format me convert kiya
            const data = await response.json();

            // State me fetched data store kar diya
            setOrderData(data);
        } catch (error) {
            // Agar error aaye to console me print karo
            console.error("Error fetching orders:", error);
        }
    };

    // Component ke load hone par fetchMyOrder function call hoga
    useEffect(() => {
        fetchMyOrder();
    }, []); // Empty dependency array -> sirf ek baar chalega

    return (
        <div>
            {/* Navbar render kiya */}
            <Navbar />

            <div className="container">
                <div className="row">
                    {/* Check kiya ki order data available hai ya nahi */}
                    {orderData.length > 0 ? (
                        // Agar data hai, to map karke render karenge
                        orderData.map((data, index) => (
                            data.orderData?.order_data // Optional chaining ka use kiya
                                .slice(0) // Data copy kiya
                                .reverse() // Latest orders ko sabse pehle show karne ke liye reverse kiya
                                .map((item, itemIndex) =>
                                    item.map((arrayData, arrayIndex) => (
                                        <div key={`${index}-${itemIndex}-${arrayIndex}`}>
                                            {/* Agar order date ho to usko render karo */}
                                            {arrayData.Order_date ? (
                                                <div className="m-auto mt-5">
                                                    <h5>{arrayData.Order_date}</h5>
                                                    <hr />
                                                </div>
                                            ) : (
                                                // Product card render kiya
                                                <div className="col-12 col-md-6 col-lg-3">
                                                    <div
                                                        className="card mt-3"
                                                        style={{ width: "16rem", maxHeight: "360px" }}
                                                    >
                                                        <img
                                                            src={arrayData.img} // Product image
                                                            className="card-img-top"
                                                            alt={arrayData.name}
                                                            style={{ height: "120px", objectFit: "fill" }}
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{arrayData.name}</h5>
                                                            <div
                                                                className="container w-100 p-0"
                                                                style={{ height: "38px" }}
                                                            >
                                                                <span className="m-1">{arrayData.qty}</span> {/* Quantity */}
                                                                <span className="m-1">{arrayData.size}</span> {/* Size */}
                                                                <span className="m-1">{arrayData.Order_date}</span> {/* Date */}
                                                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                                    ₹{arrayData.price}/- {/* Price */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )
                        ))
                    ) : (
                        // Agar data nahi mila to message show karo
                        <h5 className="text-center mt-5">No Orders Found</h5>
                    )}
                </div>
            </div>

            {/* Footer render kiya */}
            <Footer />
        </div>
    );
}
