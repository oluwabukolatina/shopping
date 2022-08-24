import { Application } from 'express';
import BasketController from './basket.controller';

class BasketRoute {
  public basketController: BasketController =
    new BasketController();

  public routes = (app: Application): void => {
    app.route('/').get(this.basketController.addToCheckout);
  };
}
export default BasketRoute;
