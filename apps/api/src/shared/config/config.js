import 'dotenv/config';

const base = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  logging: false,
};

export default {
  development: base,
  test: base,
  production: base,
};
