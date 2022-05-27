const app = require('../../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Testando rotas /products', () => {

  describe('verifica /GET products', async () => {
    it('Testando se em caso de sucesso retorna um status 200', async () => {
        const res = await chai.request(app).get('/products');

        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.a('array');
    });
  });

  describe('verifica /GET:id products', async () => {
    it('Testando se em caso de sucesso retorna um status 200', async () => {
        const res = await chai.request(app).get('/products/1');
        
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.a('object');
    });

    it('Testando se em caso de falha retorna um status 404 e a mensagem "Product not found"', async () => {
      const res = await chai.request(app).get('/products/5000');
      
      expect(res.statusCode).to.be.equal(404);
      expect(res.text).to.be.equal('{"message":"Product not found"}')
    });
  });
})
