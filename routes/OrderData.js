const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');

// Route to create or update order
router.post('/orderdata', async (req, res) => {
    let data = req.body.order_data;

    // Ensure email is passed and valid
    if (!req.body.email) {
        return res.status(400).send({ error: "Email is required" });
    }

    // Add order date to the data
    data.splice(0, 0, { Order_date: req.body.order_date });

    try {
        let eId = await Order.findOne({ email: req.body.email });

        if (!eId) {
            // Create a new order
            await Order.create({
                email: req.body.email,
                order_data: [data],
            });
            return res.status(200).json({ success: true });
        } else {
            // Update existing order
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            return res.status(200).json({ success: true });
        }
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).send({ error: "Server Error", message: error.message });
    }
});

// Route to fetch user orders
router.post('/myOrderData', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ error: "Email is required" });
    }

    try {
        const eId = await Order.findOne({ 'email': email });

        if (!eId) {
            return res.status(404).send({ error: "No orders found for this email" });
        }

        res.json({ orderData: eId.order_data });
    } catch (error) {
        console.error("Error fetching order data:", error.message);
        res.status(500).send({ error: "Server Error", message: error.message });
    }
});

module.exports = router;

