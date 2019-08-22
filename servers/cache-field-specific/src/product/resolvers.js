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
      return repository.producer.get(producer);
    },
    type: ({ nr }, _, { repository }) => {
      return repository.productType.byProductNr({ nr });
    },
    features: ({ nr }, _, { repository }) => {
      return repository.productFeature.byProductNr({ nr });
    },
    publishDate: async ({ nr }, _, { repository }) => {
      const { publishDate } = await repository.product.get(nr);
      return publishDate;
    },
    reviews: ({ nr }, { order }, { repository }) => {
      // using || {} because order might be undefined which otherwise will throw an error.
      const { field, direction } = order || {};
      return repository.review.sortBy({
        product: nr,
        field,
        direction
      });
    },
    offers: ({ nr }, { where }, { repository }) => {
      return repository.offer.productOffers(
        { where, productNr: nr },
        repository
      );
    }
  }
};
