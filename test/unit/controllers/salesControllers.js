const { expect } = require('chai');
const sinon = require('sinon');

const salesController = require('../../../controllers/salesController')
const salesService = require('../../../services/salesService')
const { salesAll, saleId, newSale, responseSale, saleUpdated } = require('../mocksSale');

describe('Testando rotas /sales', () => {
  const request = {};
  const response = {};

  describe('verifica /GET sales', async () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves([salesAll]);
    })
    after(() => salesService.getAll.restore());

    it('Testando se em caso de sucesso retorna um status 200', async () => {
        await salesController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Testando se em caso de sucesso retorna um array', async () => {
      await salesController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('verifica /GET:id sale', async () => {
    describe('Em caso de sucesso', async () => {
      before(() => {
        request.params = { id: 1 }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'getById').resolves(saleId);
      })
      after(() => salesService.getById.restore());
  
      it('Testando se em caso de sucesso retorna um status 200', async () => {
          await salesController.getById(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('Testando se em caso de sucesso retorna um array', async () => {
        await salesController.getById(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });
  });
  describe('verifica /POST sale', async () => {
    describe('Em caso de sucesso', () => {
      before(() => {
        request.body = newSale;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'add').resolves(responseSale);
      })
      after(() => salesService.add.restore())

      it('retorna um objeto com o status 201', async () => {
        await salesController.add(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
        expect(response.json.calledWith(responseSale)).to.be.equal(true);
      })
    });
  });

  describe('verifica /PUT sale', async () => {
    describe('Em caso de sucesso', () => {
      before(() => {
        request.params = 1
        request.body = newSale;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();     
        sinon.stub(salesService, 'update').resolves(saleUpdated);
      })
      after(() => salesService.update.restore())

      it('retorna um objeto com o status 200', async () => {
        await salesController.update(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(saleUpdated)).to.be.equal(true);
      })
    });
  });

  describe('verifica /DELETE sale', async () => {
    describe('Em caso de sucesso', () => {
      before(() => {
        request.params = 1
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();     
        sinon.stub(salesService, 'deleteProduct').resolves();
      })
      after(() => salesService.deleteProduct.restore())

      it('retorna um objeto com o status 204', async () => {
        await salesController.deleteProduct(request, response);
        expect(response.status.calledWith(204)).to.be.equal(true);
        expect(response.json.calledWith()).to.be.equal(true);
      })
    });
  });
})
