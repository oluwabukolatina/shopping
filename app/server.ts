import app from './app';
import logger from './logger';
import { ENVIRONMENT } from './config/secrets';

if (!process.env.PORT) {
  process.exit(1);
}
const APP_PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

const server = app.listen(APP_PORT, async () => {
  logger.info(`Server started at ${APP_PORT} on ${ENVIRONMENT}`);
});

process.on('unhandledRejection', (err, promise) => {
  logger.info(err);
  logger.info(promise);
  server.close(() => process.exit(1));
});
