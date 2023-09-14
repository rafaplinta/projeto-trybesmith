// import { ServiceResponse } from '../types/ServiceResponse';

// import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
// import ProductModel from '../database/models/product.model';

// async function findAll(): Promise<ServiceResponse<OrderSequelizeModel[]>> {
//   const orders = await OrderModel.findAll({ 
//     include: { model: ProductModel, as: 'productId', attributes: ['id'] },
//   });
//   return { status: 'SUCCESSFUL', data: orders };
// }

// export default {
//   findAll,
// };