export default {
  Query: {
    product: (root, { nr }) => ({ nr: parseInt(nr) }),
    products: (root, args, { repository }) => {
      return repository.product.all();
    }
  },
  Product: {
    nr: ({ nr }) => nr,
    label: async ({ nr }, _, { repository }) => {
      const { label } = await repository.product.get(nr);
      return label;
    },
    comment: async ({ nr }, _, { repository }) => {
      const { comment } = await repository.product.get(nr);
      return comment;
    },
    producer: async ({ nr }, _, { repository }) => {
      const { producer } = await repository.product.get(nr);
      return { nr: producer };
    },
    type: async ({ nr }, _, { repository }) => {
      const productType = await repository.productType.findBy({ product: nr });
      return { nr: productType.nr };
    },
    features: async ({ nr }, _, { repository }) => {
      const productFeatures = await repository.productFeature.findBy({
        product: nr
      });
      return productFeatures.map(({ nr }) => ({ nr }));
    },
    reviews: async ({ nr }, { order }, { repository }) => {
      const { field, direction } = order || {};
      const reviews = await repository.review.sortBy({
        productId: nr,
        field,
        direction
      });
      return reviews.map(({ nr }) => ({ nr }));
    },
    offers: async ({ nr }, { where }, { repository }) => {
      const offers = await repository.offer.productOffers(
        { where, productNr: nr },
        repository
      );
      return offers.map(({ nr }) => ({ nr }));
    }
  }
};
