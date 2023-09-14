import { ServiceResponse } from '../types/ServiceResponse';
import OrderModel from '../database/models/order.model'; 
import ProductModel from '../database/models/product.model';
import { ReturnedOrder } from '../types/Order';

async function findAll(): Promise<ServiceResponse<ReturnedOrder[]>> { 
  const orders = await OrderModel.findAll({
    include: { 
      model: ProductModel, 
      as: 'productIds',
      attributes: ['id'],
    } });

  const orderMap = orders.map(({ dataValues }) => ({
    id: dataValues.id,
    userId: dataValues.userId,
    productIds: dataValues.productIds?.map((product) => product.id),
  }));

  return { status: 'SUCCESSFUL', data: orderMap }; 
}

export default {
  findAll,
};
