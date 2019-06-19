export default {
  Query: {
    vendor: (root, { nr }, { repository }) => {
      return repository.vendor.get(nr);
    },
    vendors: (root, args, { repository }) => {
      return repository.vendor.all();
    }
  },
  Vendor: {
    offers: ({ nr }, { limit, offset }, { repository }) => {
      return repository.offer.findBy({ nr, limit, offset });
    },
    offersConnection: ({ nr }, _, { repository }) => {
      return { nr };
    }
  },
  CollectionOfEdgesToOffers: {
    aggregate: async ({ nr }, _, { repository }) => {
      return { offers: await repository.offer.findBy({ nr }) };
    }
  },
  AggregateOffers: {
    count: ({ offers }, _, { repository }) => {
      return offers.length;
    },
    price: parent => parent
  },
  PriceAggregationOfOffers: {
    avg: ({ offers }) => {
      const prices = getPricesFromOffers(offers);
      const sum = sumPrices(prices);
      return sum / offers.length;
    },
    sum: ({ offers }) => {
      const prices = getPricesFromOffers(offers);
      return sumPrices(prices);
    },
    max: ({ offers }) => {
      const prices = getPricesFromOffers(offers);
      return Math.max(...prices);
    },
    min: ({ offers }) => {
      const prices = getPricesFromOffers(offers);
      return Math.min(...prices);
    }
  }
};

const getPricesFromOffers = offers => offers.map(offer => offer.price);
const sumPrices = prices => prices.reduce((curr, accu) => curr + accu, 0);
