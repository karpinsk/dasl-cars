module.exports = (sequelize, Sequelize) => {
  const Producer = sequelize.define(
    "producer",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Producer;
};
