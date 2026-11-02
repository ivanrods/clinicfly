import sequelize from 'sequelize';
import { describe, it, expect } from 'vitest';

describe('Database Configuration', () => {
  it('should initialize the database connection', () => {
    const db = new sequelize.Sequelize('database', 'username', 'password', {
      host: 'localhost',
      dialect: 'postgres',
    });

    expect(db).toBeDefined();
  });
});
