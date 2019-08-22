export default {
  Query: {
    productType: (root, { nr }) => ({ nr: parseInt(nr) }),
    productTypes: (root, _, { repository }) => {
      return repository.productType.all();
    }
  },
  ProductType: {
    nr: ({ nr }) => nr,
    label: async ({ nr }, _, { repository }) => {
      const { label } = await repository.productType.get(nr);
      return label;
    },
    comment: async ({ nr }, _, { repository }) => {
      const { comment } = await repository.productType.get(nr);
      return comment;
    },
    parent: async ({ nr }, _, { repository }) => {
      const { parent } = await repository.productType.get(nr);
      return { nr: parent };
    },
    products: async ({ nr }, _, { repository }) => {
      const products = await repository.product.findBy({ productType: nr });
      return products.map(({ nr }) => ({ nr }));
    }
  }
};
