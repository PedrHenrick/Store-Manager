const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../database/connection');
const productModel = require('../../../models/productModel');
const { productsAll, productObjectAdd, productResponseAddTrue, productId } = require('../mocksProduct');

describe('Testando model da rota product', () => {
  describe('Testando função getAll', () => {
    before(async () => sinon.stub(connection, 'execute')
      .resolves(productsAll));
  
    after(async () => connection.execute.restore());
    
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

  describe('Testando função getById', () => {
    describe('Em caso de sucesso', () => {
      before(async () => sinon.stub(connection, 'execute')
      .resolves(productId[0]));
      
      after(async () => connection.execute.restore());
      
      it('Se ao ser chamado retorna um objeto', async () => {
        const response = await productModel.getById(1);
        expect(response).to.be.a('object')
      })
      
      it('Se tem as propriedades id, name, quantity', async () => {
        const response = await productModel.getById(1);
        expect(response).to.be.property('id')
        expect(response).to.be.property('name')
        expect(response).to.be.property('quantity')
      })
    })

    describe('Em caso de falha', () => {
      before(async () => sinon.stub(connection, 'execute')
      .resolves([]));
      
      after(async () => connection.execute.restore());
      
      it('Se ao ser chamado retorna um array de objetos', async () => {
        const response = await productModel.getById(9999);
        
        expect(response).to.be.a('array')
        expect(response).to.be.empty;
      })
    });
  });

  describe('Testando função add', () => {
    before(async () =>  sinon.stub(connection, 'execute')
      .resolves(productResponseAddTrue));
    
    after(async () => connection.execute.restore());
  
    it('Se ao ser chamado retorna um objeto', async () => {
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

  describe('Testando função update', () => {
    before(async () => sinon.stub(connection, 'execute')
      .resolves(productResponseAddTrue));
  
    after(async () => connection.execute.restore());
    
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

  describe('Testando função delete', () => {
    before(async () => sinon.stub(connection, 'execute')
      .resolves(productsAll));
  
    after(async () => connection.execute.restore());
    
    it('Se ao ser chamado retorna um objeto', async () => {
      const response = await productModel.deleteProduct(1);
      expect(response).to.be.a('object')
    })

    it('Se tem as propriedades id, name, quantity', async () => {
      const response = await productModel.deleteProduct(1);
      expect(response).to.be.property('id')
    })
  });
});
