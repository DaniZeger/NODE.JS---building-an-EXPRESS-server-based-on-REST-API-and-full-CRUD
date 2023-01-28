const { Router } = require("express")
const router = Router()
const carControllers = require("../controllers/carControllers.js")

// ! Reset --- PUT request
// http://localhost:3000/api/cars/init
router.put("/init", carControllers.resetCars)


// ! Creat --- POST request
// http://localhost:3000/api/cars
router.post("/", carControllers.creatCar)

// ! Read --- GET request
// http://localhost:3000/api/cars
router.get("/", carControllers.getCarsList)

// ! Read => Get one car --- GET request
// http://localhost:3000/api/cars/146783250
router.get("/:_car_id", carControllers.getOneCar)

// ! Update --- PUT request
// http://localhost:3000/api/cars/901234567
router.put("/:_car_id", carControllers.updateCar)

// ! Update => Buy car --- PUT request
// http://localhost:3000/api/cars/buy/63d52978c2fc261febc6d3a4
router.put("/buy/:_id", carControllers.buyCar)

// ! Delete --- DELETE request
// http://localhost:3000/api/cars/146783250
router.delete("/:_car_id", carControllers.deleteCar)

module.exports = router; 
