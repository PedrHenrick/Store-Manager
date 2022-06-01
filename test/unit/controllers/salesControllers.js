const { expect } = require('chai');
const sinon = require('sinon');

const salesController = require('../../../controllers/salesController')
const salesService = require('../../../services/salesService')
const { salesAll, saleId, newSale, responseSale, saleUpdated } = require('../mocks');

describe('Testando rotas /sales', () => {
  const request = {};
  const response = {};

  describe('verifica /GET sales', async () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'get').resolves(salesAll);
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

  describe('verifica /GET:id sale', async () => {
    describe('Em caso de sucesso', async () => {
      before(() => {
        request.params = { id: 1 }

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(salesService, 'get').resolves(saleId);
      })
  
      after(() => {
        salesService.get.restore();
      });
  
      it('Testando se em caso de sucesso retorna um status 200', async () => {
          await salesController.getById(request, response);
  
          expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('Testando se em caso de sucesso retorna um array', async () => {
        await salesController.getById(request, response);
  
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
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
  describe('verifica /POST products', async () => {
    describe('Em caso de sucesso', () => {
      before(() => {
        request.body = newSale;

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(salesService, 'add').resolves(responseSale);
      })

      after(() => {
        salesService.add.restore();
      })

      it('retorna um objeto com o status 201', async () => {
        await salesController.add(request, response);

        expect(response.status.calledWith(201)).to.be.equal(true);
        expect(response.json.calledWith(responseSale)).to.be.equal(true);
      })
    });
  });
  describe('verifica /PUT products', async () => {
    describe('Em caso de sucesso', () => {
      before(() => {
        request.params = 1
        request.body = newSale;

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(salesService, 'update').resolves(saleUpdated);
      })

      after(() => {
        salesService.update.restore();
      })

      it('retorna um objeto com o status 200', async () => {
        await salesController.update(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(saleUpdated)).to.be.equal(true);
      })
    });
    describe('Em caso de falha', () => {
      before(() => {
        request.params = 999
        request.body = newSale;

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(salesService, 'update').resolves(undefined);
      })

      after(() => {
        salesService.update.restore();
      })

      it('retorna um messagem com o status 409', async () => {
        await salesController.update(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
      })
    });
  });
})
