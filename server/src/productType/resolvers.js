export default {
  Query: {
    productType: (root, { nr }, { repository }) => {
      return repository.productType.get(nr);
    },
    productTypes: (root, _, { repository }) => {
      return repository.productType.all();
    }
  },
  ProductType: {
    parent: ({ parentId }, _, { repository }) => {
      return repository.productType.get(parentId);
    },
    products: ({ nr }, _, { repository }) => {
      return repository.product.findBy({ productType: nr });
    }
  }
};
