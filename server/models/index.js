const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cars = require("./car.model.js")(sequelize, Sequelize);
db.producers = require("./producer.model.js")(sequelize, Sequelize);

db.cars.belongsTo(db.producers, { foreignKey: "producer_id", as: "producer" });
db.producers.hasMany(db.cars, { foreignKey: "producer_id", as: "cars" });

module.exports = db;
