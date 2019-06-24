export default {
  Query: {
    offer: (root, { nr }, { repository }) => {
      return repository.offer.get(nr);
    },
    offers: (root, args, { repository }) => {
      return repository.offer.all();
    }
  },
  Offer: {
    product: ({ productId }, _, { repository }) => {
      return repository.product.get(productId);
    },
    vendor: ({ vendorId }, _, { repository }) => {
      return repository.vendor.get(vendorId);
    }
  },
  CollectionOfEdgesToOffers: {
    aggregate: (productNr, _, { repository }) => {
      return repository.offer.findBy({ nr: productNr });
    }
  },
  AggregateOffers: {
    count: offers => offers.length,
    price: offers => offers
  },
  PriceAggregationOfOffers: {
    avg: offers => {
      const prices = getPricesFromOffers(offers);
      const sum = sumPrices(prices);
      return sum / offers.length;
    },
    sum: offers => {
      const prices = getPricesFromOffers(offers);
      return sumPrices(prices);
    },
    max: offers => {
      const prices = getPricesFromOffers(offers);
      return Math.max(...prices);
    },
    min: offers => {
      const prices = getPricesFromOffers(offers);
      return Math.min(...prices);
    }
  }
};

const getPricesFromOffers = offers => offers.map(offer => offer.price);
const sumPrices = prices => prices.reduce((curr, accu) => curr + accu, 0);
