export const config = {
  testModeEnabled: process.env.NODE_ENV === 'test',
  forceEnableMikroORMRepositories: process.env.ENABLE_TEST_MIKRO_ORM_REPOSITORIES === 'true',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USERNAME || 'jesus',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_DATABASE || 'todo-list',
  },
  logging: true,
};
