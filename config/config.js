const development = {
  "username": process.env.dbId,
  "password": process.env.dbPwd,
  "database": "database_development",
  "host": "127.0.0.1",
  "dialect": "oracle"
};

module.exports = { development };