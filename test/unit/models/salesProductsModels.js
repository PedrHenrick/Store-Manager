const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../database/connection');
const salesProductsModels = require('../../../models/salesProductsModel');
const { saleProductsResponseAddTrue, saleObjectAdd } = require('../mocks');

describe('Testando model de sales_products', () => {
  /// ADD
  describe('Testando função add', () => {
    describe('Se ao ser chamado com sucesso retorna um objeto', () => {
      before(async () => {  
        sinon.stub(connection, 'execute').resolves(saleProductsResponseAddTrue);
      });
      
      after(async () => {
        connection.execute.restore();
      });
    
      it('Se é um objeto', async () => {
        const response = await salesProductsModels.add(1, saleObjectAdd);

        expect(response).to.be.a('object');
      })
    
      it('Se tem a propriedade productId e quantity', async () => {
        const response = await salesProductsModels.add(1, saleObjectAdd);

        expect(response).to.be.property('productId')
        expect(response).to.be.property('quantity')
      })
    });
  });
  /// UPDATE
  describe('Testando função update', () => {
    before(async () => {  
      sinon.stub(connection, 'execute').resolves(saleProductsResponseAddTrue);
    });
  
    after(async () => {
      connection.execute.restore();
    });
    
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
});