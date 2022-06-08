const { expect } = require('chai');
const sinon = require('sinon');

const productController = require('../../../controllers/productController')
const productService = require('../../../services/productService')
const { productsAll, productId, newProduct, product } = require('../mocksProduct');

describe('Testando rotas /products', () => {
  const request = {};
  const response = {};

  describe('verifica /GET products', async () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves([productsAll]);
    })
    after(() => productService.getAll.restore());

    it('Testando se em caso de sucesso retorna um status 200', async () => {
        await productController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Testando se em caso de sucesso retorna um array', async () => {
      await productController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('verifica /GET:id products', async () => {
    before(() => {
      request.params = { id: 1 }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getById').resolves(...productId);
    })
    after(() => productService.getById.restore());

    it('Testando se em caso de sucesso retorna um status 200', async () => {
        await productController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Testando se em caso de sucesso retorna um object', async () => {
      await productController.getById(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('verifica /POST products', async () => {
    before(() => {
      request.body = newProduct;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'add').resolves(product);
    })
    after(() => productService.add.restore())

    it('retorna um objeto com o status 201', async () => {
      await productController.add(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(product)).to.be.equal(true);
    })
  });

  describe('verifica /PUT products', async () => {
    before(() => {
      request.params = 1
      request.body = newProduct;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'update').resolves(product);
    })
    after(() => productService.update.restore())

    it('retorna um objeto com o status 200', async () => {
      await productController.update(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(product)).to.be.equal(true);
    })
  });

  describe('verifica /DELETE products', async () => {
    before(() => {
      request.params = 1
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'deleteProduct').resolves(1);
    })
    after(() => productService.deleteProduct.restore())

    it('retorna nada com o status 204', async () => {
      await productController.deleteProduct(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);
      expect(response.json.calledWith()).to.be.equal(true);
    })
  });
});
