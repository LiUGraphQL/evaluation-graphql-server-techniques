export default {
  Query: {
    offer: (root, { nr }) => ({ nr }),
    offers: async (root, { where, limit, order }, { repository }) => {
      return repository.offer.offers({ where, limit, order }, repository);
    }
  },
  Offer: {
    nr: async ({ nr }) => nr,
    price: async ({ nr }, _, { repository }) => {
      const { price } = await repository.offer.get(nr);
      return price;
    },
    validFrom: async ({ nr }, _, { repository }) => {
      const { validFrom } = await repository.offer.get(nr);
      return validFrom;
    },
    validTo: async ({ nr }, _, { repository }) => {
      const { validTo } = await repository.offer.get(nr);
      return validTo;
    },
    deliveryDays: async ({ nr }, _, { repository }) => {
      const { deliveryDays } = await repository.offer.get(nr);
      return deliveryDays;
    },
    offerWebpage: async ({ nr }, _, { repository }) => {
      const { offerWebpage } = await repository.offer.get(nr);
      return offerWebpage;
    },
    publisher: async ({ nr }, _, { repository }) => {
      const { publisher } = await repository.offer.get(nr);
      return publisher;
    },
    publishDate: async ({ nr }, _, { repository }) => {
      const { publishDate } = await repository.offer.get(nr);
      return publishDate;
    },
    product: async ({ nr }, _, { repository }) => {
      const { productId } = await repository.offer.get(nr);
      return repository.product.get(productId);
    },
    vendor: async ({ nr }, _, { repository }) => {
      const { vendorId } = await repository.offer.get(nr);
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
