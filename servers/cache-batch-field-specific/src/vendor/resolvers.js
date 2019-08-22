export default {
  Query: {
    vendor: (root, { nr }, { repository }) => {
      return repository.vendor.get(parseInt(nr));
    },
    vendors: (root, _, { repository }) => {
      return repository.vendor.all();
    }
  },
  Vendor: {
    offers: ({ nr }, { limit, offset }, { repository }) => {
      return repository.offer.findByVendor({ nr, limit, offset });
    },
    offersConnection: ({ nr: vendorNr }) => {
      return vendorNr;
    }
  }
};
