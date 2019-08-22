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
    aggregate: ({ nr }, _, { repository }) => {
      return repository.offer.findByVendor({ nr });
    }
  },
  AggregateOffers: {
    count: offerNrs => offerNrs.length,
    price: (offerNrs, _, { repository }) => {
      return repository.offer.pricesByNrs(offerNrs.map(offer => offer.nr));
    }
  },
  PriceAggregationOfOffers: {
    avg: prices => {
      const sum = sumPrices(prices);
      return sum / prices.length;
    },
    sum: prices => {
      return sumPrices(prices);
    },
    max: prices => {
      return Math.max(...prices);
    },
    min: prices => {
      return Math.min(...prices);
    }
  }
};

const sumPrices = prices => prices.reduce((curr, accu) => curr + accu, 0);
