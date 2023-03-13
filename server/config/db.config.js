module.exports = {
  HOST: "localhost",
  USER: "", // insert your username here
  PORT: 8000,
  PASSWORD: "", // insert your password here
  DB: "", // insert your database name here
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
