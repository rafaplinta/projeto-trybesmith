import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import productsService from '../services/products.service';

async function create(req: Request, res: Response) {
  const { name, price, orderId } = req.body;
  const serviceResponse = await productsService.create({ name, price, orderId });

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  }
  res.status(201).json(serviceResponse.data);
}

async function findAll(_req: Request, res: Response) {
  const serviceResponse = await productsService.findAll();

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  }
  res.status(200).json(serviceResponse.data);
}

export default {
  create,
  findAll,
};