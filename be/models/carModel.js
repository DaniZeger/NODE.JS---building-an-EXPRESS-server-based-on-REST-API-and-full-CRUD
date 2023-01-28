const mongoose = require("mongoose")

const CarSchema = mongoose.Schema({
    car_id: Number,
    brand: String,
    model: String,
    year: Number,
    color: String,
    price: Number,
    time_to_100: Number,
    max_speed: Number,
    description: String,
    quantity: Number
});

const CarModel = mongoose.model("CarModel", CarSchema, "Cars")

module.exports = CarModel