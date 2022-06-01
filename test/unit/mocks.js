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

const productId = [{
  "id": 1,
  "name": "Martelo de Thor",
  "quantity": 10
}]

const newProduct = {
  "name": "Bananinha",
  "quantity": 10
}

const existingProduct = {
  "name": "Martelo de Thor",
  "quantity": 10
}

const product = {
  "id": 99,
  "name": "Bananinha",
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

const allSales = [
  { "id": 1, "date": "2022-05-31T03:55:07.000Z" },
  { "id": 2, "date": "2022-05-31T03:55:07.000Z" }
]

const newSale = {
  "productId": 1,
  "quantity": 3
}

const responseSale = {
  "id": 1,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 3
    }
  ]
}

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

const saleUpdated = {
  "saleId": 1,
  "itemUpdated": [
    {
      "productId": 1,
      "quantity": 6
    }
  ]
}

const productObjectAdd = { "name": "produto", "quantity": 10 }

const productResponseAddTrue = [{ "id": 1, "name": "produto", "quantity": 10 }]

const saleObjectAdd = { "name": "produto", "quantity": 10 }

const saleProductsResponseAddTrue =  [{ "id": 1, "name": "produto", "quantity": 10 }]

const saleResponseAddTrue = [{ "id": 1, "date": "2022-05-27T16:01:51.000Z" }]

module.exports = {
  productsAll,
  productId,
  salesAll,
  saleId,
  productObjectAdd,
  productResponseAddTrue,
  saleObjectAdd,
  saleResponseAddTrue,
  saleProductsResponseAddTrue,
  newProduct,
  product,
  existingProduct,
  newSale,
  responseSale,
  saleUpdated,
  allSales,
}