import * as dotenv from 'dotenv';
import express from 'express';
import { ENVIRONMENT } from './config/secrets';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import BasketRoute from './component/basket/basket.route';
import welcomeMessage from './welcome';
import notFoundMiddleware from './middleware/not-found.middleware';
import errorMiddleware from './middleware/error.middleware';
import ProductRoute from './component/product/product.route';

dotenv.config();

class App {
  public app: express.Application;
  public productRoute: ProductRoute = new ProductRoute();
  public basketRoute: BasketRoute = new BasketRoute();
  constructor() {
    this.app = express();
    this.config();
    this.productRoute.routes(this.app);
    this.basketRoute.routes(this.app);
    this.app.disable('x-powered-by');
    this.app.set('trust proxy', true);
    this.app.get('/', welcomeMessage);
    this.app.get('*', notFoundMiddleware);
    this.app.use(notFoundMiddleware);
    this.app.use(errorMiddleware);
  }

  private config = (): void => {
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    if (ENVIRONMENT === 'production') {
      morganBody(this.app, {
        logAllReqHeader: false,
        maxBodyLength: 5000,
        logResponseBody: false,
      });
    }
  };
}
export default new App().app;
