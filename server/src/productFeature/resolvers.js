export default {
  Query: {
    productFeature: (root, { nr }, { repository }) => {
      return repository.productFeature.get(nr);
    },
    productFeatures: (root, _, { repository }) => {
      return repository.productFeature.all();
    }
  },
  ProductFeature: {
    products: ({ nr }, _, { repository }) => {
      return repository.product.findBy({ productFeature: nr });
    }
  }
};
