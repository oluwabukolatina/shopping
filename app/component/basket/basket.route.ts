import { Application } from 'express';
import BasketController from './basket.controller';
import { BASKET_URL } from '../../shared.url';
import BasketValidation from './basket.validation';
import BasketMiddleware from './basket.middleware';
import { ABANDONED_ITEMS_URL } from './basket.url';

class BasketRoute {
  public basketController: BasketController = new BasketController();

  public routes = (app: Application): void => {
    app.route(BASKET_URL).get(this.basketController.getBasket);
    app
      .route(BASKET_URL)
      .post(
        BasketValidation.validateAddToBasket,
        BasketMiddleware.doesNotAddNonExistentItemToBasket,
        this.basketController.addToBasket,
      );
    app
      .route(`${BASKET_URL}:name`)
      .delete(
        BasketMiddleware.checkIfBasketIsEmpty,
        BasketMiddleware.checkIfProductToBeDeletedIsInBasket,
        this.basketController.deleteFromBasket,
      );
    app
      .route(ABANDONED_ITEMS_URL)
      .get(this.basketController.getAbandonedItemsInBasket);
  };
}
export default BasketRoute;
