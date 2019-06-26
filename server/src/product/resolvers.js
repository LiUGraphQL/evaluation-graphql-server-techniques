export default {
  Query: {
    product: (root, { nr }, { repository }) => {
      return repository.product.get(nr);
    },
    products: (root, args, { repository }) => {
      return repository.product.all();
    }
  },
  Product: {
    producer: ({ producer }, args, { repository }) => {
      return repository.producer.get(producer);
    },
    type: ({ nr }, _, { repository }) => {
      return repository.productType.findBy({ product: nr });
    },
    features: ({ nr }, _, { repository }) => {
      return repository.productFeature.findBy({ product: nr });
    },
    reviews: ({ nr }, { order }, { repository }) => {
      // using || {} because order might be undefined which otherwise will throw an error.
      const { field, direction } = order || {};
      return repository.review.sortBy({
        productId: nr,
        field,
        direction
      });
    },
    offers: ({ nr }, { where }, { repository }) => {
      return repository.offer.productOffers({ where, productNr: nr });
    }
  }
};
