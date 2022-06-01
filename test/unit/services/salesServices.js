const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesProductsModel = require('../../../models/salesProductsModel');
const salesService = require('../../../services/salesService');
const { salesAll, saleId, newSale, responseSale, saleUpdated, allSales } = require('../mocks');

describe('Testando service da rota sales', () => {
  describe('Testando get-All', () => {
    before(async () => {
      sinon.stub(salesModel, 'getAll').resolves([salesAll]);
    });
  
    after(async () => {
      salesModel.getAll.restore();
    });

    it('Testando se em caso de sucesso recebe um array de objetos', async () => {
      const response = await salesService.get();

      expect(response).to.be.a('array')
      expect(response[0]).to.be.a('object')
    })

    it('Se tem as propriedades saleId, date, productId, quantity', async () => {
      const response = await salesService.get();

      expect(response[0]).to.be.property('saleId');
      expect(response[0]).to.be.property('date');
      expect(response[0]).to.be.property('productId');
      expect(response[0]).to.be.property('quantity');
    })
  })

  describe('Testando get-Id', () => {
    describe('Em caso de sucesso', () => {
      before(async () => {
        sinon.stub(salesModel, 'getById').resolves([saleId]);
      });
    
      after(async () => {
        salesModel.getById.restore();
      });
  
      it('Testando se em caso de sucesso recebe um objeto', async () => {
        const response = await salesService.get(1);

        expect(response[0]).to.be.a('object');
      });
  
      it('Se tem as propriedades saleId, date, productId, quantity', async () => {
        const response = await salesService.get(1);

        expect(response[0]).to.be.property('date');
        expect(response[0]).to.be.property('productId');
        expect(response[0]).to.be.property('quantity');
      });
    })

    describe('Em caso de falha', () => {
      before(async () => {
        sinon.stub(salesModel, 'getById').resolves([[]]);
      });
    
      after(async () => {
        salesModel.getById.restore();
      });
  
      it('Se ao receber um array vazio retorna "undefined"', async () => {
        const id = 5;
        const response = await salesService.get(id);

        expect(response).to.be.a('undefined')
      })
    })
  })
  describe('Testando função add', () => {
    describe('Se ao ser chamado com sucesso retorna um objeto', () => {
      const id = { id: 1 };
      before(async () => {
        sinon.stub(salesModel, 'add').resolves(id);
        sinon.stub(salesProductsModel, 'add').resolves(responseSale);
      });
    
      after(async () => {
        salesModel.add.restore();
        salesProductsModel.add.restore();
      });
  
      it('Testando se em caso de sucesso recebe um objeto', async () => {
        const response = await salesService.add([newSale]);

        expect(response).to.be.a('object');
      });
  
      it('Se tem as propriedades id, name, quantity', async () => {
        const response = await salesService.add([newSale]);

        expect(response).to.be.property('id');
        expect(response).to.be.property('itemsSold');
      });
    });
  });
  describe('Testando função update', () => {
    describe('Se ao ser chamado com sucesso retorna um objeto', () => {
      before(async () => {
        sinon.stub(salesModel, 'getAllSale').resolves([allSales]);
        sinon.stub(salesProductsModel, 'update').resolves(saleUpdated);
      });

      after(async () => {
        salesModel.getAllSale.restore();
        salesProductsModel.update.restore();
      });
  
      it('Testando se em caso de sucesso recebe um objeto', async () => {
        const response = await salesService.update(1, [newSale]);

        expect(response).to.be.a('object');
      });
  
      it('Se tem as propriedades id, name, quantity', async () => {
        const response = await salesService.update(1, [newSale]);

        expect(response).to.be.property('saleId');
        expect(response).to.be.property('itemUpdated');
      });
    });
    describe('Se ao ser chamado com erro retorna um undefined', () => {
      before(async () => {
        sinon.stub(salesModel, 'getAllSale').resolves([salesAll]);
      });
      
      after(async () => {
        salesModel.getAllSale.restore();
      });
      
      it('Testando se em caso de sucesso recebe um objeto', async () => {
        const response = await salesService.update(999, newSale);
        
        expect(response).to.be.a('undefined');
      });
    })
  });
})