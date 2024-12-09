import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; // Navbar component import
import Footer from '../components/Footer'; // Footer component import
import Cards from '../components/Cards'; // Cards component import

export default function Home() {
    const buttonStyle = {
        color: 'white',
        backgroundColor: '#50C878', // Emerald color
        borderColor: '#50C878', // Ensuring the border matches the background
    };

    const [search, setSearch] = useState(''); // Search input state
    const [foodcat, setFoodCat] = useState([]); // Food categories state
    const [fooditem, setFoodItem] = useState([]); // Food items state

    // Fetch data from backend
    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/fooddata", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            const [foodData, foodCategory] = data;
            setFoodCat(foodCategory); // Set categories
            setFoodItem(foodData); // Set items
        } catch (error) {
            console.error("Error while fetching food data:", error);
        }
    };

    useEffect(() => {
        loadData(); // Load data on component mount
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                {/* Carousel for search */}
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/images/anna-zagranichna-6XRAkSaYbrk-unsplash.jpg" className="d-block w-100" style={{ height: '50vh', objectFit: 'cover', filter: "brightness(30%)" }} alt="part" />
                            <div className="carousel-caption d-none d-md-block">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories and Items */}
            <div className="container my-3">
                {foodcat.length > 0 ? (
                    foodcat.map((category) => (
                        <div key={category._id} className="mb-4">
                            <div className="fs-3 mb-2">{category.CategoryName}</div>
                            <hr />
                            <div className="row">
                                {fooditem
                                    .filter((item) => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                                    .map((filteredItem) => (
                                        <div key={filteredItem._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                            <Cards foodItem={filteredItem} ></Cards>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
