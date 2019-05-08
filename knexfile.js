const { DATABASE_URL } = process.env;

const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'mysql',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfigs = {
  development: {
    connection: {
      user: 'root',
      password: 'northcoders',
      database: 'has_tap_in_api'
    }
  },
  test: {
    connection: {
      user: 'root',
      password: 'northcoders',
      database: 'has_tap_in_api_test'
    }
  },
  production: {
    connection: `${DATABASE_URL}?ssl=true`
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
