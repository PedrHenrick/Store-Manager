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

const productObjectAdd = { "name": "produto", "quantity": 10 }

const productResponseAddTrue = [{ "id": 1, "name": "produto", "quantity": 10 }]

module.exports = {
  productsAll,
  productId,
  productObjectAdd,
  productResponseAddTrue,
  newProduct,
  product,
  existingProduct,
}