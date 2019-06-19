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
  }
};
