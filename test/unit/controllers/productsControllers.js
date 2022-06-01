const { expect } = require('chai');
const sinon = require('sinon');

const productController = require('../../../controllers/productController')
const productService = require('../../../services/productService')
const { productsAll, productId, newProduct, product, existingProduct } = require('../mocks');

describe('Testando rotas /products', () => {
  const request = {};
  const response = {};

  describe('verifica /GET products', async () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'get').resolves(productsAll);
    })

    after(() => {
      productService.get.restore();
    });

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
    describe('Em caso de sucesso', async () => {
      before(() => {
        request.params = { id: 1 }

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(productService, 'get').resolves(...productId);
      })
  
      after(() => {
        productService.get.restore();
      });
  
      it('Testando se em caso de sucesso retorna um status 200', async () => {
          await productController.getById(request, response);
  
          expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('Testando se em caso de sucesso retorna um object', async () => {
        await productController.getById(request, response);
  
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });

    describe('Em caso de falha', async () => {    
      before(() => {  
        request.params = { id: 9999 }

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(productService, 'get').resolves(undefined);
      })
  
      after(() => {
        productService.get.restore();
      });
  
      it('Testando se em caso de sucesso retorna um status 404', async () => {
          await productController.getById(request, response);
          expect(response.status.calledWith(404)).to.be.equal(true);
      });
  
      it('Testando se em caso de sucesso retorna um array', async () => {
        await productController.getById(request, response);
  
        expect(response.json.calledWith({ message: "Product not found" })).to.be.equal(true);
      });
    });
  });
  /// ADD
  describe('verifica /POST products', async () => {
    describe('Em caso de sucesso', () => {
      before(() => {
        request.body = newProduct;

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productService, 'add').resolves(product);
      })

      after(() => {
        productService.add.restore();
      })

      it('retorna um objeto com o status 201', async () => {
        await productController.add(request, response);

        expect(response.status.calledWith(201)).to.be.equal(true);
        expect(response.json.calledWith(product)).to.be.equal(true);
      })
    });
    describe('Em caso de falha', () => {
      before(() => {
        request.body = existingProduct;

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productService, 'add').resolves(undefined);
      })

      after(() => {
        productService.add.restore();
      })

      it('retorna um messagem com o status 409', async () => {
        await productController.add(request, response);

        expect(response.status.calledWith(409)).to.be.equal(true);
        expect(response.json.calledWith({ message: 'Product already exists' })).to.be.equal(true);
      })
    });
  });
  /// UPDATE
  describe('verifica /PUT products', async () => {
    describe('Em caso de sucesso', () => {
      before(() => {
        request.params = 1
        request.body = newProduct;

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(productService, 'update').resolves(product);
      })

      after(() => {
        productService.update.restore();
      })

      it('retorna um objeto com o status 200', async () => {
        await productController.update(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(product)).to.be.equal(true);
      })
    });
    describe('Em caso de falha', () => {
      before(() => {
        request.params = 999
        request.body = existingProduct;

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productService, 'update').resolves(undefined);
      })

      after(() => {
        productService.update.restore();
      })

      it('retorna um messagem com o status 409', async () => {
        await productController.update(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      })
    });
  });
  /// DELETE
  describe('verifica /DELETE products', async () => {
    describe('Em caso de sucesso', () => {
      before(() => {
        request.params = 1

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(productService, 'deleteProduct').resolves(1);
      })

      after(() => {
        productService.deleteProduct.restore();
      })

      it('retorna nada com o status 204', async () => {
        await productController.deleteProduct(request, response);

        expect(response.status.calledWith(204)).to.be.equal(true);
        expect(response.json.calledWith()).to.be.equal(true);
      })
    });
    describe('Em caso de falha', () => {
      before(() => {
        request.params = 999

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productService, 'deleteProduct').resolves(undefined);
      })

      after(() => {
        productService.deleteProduct.restore();
      })

      it('retorna um messagem com o status 409', async () => {
        await productController.deleteProduct(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      })
    });
  });
})
