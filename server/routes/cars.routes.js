module.exports = (app) => {
  const cars = require("../controllers/cars.controller.js");

  var router = require("express").Router();

  // Create a new Car
  router.post("/", cars.create);

  // Retrieve all Cars
  router.get("/", cars.findAll);

  // Retrieve a single Car with id
  router.get("/:car_id", cars.findOne);

  // Update a Car with id
  router.put("/:car_id", cars.update);

  // Delete a Car with id
  router.delete("/:car_id", cars.delete);

  app.use("/api/cars", router);
};
