const {
  sequelize,
  cars: Cars,
  producers: Producers,
  Sequelize: { Op },
} = require("../models");

// Create and Save a new Car
exports.create = async (req, res) => {
  let t;
  try {
    t = await sequelize.transaction();
    const [producer, created] = await Producers.findOrCreate({
      where: {
        brand: req.body.brand,
        country: req.body.country,
      },
      defaults: {
        brand: req.body.brand,
        country: req.body.country,
      },
      transaction: t,
    });

    const [car, car_created] = await Cars.findOrCreate({
      where: {
        vin: req.body.vin,
        reg_num: req.body.reg_num,
      },
      defaults: {
        vin: req.body.vin,
        reg_num: req.body.reg_num,
        model: req.body.model,
        producer_id: producer.id,
        color: req.body.color,
        year: req.body.year,
      },
      transaction: t,
    });

    if (car_created) {
      await t.commit();
      res.send({ message: "Car was created successfully!" });
    } else {
      throw new Error("Car already exists!");
    }
  } catch (error) {
    await t.rollback();
    res.status(500).send({
      message: error.message,
    });
  }
};

// Retrieve only Cars from the database.
exports.findAll = (req, res) => {
  Cars.findAll({
    include: [
      {
        model: Producers,
        as: "producer",
        attributes: ["brand", "country"],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cars.",
      });
    });
};

// Find a single car with vin
exports.findOne = (req, res) => {
  Cars.findOne({
    where: { car_id: req.params.car_id },
    include: [
      {
        model: Producers,
        as: "producer",
        attributes: ["brand", "country"],
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find car with id=${car_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving car with id=" + req.params.car_id,
      });
    });
};

// Update a car by the id in the request
exports.update = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const car = await Cars.findOne({
      where: { car_id: req.params.car_id },
      include: [{ model: Producers, as: "producer" }],
    });

    // get producer primary key to delete producer later, if brand or country was changed
    const producer_id = car.producer.id;

    if (!car) {
      throw new Error("Car not found!");
    }

    const [producer, created] = await Producers.findOrCreate({
      where: {
        brand: req.body.producer.brand,
        country: req.body.producer.country,
      },
      defaults: {
        brand: req.body.producer.brand,
        country: req.body.producer.country,
      },
      transaction,
    });

    car.vin = req.body.vin;
    car.reg_num = req.body.reg_num;
    car.model = req.body.model;
    car.producer_id = producer.id;
    car.color = req.body.color;
    car.year = req.body.year;

    await car.save({ transaction });

    // if brand or country was changed, delete old producer
    if (producer_id !== producer.id) {
      const oldProducer = await Producers.findByPk(producer_id, {
        transaction,
      });
      await oldProducer.destroy({ transaction });
    }

    await transaction.commit();

    res.send({ message: "Car was updated successfully!" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const car = await Cars.findOne({
      where: { car_id: req.params.car_id },
      include: [{ model: Producers, as: "producer" }],
    });

    if (!car) {
      throw new Error("Car not found!");
    }

    const producerCount = await Cars.count({
      where: { producer_id: car.producer_id },
      transaction,
    });

    await car.destroy({ transaction });

    // If there is only one car with the same producer, delete the producer
    if (producerCount === 1) {
      const producer = await Producers.findByPk(car.producer_id, {
        transaction,
      });
      await producer.destroy({ transaction });
    }

    await transaction.commit();

    res.send({ message: "Car was deleted successfully!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    res.status(500).send({
      message: error.message,
    });
  }
};
