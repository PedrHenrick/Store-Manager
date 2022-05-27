const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../database/connection');
const productModel = require('../../../models/productModel');

describe('Testando model da rota product', () => {
  describe('Testando função getAll', () => {
    before(async () => {
      const result = [
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
    ];
  
      sinon.stub(connection, 'execute').resolves(result);
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
})