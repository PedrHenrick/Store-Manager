const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../database/connection');
const productModel = require('../../../models/productModel');
const { productsAll, productObjectAdd, productResponseAddTrue } = require('../mocks');

describe('Testando model da rota product', () => {
  /// GETALL
  describe('Testando função getAll', () => {
    before(async () => {  
      sinon.stub(connection, 'execute').resolves(productsAll);
    });
  
    after(async () => {
      connection.execute.restore();
    });
    
    it('Se ao ser chamado retorna um array de objetos', async () => {
      const response = await productModel.getAll();

      expect(response).to.be.a('array')
      expect(response[0]).to.be.a('object')
    })

    it('Se tem as propriedades id, name, quantity', async () => {
      const response = await productModel.getAll();

      expect(response[0]).to.be.property('id')
      expect(response[0]).to.be.property('name')
      expect(response[0]).to.be.property('quantity')
    })
  });
  /// ADD
  describe('Testando função add', () => {
    describe('Se ao ser chamado com sucesso retorna um objeto', () => {
      before(async () => {  
        sinon.stub(connection, 'execute').resolves(productResponseAddTrue);
      });
      
      after(async () => {
        connection.execute.restore();
      });
    
      it('Se é um objeto', async () => {
        const response = await productModel.add(productObjectAdd);

        expect(response).to.be.a('object')
      })
    
      it('Se tem as propriedades id, name, quantity', async () => {
        const response = await productModel.add(productObjectAdd);

        expect(response).to.be.property('id')
        expect(response).to.be.property('name')
        expect(response).to.be.property('quantity')
      })
    });
  });
  /// UPDATE
  describe('Testando função update', () => {
    before(async () => {  
      sinon.stub(connection, 'execute').resolves(productResponseAddTrue);
    });
  
    after(async () => {
      connection.execute.restore();
    });
    
    it('Se ao ser chamado retorna um array de objetos', async () => {
      const response = await productModel.update(1, productObjectAdd);

      expect(response).to.be.a('object')
    })

    it('Se tem as propriedades id, name, quantity', async () => {
      const response = await productModel.update(1, productObjectAdd);

      expect(response).to.be.property('id')
      expect(response).to.be.property('name')
      expect(response).to.be.property('quantity')
    })
  });
  /// DELETE
  describe('Testando função delete', () => {
    before(async () => {  
      sinon.stub(connection, 'execute').resolves(productsAll);
    });
  
    after(async () => {
      connection.execute.restore();
    });
    
    it('Se ao ser chamado retorna um array de objetos', async () => {
      const response = await productModel.deleteProduct(1);

      expect(response).to.be.a('object')
    })

    it('Se tem as propriedades id, name, quantity', async () => {
      const response = await productModel.deleteProduct(1);

      expect(response).to.be.property('id')
    })
  });
})