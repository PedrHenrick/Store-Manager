const app = require('../../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Testando rotas /sales', () => {
  describe('verifica /GET sales', async () => {
    it('Testando se em caso de sucesso retorna um status 200', async () => {
        const res = await chai.request(app).get('/sales');
        
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.a('array');
    });
  });

  describe('verifica /GET:id sales', async () => {
    it('Testando se em caso de sucesso retorna um status 200 e um array de objetos', async () => {
        const res = await chai.request(app).get('/sales/1');
        
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body[0]).to.be.a('object');
    });

    it('Testando se em caso de falha retorna um status 404 e a mensagem "Product not found"', async () => {
      const res = await chai.request(app).get('/sales/5000');
      
      expect(res.statusCode).to.be.equal(404);
      expect(res.text).to.be.equal('{"message":"Sale not found"}')
    });
  });
})
