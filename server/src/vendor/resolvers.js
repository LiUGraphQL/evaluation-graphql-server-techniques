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
    offersConnection: async ({ nr }, { first, after }, { repository }) => {
      return { nr, first, after };
    }
  },
  CollectionOfEdgesToOffers: {
    aggregate: ({ nr, first, after }, args) => {
      return { nr, first, after };
    }
  },
  AggregateOffers: {
    count: async ({ nr, first, after }, _, { repository }) => {
      return repository.offer.countBy({ nr, first, after });
    },
    sum: ({ nr, first, after }, _, { repository }) => {
      return repository.offer.sumBy({ nr, first, after });
    },
    max: ({ nr, first, after }, _, { repository }) => {
      return repository.offer.maxBy({ nr, first, after });
    },
    min: ({ nr, first, after }, _, { repository }) => {
      return repository.offer.minBy({ nr, first, after });
    }
  }
};
