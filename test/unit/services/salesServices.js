const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesProductsModel = require('../../../models/salesProductsModel');
const salesService = require('../../../services/salesService');
const actualizeItems = require('../../../utils');
const { salesAll, saleId, newSale, responseSale, saleUpdated } = require('../mocksSale');

describe('Testando service da rota sales', () => {
  describe('Testando getAll', () => {
    before(async () => sinon.stub(salesModel, 'getAll')
      .resolves(salesAll));
  
    after(async () => salesModel.getAll.restore());

    it('Testando se em caso de sucesso recebe um array de objetos', async () => {
      const response = await salesService.getAll();
      expect(response).to.be.a('array')
      expect(response[0]).to.be.a('object')
    })

    it('Se tem as propriedades saleId, date, productId, quantity', async () => {
      const response = await salesService.getAll();
      expect(response[0]).to.be.property('saleId');
      expect(response[0]).to.be.property('date');
      expect(response[0]).to.be.property('productId');
      expect(response[0]).to.be.property('quantity');
    })
  })

  describe('Testando getId', () => {
    describe('Em caso de sucesso', () => {
      before(async () => {
        sinon.stub(salesModel, 'getById').resolves([saleId]);
      });
    
      after(async () => {
        salesModel.getById.restore();
      });
  
      it('Testando se em caso de sucesso recebe um objeto', async () => {
        const response = await salesService.getById({ id: 1 });
        expect(response[0]).to.be.a('object');
      });
  
      it('Se tem as propriedades saleId, date, productId, quantity', async () => {
        const response = await salesService.getById({ id: 1 });
        expect(response[0]).to.be.property('date');
        expect(response[0]).to.be.property('productId');
        expect(response[0]).to.be.property('quantity');
      });
    })

    describe('Em caso de erro', () => {
      before(async () => sinon.stub(salesModel, 'getById').resolves([[undefined]]));
      after(async () => salesModel.getById.restore());

      it('Testando se em caso de falha é lançado uma exceção com um objeto', async () => {
        try {
          await salesService.getById({ id: 999 })
        } catch (err) {
          expect(err).to.be.a('object');
        }
      });

      it('Testando se o objeto da exceção tem as propriedades status e message', async () => {
        try {
          await salesService.getById({ id: 999 })
        } catch (err) {
          expect(err).to.be.property('status');
          expect(err).to.be.property('message');
        }
      });

      it('Testando se a propriedade status é 404 e message é "Sale not found"', async () => {
        try {
          await salesService.getById({ id: 999 })
        } catch (err) {
          expect(err.status).to.be.equal(404);
          expect(err.message).to.be.equal('Sale not found');
        }
      });
    })
  });

  describe('Testando função add', () => {
    before(async () => {
      sinon.stub(actualizeItems, 'addItem').resolves();
      sinon.stub(salesModel, 'add').resolves({ id: 1 });
      sinon.stub(salesProductsModel, 'add').resolves(responseSale);
    });

    after(async () => {
      salesModel.add.restore();
      salesProductsModel.add.restore();
    });

    it('Se ao ser chamado com sucesso retorna um objeto', async () => {
      const response = await salesService.add([newSale]);
      expect(response).to.be.a('object');
    });

    it('Se tem as propriedades id, name, quantity', async () => {
      const response = await salesService.add([newSale]);
      expect(response).to.be.property('id');
      expect(response).to.be.property('itemsSold');
    });
  });

  describe('Testando função update', () => {
    describe('Em caso de sucesso', () => {
      before(async () => {
        sinon.stub(salesModel, 'getAllSaleById').resolves([saleId]);
        sinon.stub(actualizeItems, 'updateItem').resolves()
        sinon.stub(salesProductsModel, 'update').resolves(saleUpdated);
      });

      after(async () => {
        salesModel.getAllSaleById.restore();
        salesProductsModel.update.restore();
        actualizeItems.updateItem.restore();
      });
      
      it('Se ao ser chamado com sucesso retorna um objeto', async () => {
        const response = await salesService.update({ id: 1 }, [newSale]);
        expect(response).to.be.a('object');
      });
      
      it('Se tem as propriedades id, name, quantity', async () => {
        const response = await salesService.update({ id: 1 }, [newSale]);
        expect(response).to.be.property('saleId');
        expect(response).to.be.property('itemUpdated');
      });
    })

    describe('Em caso de erro', () => {
      before(async () => sinon.stub(salesModel, 'getAllSaleById').resolves([[undefined]]));
      after(async () => salesModel.getAllSaleById.restore());

      it('Testando se em caso de falha é lançado uma exceção com um objeto', async () => {
        try {
          await salesService.update({ id: 999 }, newSale)
        } catch (err) {
          expect(err).to.be.a('object');
        }
      });

      it('Testando se o objeto da exceção tem as propriedades status e message', async () => {
        try {
          await salesService.update({ id: 999 }, newSale)
        } catch (err) {
          expect(err).to.be.property('status');
          expect(err).to.be.property('message');
        }
      });

      it('Testando se a propriedade status é 404 e message é "Sale not found"', async () => {
        try {
          await salesService.update({ id: 999 })
        } catch (err) {
          expect(err.status).to.be.equal(404);
          expect(err.message).to.be.equal('Sale not found');
        }
      });
    })
  });

  describe('Testando função deleteProducts', () => {
    describe('Em caso de sucesso', () => {
      before(async () => {
        sinon.stub(salesModel, 'getAllSaleById').resolves([saleId]);
        sinon.stub(actualizeItems, 'deleteItem').resolves()
        sinon.stub(salesModel, 'deleteProduct').resolves();
        sinon.stub(salesProductsModel, 'deleteProduct').resolves();
      });

      after(async () => {
        salesModel.getAllSaleById.restore();
        actualizeItems.deleteItem.restore();
        salesModel.deleteProduct.restore();
        salesProductsModel.deleteProduct.restore();
      });
      
      it('Se ao ser chamado com sucesso retorna um objeto', async () => {
        const response = await salesService.deleteProduct({ id: 1 });
        expect(response).to.be.equal(true);
      });
    })

    describe('Em caso de erro', () => {
      before(async () => sinon.stub(salesModel, 'getAllSaleById').resolves([[undefined]]));
      after(async () => salesModel.getAllSaleById.restore());

      it('Testando se em caso de falha é lançado uma exceção com um objeto', async () => {
        try {
          await salesService.deleteProduct({ id: 999 })
        } catch (err) {
          expect(err).to.be.a('object');
        }
      });

      it('Testando se o objeto da exceção tem as propriedades status e message', async () => {
        try {
          await salesService.deleteProduct({ id: 999 })
        } catch (err) {
          expect(err).to.be.property('status');
          expect(err).to.be.property('message');
        }
      });

      it('Testando se a propriedade status é 404 e message é "Sale not found"', async () => {
        try {
          await salesService.deleteProduct({ id: 999 })
        } catch (err) {
          expect(err.status).to.be.equal(404);
          expect(err.message).to.be.equal('Sale not found');
        }
      });
    })
  });
});
