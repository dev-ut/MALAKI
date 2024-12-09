import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cards(props) {
    let data = useCart(); // Cart data
    let dispatch = useDispatchCart();

    const cardStyle = {
        backgroundColor: '#9ce619', // Emerald color
        color: 'black'
    };

    const btnstyle = {
        backgroundColor: 'white', // White background
        color: '#9ce619', // Emerald text color
        border: '1px solid #9ce619', // Emerald border
        borderRadius: '5px',
        fontWeight: 'bold',
        fontSize: '16px',
    };

    const [quantity, setQty] = useState(1); // Default quantity is 1
    const [selectedOption, setSize] = useState(
        props.foodItem?.options?.length > 0
            ? Object.keys(props.foodItem.options[0])[0]
            : ""
    );

    const calculatePrice = () => {
        const selectedPrice = props.foodItem.options[0][selectedOption];
        const validPrice = !isNaN(Number(selectedPrice)) ? Number(selectedPrice) : 0;
        return quantity * validPrice;
    };

    const handleAddToCart = async () => {
        const totalPrice = calculatePrice();

        let food = {}; // Empty object for storing the matched cart item
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }

        if (Object.keys(food).length !== 0) { // Food item already exists in the cart
            if (food.size === selectedOption) {
                await dispatch({
                    type: "UPDATE",
                    id: props.foodItem._id,
                    price: totalPrice,
                    qty: quantity, // Updated quantity
                });
                return;
            }
        } else {
            await dispatch({
                type: "ADD",
                id: props.foodItem._id,
                name: props.foodItem.name,
                qty: quantity,
                price: totalPrice,
                size: selectedOption,
            });
        }

        console.log("Added to cart:", {
            foodName: props.foodItem.name,
            quantity: quantity,
            selectedOption: selectedOption,
            price: totalPrice
        });
    };

    let priceOptions = props.foodItem.options.length > 0 ? Object.keys(props.foodItem.options[0]) : [];

    return (
        <div>
            <div className="card mt-4" style={{ width: "17rem", height: "21rem" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="Food" style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body w-100">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select
                            className='m-2 h-100 rounded'
                            style={cardStyle}
                            value={quantity}
                            onChange={(e) => setQty(Number(e.target.value))} // Ensuring numeric value
                        >
                            {Array.from(Array(10), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select
                            className='m-2 h-100 rounded'
                            style={cardStyle}
                            value={selectedOption}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                        <div className="text-center mt-3">
                            <strong>Total Price:</strong> ₹{calculatePrice()}
                        </div>
                        <hr />
                        <button
                            className="btn btn-outline-light w-100"
                            style={btnstyle}
                            onClick={handleAddToCart}
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
