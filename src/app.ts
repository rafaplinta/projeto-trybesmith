import express from 'express';
import productsRouter from './routers/products.router';
import ordersRouter from './routers/orders.router';
import loginRouter from './routers/login.router';

const app = express();

app.use(express.json());
app.use(productsRouter);
app.use(loginRouter);
app.use(ordersRouter);

export default app;
