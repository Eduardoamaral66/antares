export default {
  jwt: {
    secret: process.env.APP_SECRET || '1',
    expiresIn: '1d',
  },
};
