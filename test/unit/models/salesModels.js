const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../database/connection');
const salesModel = require('../../../models/salesModel');
const { salesAll, saleId, saleObjectAdd, saleResponseAddTrue } = require('../mocks');

describe('Testando model da rota sales', () => {
  describe('Testando função getAll', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves(salesAll);
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
        sinon.stub(connection, 'execute').resolves(saleId);
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
        sinon.stub(connection, 'execute').resolves([]);
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
  })
  describe('Testando função add', () => {
    describe('Se ao ser chamado com sucesso retorna um objeto', () => {
      before(async () => {  
        sinon.stub(connection, 'execute').resolves(saleResponseAddTrue);
      });
      
      after(async () => {
        connection.execute.restore();
      });
    
      it('Se é um objeto', async () => {
        const response = await salesModel.add();

        expect(response).to.be.a('object')
      })
    
      it('Se tem a propriedade id', async () => {
        const response = await salesModel.add();
        
        expect(response).to.be.property('id')
      })
    });
  });
  describe('Testando função getAllSale', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves(saleResponseAddTrue);
    });
  
    after(async () => {
      connection.execute.restore();
    });
    
    it('Se ao ser chamado retorna um array de objetos', async () => {
      const response = await salesModel.getAllSale();

      expect(response).to.be.a('array')
      expect(response[0]).to.be.a('object')
    })

    it('Se tem as propriedades id, date', async () => {
      const response = await salesModel.getAllSale();

      expect(response[0]).to.be.property('id')
      expect(response[0]).to.be.property('date')
    })
  });
});