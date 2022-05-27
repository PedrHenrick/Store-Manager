const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('Testando service da rota sales', () => {
  describe('Testando get-All', () => {
    before(async () => {
      const result = [[
        {
            "saleId": 1,
            "date": "2022-05-26T21:09:36.000Z",
            "productId": 1,
            "quantity": 5
        },
        {
            "saleId": 1,
            "date": "2022-05-26T21:09:36.000Z",
            "productId": 2,
            "quantity": 10
        },
        {
            "saleId": 2,
            "date": "2022-05-26T21:09:36.000Z",
            "productId": 3,
            "quantity": 15
        }
      ]];
  
      sinon.stub(salesModel, 'getAll').resolves(result);
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
        const result = [[
          {
            "saleId": 1,
            "date": "2022-05-26T21:09:36.000Z",
            "productId": 1,
            "quantity": 5
          },
        ]];
    
        sinon.stub(salesModel, 'getById').resolves(result);
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
        const result = [[]];

        sinon.stub(salesModel, 'getById').resolves(result);
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