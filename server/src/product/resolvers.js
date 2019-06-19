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
    producer: ({ producer }, _, { repository }) => {
      return repository.producer.get(producer);
    },
    productType: ({ nr }, _, { repository }) => {
      return repository.productType.findBy({ product: nr });
    },
    productFeature: ({ nr }, _, { repository }) => {
      return repository.productFeature.findBy({ product: nr });
    },
    reviews: ({ nr }, { order: { field, direction } }, { repository }) => {
      return repository.review.sortBy({ productId: nr, field, direction });
    },
    offers: ({ nr }, { where }, { repository }) => {
      return repository.offer.where(where);
    }
  }
};
