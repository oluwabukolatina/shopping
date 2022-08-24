import { Application } from 'express';
import BasketController from './basket.controller';
import { BASKET_URL } from '../../../shared.url';
import BasketValidation from './basket.validation';

class BasketRoute {
  public basketController: BasketController = new BasketController();

  public routes = (app: Application): void => {
    app
      .route(BASKET_URL)
      .post(
        BasketValidation.validateAddToBasket,
        this.basketController.addToCheckout,
      );
  };
}
export default BasketRoute;
