export default {
  Query: {
    offer: (root, { nr }, { repository }) => {
      return repository.offer.get(parseInt(nr));
    },
    offers: async (root, { where, limit, order }, { repository }) => {
      return repository.offer.offers({ where, limit, order }, repository);
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
    aggregate: (vendorNr, _, { repository }) => {
      return repository.offer.findByVendor({ nr: vendorNr });
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
