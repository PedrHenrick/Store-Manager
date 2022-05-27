const productsAll = [
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
]

const productId = {
  "id": 1,
  "name": "Martelo de Thor",
  "quantity": 10
}

const salesAll = [
  {
      "saleId": 1,
      "date": "2022-05-27T16:01:51.000Z",
      "productId": 1,
      "quantity": 5
  },
  {
      "saleId": 1,
      "date": "2022-05-27T16:01:51.000Z",
      "productId": 2,
      "quantity": 10
  },
  {
      "saleId": 2,
      "date": "2022-05-27T16:01:51.000Z",
      "productId": 3,
      "quantity": 15
  }
]

const saleId = [
  {
      "date": "2022-05-27T16:01:51.000Z",
      "productId": 1,
      "quantity": 5
  },
  {
      "date": "2022-05-27T16:01:51.000Z",
      "productId": 2,
      "quantity": 10
  }
]

module.exports = {
  productsAll,
  productId,
  salesAll,
  saleId,
}