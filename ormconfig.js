const parse = require('pg-connection-string');

const config = parse(process.env.DATABASE_URL);

const pgConnection = {
  "type": "postgres",
  "host": config.host,
  "port": config.port,
  "username": config.user,
  "password": config.password,
  "database": config.database,
  "entities": [
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}

module.exports = pgConnection;
