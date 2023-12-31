import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';

import productsMock from '../../mocks/products.mock';
import productsService from '../../../src/services/products.service';
import productsController from '../../../src/controllers/products.controller';
import ProductModel from '../../../src/database/models/product.model';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('#create', function () {
    it('ao receber os dados corretos, retorna o produto criado', async function () {
      req.body = productsMock.newProductBody;
  
      sinon.stub(productsService, 'create').resolves({ 
        status: 'SUCCESSFUL', 
        data: productsMock.newProductFromDB
      });
  
      await productsController.create(req, res);
  
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productsMock.newProductFromDB);
    });

    it('ao não receber um name, retorne um erro', async function () {
      req.body = productsMock.noNameProductBody;
  
      sinon.stub(productsService, 'create').resolves({ 
        status: 'INVALID_DATA', 
        data: { message: 'Name is required'} 
      });
  
      await productsController.create(req, res);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: 'Name is required' });
    });

    it('ao não receber um price, retorne um erro', async function () {
      req.body = productsMock.noPriceProductBody;

      sinon.stub(productsService, 'create').resolves({ 
        status: 'INVALID_DATA', 
        data: { message: 'Price is required'} 
      });

      await productsController.create(req, res);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: 'Price is required' });
    });

    it('ao não receber um orderId, retorne um erro', async function () {
      req.body = productsMock.noOrderIdProductBody

      sinon.stub(productsService, 'create').resolves({ 
        status: 'INVALID_DATA', 
        data: { message: 'OrderId is required'} 
      });

      await productsController.create(req, res);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: 'OrderId is required' });
    });
  });

  describe('#findAll', function () {
    it('retorna todos os produtos com sucesso', async function () {
      const mockReturn = [
        ProductModel.build({
          id: 1,
          name: 'Pedra Filosofal',
          price: '20 gold',
          orderId: 1
        }),
        ProductModel.build({
          id: 2,
          name: 'Lança do Destino',
          price: '100 diamond',
          orderId: 2
        })];
      sinon.stub(productsService, 'findAll').resolves({
        status: 'SUCCESSFUL',
        data: mockReturn,
      });

      await productsController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockReturn);
    });
  });
});
