const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

describe('Testando service da rota product', () => {
  describe('Testando get-All', () => {
    before(async () => {
      const result = [[
        {
            "id": 1,
            "name": "Martelo de Thor",
            "quantity": 10
        },
        {
            "id": 2,
            "name": "Traje de encolhimento",
            "quantity": 20
        },
        {
            "id": 3,
            "name": "Escudo do Capitão América",
            "quantity": 30
        }
    ]];
  
      sinon.stub(productModel, 'getAll').resolves(result);
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
        const result = [[
          {
              "id": 1,
              "name": "Martelo de Thor",
              "quantity": 10
          },
      ]];
    
        sinon.stub(productModel, 'getAll').resolves(result);
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
        const result = [[]];

        sinon.stub(productModel, 'getAll').resolves(result);
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
})