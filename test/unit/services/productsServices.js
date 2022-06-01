const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');
const { productsAll, productId, newProduct, product, existingProduct } = require('../mocks');

describe('Testando service da rota product', () => {
  describe('Testando get-All', () => {
    before(async () => { 
      sinon.stub(productModel, 'getAll').resolves([productsAll]);
    });
  
    after(async () => {
      productModel.getAll.restore();
    });

    it('Testando se em caso de sucesso recebe um array de objetos', async () => {
      const response = await productService.get();

      expect(response).to.be.a('array')
      expect(response[0]).to.be.a('object')
    })

    it('Se tem as propriedades id, name, quantity', async () => {
      const response = await productService.get();

      expect(response[0]).to.be.property('id')
      expect(response[0]).to.be.property('name')
      expect(response[0]).to.be.property('quantity')
    })
    })

  describe('Testando get-Id', () => {
    describe('Em caso de sucesso', () => {
      before(async () => {
        sinon.stub(productModel, 'getAll').resolves([productId]);
      });
    
      after(async () => {
        productModel.getAll.restore();
      });
  
      it('Testando se em caso de sucesso recebe um objeto', async () => {
        const id = 1;
        const response = await productService.get(id);

        expect(response).to.be.a('object');
      });
  
      it('Se tem as propriedades id, name, quantity', async () => {
        const id = 1;
        const response = await productService.get(id);

        expect(response).to.be.property('id');
        expect(response).to.be.property('name');
        expect(response).to.be.property('quantity');
      });
    })

    describe('Em caso de falha', () => {
      before(async () => {
        sinon.stub(productModel, 'getAll').resolves([[]]);
      });
    
      after(async () => {
        productModel.getAll.restore();
      });
  
      it('Se ao receber um array vazio retorna "undefined"', async () => {
        const id = 5;
        const response = await productService.get(id);

        expect(response).to.be.a('undefined')
      })
    })
  })
  /// ADD
  describe('Testando função add', () => {
    describe('Se ao ser chamado com sucesso retorna um objeto', () => {
      before(async () => {
        sinon.stub(productModel, 'getAll').resolves([productsAll]);
        sinon.stub(productModel, 'add').resolves(product);
      });
    
      after(async () => {
        productModel.add.restore();
        productModel.getAll.restore();
      });
  
      it('Testando se em caso de sucesso recebe um objeto', async () => {
        const response = await productService.add(newProduct);

        expect(response).to.be.a('object');
      });
  
      it('Se tem as propriedades id, name, quantity', async () => {
        const response = await productService.add(newProduct);

        expect(response).to.be.property('id');
        expect(response).to.be.property('name');
        expect(response).to.be.property('quantity');
      });
    });
    describe('Se ao ser chamado com erro retorna um undefined', () => {
      before(async () => {
        sinon.stub(productModel, 'getAll').resolves([productsAll]);
      });
    
      after(async () => {
        productModel.getAll.restore();
      });
  
      it('Testando se em caso de sucesso recebe um objeto', async () => {
        const response = await productService.add(existingProduct);

        expect(response).to.be.a('undefined');
      });
    })
  });
  /// UPDATE
  describe('Testando função update', () => {
    describe('Se ao ser chamado com sucesso retorna um objeto', () => {
      before(async () => {
        sinon.stub(productModel, 'getAll').resolves([productsAll]);
        sinon.stub(productModel, 'update').resolves({ id: 1, name: newProduct.name, quantity: newProduct.quantity });
      });
    
      after(async () => {
        productModel.getAll.restore();
        productModel.update.restore();
      });
  
      it('Testando se em caso de sucesso recebe um objeto', async () => {
        const response = await productService.update(1, newProduct);

        expect(response).to.be.a('object');
      });
  
      it('Se tem as propriedades id, name, quantity', async () => {
        const response = await productService.update(1, newProduct);

        expect(response).to.be.property('id');
        expect(response).to.be.property('name');
        expect(response).to.be.property('quantity');
      });
    });
    describe('Se ao ser chamado com erro retorna um undefined', () => {
      before(async () => {
        sinon.stub(productModel, 'getAll').resolves([productsAll]);
      });
      
      after(async () => {
        productModel.getAll.restore();
      });
      
      it('Testando se em caso de sucesso recebe um objeto', async () => {
        const response = await productService.update(newProduct);
        
        expect(response).to.be.a('undefined');
      });
    })
  });
  /// DELETE
  describe('Testando função delete', () => {
    describe('Se ao ser chamado com sucesso retorna um objeto', () => {
      before(async () => {
        sinon.stub(productModel, 'getAll').resolves([productsAll]);
        sinon.stub(productModel, 'deleteProduct').resolves({ id: 1 });
      });
    
      after(async () => {
        productModel.getAll.restore();
        productModel.deleteProduct.restore();
      });
  
      it('Testando se em caso de sucesso recebe um objeto', async () => {
        const response = await productService.deleteProduct(1);

        expect(response).to.be.a('object');
      });
  
      it('Se tem a propriedade id', async () => {
        const response = await productService.deleteProduct(1);

        expect(response).to.be.property('id');
      });
    });
    describe('Se ao ser chamado com erro retorna um undefined', () => {
      before(async () => {
        sinon.stub(productModel, 'getAll').resolves([productsAll]);
      });
      
      after(async () => {
        productModel.getAll.restore();
      });
      
      it('Testando se em caso de sucesso recebe um objeto', async () => {
        const response = await productService.deleteProduct(999);
        
        expect(response).to.be.a('undefined');
      });
    })
  });
});