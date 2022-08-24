import { Application } from 'express';
import ProductController from './product.controller';
import { PRODUCT_URL } from '../../../shared.url';

class ProductRoute {
  public productController: ProductController = new ProductController();

  public routes = (app: Application): void => {
    app.route(PRODUCT_URL).get(this.productController.get);
  };
}
export default ProductRoute;
