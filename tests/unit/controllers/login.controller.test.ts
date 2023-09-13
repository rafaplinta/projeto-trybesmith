import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';

import loginsMocks from '../../mocks/logins.mocks';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import loginService from '../../../src/services/login.services';
import loginController from '../../../src/controllers/login.controller';
import { Token } from '../../../src/types/Token';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;
  const noUsernameOrPassword = '"username" and "password" are required';
  const invalidUsernameOrPassword = 'Username or password invalid';

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('#login', function () {
    it('ao não receber um username, retorne um erro', async function () {
      req.body = loginsMocks.noUsernameLoginBody;

      const serviceResponse: ServiceResponse<Token> = {
        status: 'INVALID_DATA',
        data: { message: noUsernameOrPassword }
      }

      sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);

      await loginController.login(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: noUsernameOrPassword });
    });

    it('ao não receber uma password, retorne um erro', async function () {
      req.body = loginsMocks.noPasswordLoginBody;

      const serviceResponse: ServiceResponse<Token> = {
        status: 'INVALID_DATA',
        data: { message: noUsernameOrPassword }
      }

      sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);

      await loginController.login(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: noUsernameOrPassword });
    });

    it('ao receber um username inválido, retorne um erro', async function () {
      req.body = loginsMocks.unexistentUsername;

      const serviceResponse: ServiceResponse<Token> = {
        status: 'UNAUTHORIZED',
        data: { message: invalidUsernameOrPassword },
      }
      sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);

      await loginController.login(req,res);
      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({ message: invalidUsernameOrPassword });
    });

    it('ao receber uma password inválida, retorne um erro', async function () {
      req.body = loginsMocks.wrongPasswordLoginBody;

      const serviceResponse: ServiceResponse<Token> = {
        status: 'UNAUTHORIZED',
        data: { message: invalidUsernameOrPassword },
      }
      sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);

      await loginController.login(req,res);
      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({ message: invalidUsernameOrPassword });
    });

    it('ao receber um username e uma senha válidos, retorna um token', async function () {
      req.body = loginsMocks.validUser;
      const token = { token: 'm1nh4t0k3nbcr1p7v4l1d4' };

      const serviceResponse: ServiceResponse<Token> = {
        status: 'SUCCESSFUL',
        data: token,
      };

      sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);
      
      await loginController.login(req, res);
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(token);
    });
  });
});
