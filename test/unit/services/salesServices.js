const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const { salesAll, saleId } = require('../mocks');

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
        const id = 1;
        const response = await salesService.get(id);

        expect(response[0]).to.be.a('object');
      });
  
      it('Se tem as propriedades saleId, date, productId, quantity', async () => {
        const response = await salesService.get();
  
        expect(response[0]).to.be.property('saleId');
        expect(response[0]).to.be.property('date');
        expect(response[0]).to.be.property('productId');
        expect(response[0]).to.be.property('quantity');
      })
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
})