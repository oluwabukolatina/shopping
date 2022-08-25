import { Application } from 'express';
import BasketController from './basket.controller';
import { BASKET_URL } from '../../../shared.url';
import BasketValidation from './basket.validation';
import BasketMiddleware from './basket.middleware';

class BasketRoute {
  public basketController: BasketController = new BasketController();

  public routes = (app: Application): void => {
    app
      .route(`${BASKET_URL}:name`)
      .delete(
        BasketMiddleware.checkIfBasketIsEmpty,
        BasketMiddleware.checkIfProductToBeDeletedIsInBasket,
        this.basketController.deleteFromBasket,
      );
    app
      .route(BASKET_URL)
      .post(
        BasketValidation.validateAddToBasket,
        this.basketController.addToBasket,
      );
    app.route(BASKET_URL).get(this.basketController.getAllInBasket);

    app
      .route(`${BASKET_URL}abandoned-items`)
      .get(this.basketController.getAbandonedItemsInBasket);
  };
}
export default BasketRoute;
