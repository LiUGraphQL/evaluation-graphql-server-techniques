export default {
  Query: {
    review: (root, { nr }, { repository }, info) => {
      return repository.review.get(nr);
    },
    reviews: (root, args, { repository }) => {
      return repository.review.all();
    }
  },
  Review: {
    reviewer: ({ reviewerId }, _, { repository }) => {
      return repository.person.get(reviewerId);
    },
    reviewFor: ({ productId }, _, { repository }) => {
      return repository.product.get(productId);
    }
  }
};
