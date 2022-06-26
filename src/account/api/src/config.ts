export const config = {
  server: {
    port: parseInt(process.env.SERVER_PORT as string, 10)
  },
  jwt: {
    secret: process.env.JWT_SECRET as string
  },
  postgresql: {
    db: process.env.POSTGRESQL_DB as string,
    user: process.env.POSTGRESQL_USER as string,
    password: process.env.POSTGRESQL_PASSWORD as string,
    host: process.env.POSTGRESQL_HOST as string,
    port: parseInt(process.env.POSTGRESQL_PORT as string, 10)
  }
};
