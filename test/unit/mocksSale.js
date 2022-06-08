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
];

const salesProductsAll = [
  {
      "saleId": 1,
      "productId": 1,
      "quantity": 5
  },
  {
      "saleId": 1,
      "productId": 2,
      "quantity": 10
  },
  {
      "saleId": 2,
      "productId": 3,
      "quantity": 15
  }
];

const allSales = [
  { "id": 1, "date": "2022-05-31T03:55:07.000Z" },
  { "id": 2, "date": "2022-05-31T03:55:07.000Z" }
];

const newSale = {
  "productId": 1,
  "quantity": 3
};

const responseSale = {
  "id": 1,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 3
    }
  ]
};

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
];

const saleUpdated = {
  "saleId": 1,
  "itemUpdated": [
    {
      "productId": 1,
      "quantity": 6
    }
  ]
};

const saleObjectAdd = { "name": "produto", "quantity": 10 };

const saleProductsResponseAddTrue =  [{ "id": 1, "name": "produto", "quantity": 10 }];

const saleResponseAddTrue = [{ "id": 1, "date": "2022-05-27T16:01:51.000Z" }];

module.exports = {
  salesAll,
  saleId,
  saleObjectAdd,
  saleResponseAddTrue,
  saleProductsResponseAddTrue,
  newSale,
  responseSale,
  saleUpdated,
  allSales,
  salesProductsAll,
};
