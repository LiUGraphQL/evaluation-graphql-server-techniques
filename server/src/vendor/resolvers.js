export default {
  Query: {
    vendor: (root, { nr }, { repository }) => {
      return repository.vendor.get(nr);
    },
    vendors: (root, _, { repository }) => {
      return repository.vendor.all();
    }
  },
  Vendor: {
    offers: ({ nr }, { limit, offset }, { repository }) => {
      return repository.offer.findBy({ nr, limit, offset });
    },
    offersConnection: ({ nr: productNr }) => {
      return productNr;
    }
  }
};
