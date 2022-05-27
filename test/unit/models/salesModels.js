const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../database/connection');
const salesModel = require('../../../models/salesModel');

describe('Testando model da rota sales', () => {
  describe('Testando função getAll', () => {
    before(async () => {
      const result = [
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
    ];
  
      sinon.stub(connection, 'execute').resolves(result);
    });
  
    after(async () => {
      connection.execute.restore();
    });
    
    it('Se ao ser chamado retorna um array de objetos', async () => {
      const response = await salesModel.getAll();

      expect(response).to.be.a('array')
      expect(response[0]).to.be.a('object')
    })

    it('Se tem as propriedades saleId, date, productId, quantity', async () => {
      const response = await salesModel.getAll();

      expect(response[0]).to.be.property('saleId')
      expect(response[0]).to.be.property('date')
      expect(response[0]).to.be.property('productId')
      expect(response[0]).to.be.property('quantity')
    })
  });

  describe('Testando função getById', () => {
    describe('Em caso de sucesso', () => {
      before(async () => {
        const result = [
            {
                "date": "2022-05-26T21:09:36.000Z",
                "productId": 1,
                "quantity": 5
            },
            {
                "date": "2022-05-26T21:09:36.000Z",
                "productId": 2,
                "quantity": 10
            }
        ];
    
        sinon.stub(connection, 'execute').resolves(result);
      });
    
      after(async () => {
        connection.execute.restore();
      });
      
      it('Se ao ser chamado retorna um array de objetos', async () => {
        const id = 1;
        const response = await salesModel.getById(id);
  
        expect(response).to.be.a('array')
        expect(response[0]).to.be.a('object')
        expect(response[0]).to.be.property('date')
        expect(response[0]).to.be.property('productId')
        expect(response[0]).to.be.property('quantity')
      })
    })

    describe('Em caso de falha', () => {
      before(async () => {
        const result = [];
    
        sinon.stub(connection, 'execute').resolves(result);
      });
    
      after(async () => {
        connection.execute.restore();
      });
      
      it('Se ao ser chamado retorna um array vazio', async () => {
        const id = 5;
        const response = await salesModel.getById(id);
  
        expect(response).to.be.a('array')
        expect(response).to.be.empty;
      })
    })
  });
})