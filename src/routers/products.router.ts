import { Router } from 'express';
import productsController from '../controllers/products.controller';

const productsRouter = Router();

productsRouter.get('/products', productsController.findAll);
productsRouter.post('/products', productsController.create);

export default productsRouter;