const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    order_data: {
        type: Array,
        required: true,
    },
});

// Use 'Order' for a clear and consistent model name
module.exports = mongoose.model('Order', OrderSchema);
