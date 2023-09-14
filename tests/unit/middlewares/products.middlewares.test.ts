import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response, NextFunction } from 'express';

chai.use(sinonChai);

import validateName from '../../../src/middlewares/products.middlewares/nameValidations';
import validatePrice from '../../../src/middlewares/products.middlewares/priceValidations';

describe('Middlewares', function () { 
  let req: Request;
  let res: Response;
  let next: NextFunction;

  describe('#validateName', function () {
    beforeEach(function () {
      req = { body: { name: 'Espada Justiceira' } } as Request; //  é inicializado com um objeto simulado de Request que tem uma propriedade name no body.
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response; // O 'as unknown as Response' está sendo usado para converter um objeto em um tipo Response,
      next = sinon.stub() as unknown as NextFunction; // esse código está convertendo o resultado de sinon.stub() em NextFunction. É importante ter cuidado ao usá-la e garantir que o objeto retornado por sinon.stub() seja compatível com NextFunction no contexto em que será usado.
    });
  
    afterEach(function () {
      sinon.restore();
    });

    it('Deve chamar o parâmetro next caso nenhum erro seja encontrado na requisição', function () {
      validateName(req, res, next);

      expect(next).to.have.been.called; 
      expect(res.status).not.to.have.been.called; 
      expect(res.json).not.to.have.been.called; 
    });

    it('Deve retornar um erro 400 e uma mensagem caso "name" esteja ausente', function () {
      req.body.name = ''; 

      validateName(req, res, next);

      expect(next).not.to.have.been.called; 
      expect(res.status).to.have.been.calledWith(400); 
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' }); 
    });

    it('Deve retornar um erro 422 e uma mensagem caso "name" não seja uma string', function () {
      req.body.name = 123; 

      validateName(req, res, next);

      expect(next).not.to.have.been.called; 
      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"name" must be a string' }); 
    });

    it('Deve retornar um erro 422 e uma mensagem caso "name" tenha menos de 3 caracteres', function () {
      req.body.name = 'AB'; 

      validateName(req, res, next);

      expect(next).not.to.have.been.called; 
      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 3 characters long' }); 
    });
  });

  describe('#validatePrice', function () {
    beforeEach(function () {
      req = { body: { price: '50 moedas de outro' } } as Request; 
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response; 
      next = sinon.stub() as unknown as NextFunction; 
    });
  
    afterEach(function () {
      sinon.restore();
    });

    it('Deve chamar o parâmetro next caso nenhum erro seja encontrado na requisição', function () {
      validatePrice(req, res, next);
    
      expect(next).to.have.been.called; 
      expect(res.status).not.to.have.been.called; 
      expect(res.json).not.to.have.been.called; 
    });

    it('Deve retornar um erro 400 e uma mensagem caso "name" esteja ausente', function () {
      req.body.price = ''; 
    
      validatePrice(req, res, next);
    
      expect(next).not.to.have.been.called; 
      expect(res.status).to.have.been.calledWith(400); 
      expect(res.json).to.have.been.calledWith({ message: '"price" is required' }); 
    });
    
    it('Deve retornar um erro 422 e uma mensagem caso "price" não seja uma string', function () {
      req.body.price = 123; 
    
      validatePrice(req, res, next);
    
      expect(next).not.to.have.been.called; 
      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"price" must be a string' }); 
    });
    
    it('Deve retornar um erro 422 e uma mensagem caso "price" tenha menos de 3 caracteres', function () {
      req.body.price = 'AB'; 
    
      validatePrice(req, res, next);
    
      expect(next).not.to.have.been.called; 
      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"price" length must be at least 3 characters long' }); 
    });
  });
});

