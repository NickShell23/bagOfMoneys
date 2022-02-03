module.exports = {
    HOST: "localhost",
    USER: "sammy",
    PASSWORD: "password",
    DB: "bagOfMoneys",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
