const { expect } = require('chai');
const sinon = require('sinon');

const salesController = require('../../../controllers/salesController')
const salesService = require('../../../services/salesService')
const { productsAll, productId } = require('../mocks');

describe('Testando rotas /products', () => {
  const request = {};
  const response = {};

  describe('verifica /GET products', async () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'get').resolves(productsAll);
    })

    after(() => {
        salesService.get.restore();
    });

    it('Testando se em caso de sucesso retorna um status 200', async () => {
        await salesController.getAll(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Testando se em caso de sucesso retorna um array', async () => {
      await salesController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('verifica /GET:id products', async () => {
    describe('Em caso de sucesso', async () => {
      before(() => {
        request.params = { id: 1 }

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(salesService, 'get').resolves(productId);
      })
  
      after(() => {
        salesService.get.restore();
      });
  
      it('Testando se em caso de sucesso retorna um status 200', async () => {
          await salesController.getById(request, response);
  
          expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('Testando se em caso de sucesso retorna um object', async () => {
        await salesController.getById(request, response);
  
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });

    describe('Em caso de falha', async () => {    
      before(() => {  
        request.params = { id: 9999 }

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(salesService, 'get').resolves(undefined);
      })
  
      after(() => {
        salesService.get.restore();
      });
  
      it('Testando se em caso de sucesso retorna um status 404', async () => {
          await salesController.getById(request, response);
          expect(response.status.calledWith(404)).to.be.equal(true);
      });
  
      it('Testando se em caso de sucesso retorna um array', async () => {
        await salesController.getById(request, response);
  
        expect(response.json.calledWith({ message: "Sale not found" })).to.be.equal(true);
      });
    });
  });
})
