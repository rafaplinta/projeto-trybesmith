import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';

// function validateParams({
//   name,
//   price,
//   orderId,
// }: ProductInputtableTypes): string | null {
//   if (!name) return '"name" is required';
//   if (!price) return '"price" is required';
//   if (!orderId) return 'OrderId is required';
//   return null;
// }

async function create(product: ProductInputtableTypes): Promise<ServiceResponse<Product>> {
  // let responseService: ServiceResponse<Product>;
  // const error = validateParams(product);

  // if (error) {
  //   responseService = { status: 'INVALID_DATA', data: { message: error } };
  //   return responseService;
  // }

  const newProduct = await ProductModel.create(product);
  return { status: 'SUCCESSFUL', data: newProduct.dataValues };

  // return responseService;
}

async function findAll(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const products = await ProductModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
}

export default {
  create,
  findAll,
};