const fs = require("fs");
const { default: mongoose } = require("mongoose");
const CarModel = require("../models/carModel.js")

// ! RESET
// PUT http://localhost:3000/api/cars/init => reset the data to the JSON file "cars.json"
const resetCars = async (req, res) => {
    // 1. Clear the car collection
    CarModel.collection.drop();

    // 2. Read the baseline from the json file "cars.json"
    fs.readFile("./dal/cars.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.json("Somthing went wrong :(")
            return
        }

        // 3. File read successfuly > Insert all data to cillection
        const jsData = JSON.parse(data);
        jsData.cars.forEach(element => {
            new CarModel(element).save()
        });

        res.json("Data successfuly updated :)")
    })
}

// ! CREAT
// POST http://localhost:3000/api/cars => Creat new car into the data
const creatCar = async (req, res) => {
    try {
        // 1. Creat car model from 'req.body'
        const car = new CarModel(req.body)
        // 2. Execute 'CarModel.save()'
        await car.save()
        // 3. Send back success response
        res.status(201).json(car)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

// ! READ
// GET http://localhost:3000/api/cars => Read the car list from the data
const getCarsList = async (req, res) => {
    try {
        const cars = await CarModel.find()
        res.json(cars)
    } catch (err) {
        response.status(500).send(err.message);
    }
}

// ! READ => get one car
// GET http://localhost:3000/api/cars/146783250
const getOneCar = async (req, res) => {
    try {
        const car = await CarModel.findOne({ car_id: req.params._car_id });
        res.json(car);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ! UPDATE
// PUT http://localhost:3000/api/cars/901234567 => Update one car base on the car's ID
const updateCar = async (req, res) => {
    try {
        // 1. Extract the "car_id" value from URL/path
        const carId = req.params._car_id
        // 2. Extract the 'car' properties from the body
        const car = req.body
        // 3. Execute mongoose 'update' function with 'car_id' and the car 'object'
        const update = await CarModel.updateOne({ car_id: carId }, car)
        if (update.matchedCount === 0) res.sendStatus(404);
        else res.json({ modified: update.modifiedCount });

    } catch (err) {
        res.sendStatus(500).send(err.massage)
    }
}

// ! UPDATE => Buy car
// PUT http://localhost:3000/api/cars/buy/63d52978c2fc261febc6d3a4 => Update one car base on the car's ID
const buyCar = async (req, res) => {
    try {
        // 1. Extract the "id" value from URL/path
        const carId = mongoose.Types.ObjectId(req.params._id)
        const car = await CarModel.findById(carId)
        // 3. Extract the quantity of the car and check if quantity > 0
        if (car.quantity > 0) {
            car.quantity = car.quantity - 1
            const updatedCar = await CarModel.findByIdAndUpdate(carId, car)
            res.json(updatedCar)
        } else {
            res.status(409).send(`No inventory for ${car.brand} - ${car.model}`)
        }
        // 4. Reduce by 1 or send an error massege depent on the reault
    } catch (err) {
        res.sendStatus(500).send(err.massage)
    }
}


// ! DELETE
// DELETE http://localhost:3000/api/cars/146783250 => Delete one car base on the car's ID
const deleteCar = async (req, res) => {
    try {
        await CarModel.deleteOne({ car_id: req.params._car_id })

        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500).send(err.massage)
    }
}



module.exports = { resetCars, creatCar, getCarsList, updateCar, getOneCar, buyCar, deleteCar }