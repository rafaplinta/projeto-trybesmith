const newProductBody = {
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
  orderId: 4
};

const newProductFromDB = {
  id: 6,
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
  orderId: 4
};

const noNameProductBody = {
  name: '',
  price: '30 peças de ouro',
  orderId: 4
};

const noPriceProductBody = {
  name: 'Martelo de Thor',
  price: '',
  orderId: 4
};

const noOrderIdProductBody = {
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
  orderId: null
};

const findAllReturn = [
  {
    id: 1,
    name: 'Pedra Filosofal',
    price: '20 gold',
    orderId: 1
  },
  {
    id: 2,
    name: 'Lança do Destino',
    price: '100 diamond',
    orderId: 2
  }
]

export default {
  noNameProductBody,
  noPriceProductBody,
  noOrderIdProductBody,
  newProductBody,
  newProductFromDB,
  findAllReturn,
};