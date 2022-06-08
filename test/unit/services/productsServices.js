const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');
const { productsAll, productId, newProduct, product, existingProduct } = require('../mocksProduct');

describe('Testando service da rota product', () => {
  describe('Testando getAll', () => {
    before(async () => sinon.stub(productModel, 'getAll')
      .resolves(productsAll));
    after(async () => productModel.getAll.restore());

    it('Se em caso de sucesso recebe um array de objetos', async () => {
      const response = await productService.getAll();
      expect(response).to.be.a('array')
      expect(response[0]).to.be.a('object')
    })

    it('Se tem as propriedades id, name, quantity', async () => {
      const response = await productService.getAll();

      expect(response[0]).to.be.property('id')
      expect(response[0]).to.be.property('name')
      expect(response[0]).to.be.property('quantity')
    })
  })

  describe('Testando getById', () => {
    describe('Em caso de sucesso', () => {
      before(async () => sinon.stub(productModel, 'getById').resolves([productId]));
      after(async () => productModel.getById.restore());
  
      it('Testando se em caso de sucesso recebe um objeto', async () => {
        const response = await productService.getById(1);
        expect(response).to.be.a('object');
      });
  
      it('Se tem as propriedades id, name, quantity', async () => {
        const response = await productService.getById(1);
        expect(response).to.be.property('id');
        expect(response).to.be.property('name');
        expect(response).to.be.property('quantity');
      });
    })

    describe('Em caso de erro', () => {
      before(async () => sinon.stub(productModel, 'getById').resolves([[undefined]]));
      after(async () => productModel.getById.restore());

      it('Testando se em caso de falha é lançado uma exceção com um objeto', async () => {
        try {
          await productService.getById({ id: 999 })
        } catch (err) {
          expect(err).to.be.a('object');
        }
      });

      it('Testando se o objeto da exceção tem as propriedades status e message', async () => {
        try {
          await productService.getById({ id: 999 })
        } catch (err) {
          expect(err).to.be.property('status');
          expect(err).to.be.property('message');
        }
      });

      it('Testando se a propriedade status é 404 e message é "Product not found"', async () => {
        try {
          await productService.getById({ id: 999 })
        } catch (err) {
          expect(err.status).to.be.equal(404);
          expect(err.message).to.be.equal('Product not found');
        }
      });
    })
  })
  
  describe('Testando função add', () => {
    describe('Em caso de sucesso', () => {
      before(async () => {
        sinon.stub(productModel, 'getAll').resolves([productsAll]);
        sinon.stub(productModel, 'add').resolves(product);
      });
      after(async () => {
        productModel.getAll.restore();
        productModel.add.restore();
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
    })

    describe('Em caso de erro', () => {
      before(async () => sinon.stub(productModel, 'getAll').resolves([[existingProduct]]));
      after(async () => productModel.getAll.restore());

      it('Testando se em caso de falha é lançado uma exceção com um objeto', async () => {
        try {
          await productService.add(existingProduct)
        } catch (err) {
          expect(err).to.be.a('object');
        }
      });

      it('Testando se o objeto da exceção tem as propriedades status e message', async () => {
        try {
          await productService.add(existingProduct)
        } catch (err) {
          expect(err).to.be.property('status');
          expect(err).to.be.property('message');
        }
      });

      it('Testando se a propriedade status é 409 e message é "Product already exists"', async () => {
        try {
          await productService.add(existingProduct)
        } catch (err) {
          expect(err.status).to.be.equal(409);
          expect(err.message).to.be.equal('Product already exists');
        }
      });
    })
  });
  
  describe('Testando função update', () => {
    describe('Em caso de sucesso', () => {
      before(async () => {
        sinon.stub(productModel, 'getById').resolves([productId]);
        sinon.stub(productModel, 'update').resolves({ id: 1, name: newProduct.name, quantity: newProduct.quantity });
      });
      after(async () => {
        productModel.getById.restore();
        productModel.update.restore();
      });

      it('Se ao ser chamado com sucesso retorna um objeto', async () => {
        const response = await productService.update({ id: 1 }, newProduct);
        expect(response).to.be.a('object');
      });

      it('Se tem as propriedades id, name, quantity', async () => {
        const response = await productService.update({ id: 1 }, newProduct);
        expect(response).to.be.property('id');
        expect(response).to.be.property('name');
        expect(response).to.be.property('quantity');
      });
    })

    describe('Em caso de erro', () => {
      before(async () => sinon.stub(productModel, 'getById').resolves([[undefined]]));
      after(async () => productModel.getById.restore());

      it('Testando se em caso de falha é lançado uma exceção com um objeto', async () => {
        try {
          await productService.update({ id: 999 })
        } catch (err) {
          expect(err).to.be.a('object');
        }
      });

      it('Testando se o objeto da exceção tem as propriedades status e message', async () => {
        try {
          await productService.update({ id: 999 }, newProduct)
        } catch (err) {
          expect(err).to.be.property('status');
          expect(err).to.be.property('message');
        }
      });

      it('Testando se a propriedade status é 404 e message é "Product not found"', async () => {
        try {
          await productService.update({ id: 999 }, newProduct)
        } catch (err) {
          expect(err.status).to.be.equal(404);
          expect(err.message).to.be.equal('Product not found');
        }
      });
    })
  });


  describe('Testando função delete', () => {
    describe('Em caso de sucesso', () => {
      before(async () => {
        sinon.stub(productModel, 'getById').resolves([productId]);
        sinon.stub(productModel, 'deleteProduct').resolves({ id: 1 });
      });
      after(async () => {
        productModel.getById.restore();
        productModel.deleteProduct.restore();
      });
      
      it('Se ao ser chamado com sucesso retorna um objeto', async () => {
        const response = await productService.deleteProduct({ id: 1 });
        expect(response).to.be.a('object');
      });

      it('Se tem a propriedade id', async () => {
        const response = await productService.deleteProduct({ id: 1 });
        expect(response).to.be.property('id');
      });
    })

    describe('Em caso de erro', () => {
      before(async () => sinon.stub(productModel, 'getById').resolves([[undefined]]));
      after(async () => productModel.getById.restore());

      it('Testando se em caso de falha é lançado uma exceção com um objeto', async () => {
        try {
          await productService.deleteProduct({ id: 999 })
        } catch (err) {
          expect(err).to.be.a('object');
        }
      });

      it('Testando se o objeto da exceção tem as propriedades status e message', async () => {
        try {
          await productService.deleteProduct({ id: 999 })
        } catch (err) {
          expect(err).to.be.property('status');
          expect(err).to.be.property('message');
        }
      });

      it('Testando se a propriedade status é 404 e message é "Product not found"', async () => {
        try {
          await productService.deleteProduct({ id: 999 })
        } catch (err) {
          expect(err.status).to.be.equal(404);
          expect(err.message).to.be.equal('Product not found');
        }
      });
    })
  });
});
