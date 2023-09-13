import { expect } from 'chai';
import sinon from 'sinon';
import loginsMocks from '../../mocks/logins.mocks';
import loginService from '../../../src/services/login.services';
import UserModel from '../../../src/database/models/user.model';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  const noUsernameOrPassword = '"username" and "password" are required';
  const invalidUsernameOrPassword = 'Username or password invalid';

    describe('#verifyLogin', function () {
      it('ao não receber um username, retorna um erro', async function () {
        const parameters = loginsMocks.noUsernameLoginBody;

        const serviceResponse = await loginService.verifyLogin(parameters);

        expect(serviceResponse.status).to.eq('INVALID_DATA');
        expect(serviceResponse.data).not.to.have.key('token');
        expect(serviceResponse.data).to.deep.eq({ message: noUsernameOrPassword });  
      });

      it('ao não receber uma password, retorna um erro', async function () {
        const parameters = loginsMocks.noPasswordLoginBody;

        const serviceResponse = await loginService.verifyLogin(parameters);

        expect(serviceResponse.status).to.eq('INVALID_DATA');
        expect(serviceResponse.data).not.to.have.key('token');
        expect(serviceResponse.data).to.deep.eq({ message: noUsernameOrPassword });  
      });

      it('ao receber um username inexistente, retorne um erro', async function () {
        sinon.stub(UserModel, 'findOne').resolves(null);

        const parameters = loginsMocks.unexistentUsername;
        const serviceResponse = await loginService.verifyLogin(parameters);

        expect(serviceResponse.status).to.eq('UNAUTHORIZED');
        expect(serviceResponse.data).not.to.have.key('token');
        expect(serviceResponse.data).to.deep.eq({ message: invalidUsernameOrPassword }); 
      });

      // it('ao receber uma password inexistente, retorne um erro', async function () {
      //   const findOneReturn = UserModel.build({
      //     username: 'Hagar',
      //     password: 'terrível',
      //     id: 1,
      //   })
      //   sinon.stub(UserModel, 'findOne').resolves(null);

      //   const parameters = loginsMocks.unexistentUsername;
      //   const serviceResponse = await loginService.verifyLogin(parameters);

      //   expect(serviceResponse.status).to.eq('UNAUTHORIZED');
      //   expect(serviceResponse.data).not.to.have.key('token');
      //   expect(serviceResponse.data).to.deep.eq({ message: invalidUsernameOrPassword }); 
      // });
    });
});
