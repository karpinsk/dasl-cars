module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define(
    "car",
    {
      car_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      vin: {
        type: Sequelize.STRING,
        unique: { args: true },
        allowNull: false,
      },
      reg_num: {
        type: Sequelize.STRING,
        unique: {
          args: true,
        },
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      producer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );

  return Car;
};
