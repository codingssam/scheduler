var config = {
    "host": process.env.FMS_DB_SERVER,
    "port": process.env.FMS_DB_PORT,
    "user": process.env.FMS_DB_USERNAME,
    "password": process.env.FMS_DB_PASSWORD,
    "database": process.env.FMS_DB,
	  "ssl": "Amazon RDS",
    "debug": true
}

module.exports = config;