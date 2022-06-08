const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../database/connection');
const salesProductsModels = require('../../../models/salesProductsModel');
const { saleProductsResponseAddTrue, saleObjectAdd, salesProductsAll } = require('../mocksSale');

describe('Testando model de sales_products', () => {
  describe('Testando função add', () => {
    before(async () => sinon.stub(connection, 'execute')
      .resolves(saleProductsResponseAddTrue));
    
    after(async () => connection.execute.restore());
  
    it('Se ao ser chamado com sucesso retorna um objeto', async () => {
      const response = await salesProductsModels.add(1, saleObjectAdd);
      expect(response).to.be.a('object');
    })
  
    it('Se tem a propriedade productId e quantity', async () => {
      const response = await salesProductsModels.add(1, saleObjectAdd);
      expect(response).to.be.property('productId')
      expect(response).to.be.property('quantity')
    })
  });

  describe('Testando função update', () => {
    before(async () => sinon.stub(connection, 'execute')
      .resolves(saleProductsResponseAddTrue));
    
    after(async () => connection.execute.restore());
    
    it('Se ao ser chamado com sucesso retorna um objeto', async () => {
      const response = await salesProductsModels.update(1, saleObjectAdd);
      expect(response).to.be.a('object')
    })

    it('Se tem a propriedade productId e quantity', async () => {
      const response = await salesProductsModels.update(1, saleObjectAdd);
      expect(response).to.be.property('productId')
      expect(response).to.be.property('quantity')
    })
  });

  describe('Testando função getAll', () => {
    before(async () => sinon.stub(connection, 'execute')
      .resolves(salesProductsAll));
    
    after(async () => connection.execute.restore());
    
    it('Se ao ser chamado com sucesso retorna um array de objetos', async () => {
      const response = await salesProductsModels.getAll();
      expect(response).to.be.a('array')
      expect(response[0]).to.be.a('object')
    })

    it('Se tem a propriedade saleId, productId e quantity', async () => {
      const response = await salesProductsModels.getAll();
      expect(response[0]).to.be.property('saleId')
      expect(response[0]).to.be.property('productId')
      expect(response[0]).to.be.property('quantity')
    })
  });

  describe('Testando função deleteProduct', () => {
    before(async () => sinon.stub(connection, 'execute')
      .resolves());
    
    after(async () => connection.execute.restore());
    
    it('Se ao deletar um item retorna undefined', async () => {
      const response = await salesProductsModels.deleteProduct(1);
      expect(response).to.be.a('undefined')
    })
  });
});
