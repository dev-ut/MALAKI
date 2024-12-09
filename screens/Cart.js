import React from 'react';
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart(); // Cart data
  let dispatch = useDispatchCart(); // Dispatch function for managing cart actions

  console.log("Cart Data:", data); // Debugging cart data

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log("User Email:", userEmail); // Debug email

    if (!userEmail) {
        alert("User is not logged in");
        return;
    }

    let response = await fetch("http://localhost:5000/api/orderdata", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString(),
        }),
    });

    console.log("JSON RESPONSE:::::", response.status);

    if (response.status === 200) {
        dispatch({ type: "DROP" });
    } else {
        console.error("Checkout failed:", await response.json());
    }
};


  // Total price calculation (price * quantity) with fallback for undefined prices
  let totalPrice = data.reduce((total, food) => {
    const price = Number(food.price) || 0; // Ensure the price is a valid number
    const itemTotal = price * food.qty; // Multiply price by quantity
    return total + itemTotal; // Accumulate the total
  }, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td> {/* Display quantity without buttons */}
                <td>{food.size}</td>
                <td>₹{(food.price * food.qty).toFixed(2)}</td> {/* Correct price calculation */}
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => dispatch({ type: "REMOVE", index })} // Remove item from cart
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price: ₹{totalPrice.toFixed(2)}/-</h1> {/* Display total price with two decimal points */}
        </div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}



