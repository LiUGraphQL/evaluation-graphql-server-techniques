export default {
  Query: {
    productFeature: (root, { nr }) => ({ nr: parseInt(nr) }),
    productFeatures: (root, _, { repository }) => {
      return repository.productFeature.all();
    }
  },
  ProductFeature: {
    nr: ({ nr }) => nr,
    label: async ({ nr }, _, { repository }) => {
      const { label } = await repository.productFeature.get(nr);
      return label;
    },
    comment: async ({ nr }, _, { repository }) => {
      const { comment } = await repository.productFeature.get(nr);
      return comment;
    },
    products: async ({ nr }, _, { repository }) => {
      const products = repository.product.findBy({ productFeature: nr });
      return products.map(({ nr }) => ({ nr }));
    }
  }
};
