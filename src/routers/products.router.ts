import { Router } from 'express';
import productsController from '../controllers/products.controller';
import validateName from '../middlewares/products.middlewares/nameValidations';
import validatePrice from '../middlewares/products.middlewares/priceValidations';

const productsRouter = Router();

productsRouter.get('/products', productsController.findAll);
productsRouter.post('/products', validateName, validatePrice, productsController.create);

export default productsRouter;