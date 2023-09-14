// import { Request, Response } from 'express';
// import mapStatusHTTP from '../utils/mapStatusHTTP';
// import ordersService from '../services/orders.service';

// async function findAll(_req: Request, res: Response) {
//   const serviceResponse = await ordersService.findAll();

//   if (serviceResponse.status !== 'SUCCESSFUL') {
//     return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
//   }
//   res.status(200).json(serviceResponse.data);
// }

// export default {
//   findAll,
// };