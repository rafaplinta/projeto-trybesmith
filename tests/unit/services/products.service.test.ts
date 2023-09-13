import { expect } from 'chai';
import sinon from 'sinon';

import ProductModel from '../../../src/database/models/product.model';
import productsService from '../../../src/services/products.service';
import productsMock from '../../mocks/products.mock';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('#create', function () {
    it('cria um novo produto com sucesso', async function () {
      const mockReturn = ProductModel.build(productsMock.newProductFromDB);
      sinon.stub(ProductModel, 'create').resolves(mockReturn);

      const serviceResponse = await productsService.create(productsMock.newProductBody);

      expect(serviceResponse.status).to.eq('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.eq(productsMock.newProductFromDB);
    });

    it('retorne um erro quando o name não é enviado', async function () {
      const serviceResponse = await productsService.create(productsMock.noNameProductBody);

      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).to.deep.eq({ message: "Name is required"});
    });

    it('retorne um erro quando o price não é enviado', async function () {
      const serviceResponse = await productsService.create(productsMock.noPriceProductBody);

      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).to.deep.eq({ message: "Price is required"});
    });
      
    it('retorne um erro quando o orderId não é enviado', async function () {
      const serviceResponse = await productsService.create(productsMock.noOrderIdProductBody);

      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).to.deep.eq({ message: "OrderId is required"});
    });
  });

  describe('#findAll', function () {
    it('retorne todos os produtos cadastrados com sucesso', async function () {
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
      sinon.stub(ProductModel, 'findAll').resolves(mockReturn);
      const serviceResponse = await productsService.findAll();

      expect(serviceResponse.status).to.eq('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.eq(mockReturn);
    });
  });
});
