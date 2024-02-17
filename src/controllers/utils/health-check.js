/**
 * Health check endpoint
 */
export default function getAppHealth(req, res) {
  res.json({
    app: 'OK',
    env: {
      APP_NAME: process.env.APP_NAME,
      APP_ENV: process.env.APP_ENV
    }
  });
}
