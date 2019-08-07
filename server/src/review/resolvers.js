export default {
  Query: {
    review: (root, { nr }) => ({ nr }),
    reviews: (root, args, { repository }) => {
      return repository.review.all();
    },
    reviewSearch: (root, { field, criterion, pattern }, { repository }) => {
      return repository.review.search({ field, criterion, pattern });
    }
  },
  Review: {
    nr: ({ nr }) => nr,
    title: async ({ nr }, _, { repository }) => {
      const { title } = await repository.review.get(nr);
      return title;
    },
    text: async ({ nr }, _, { repository }) => {
      const { text } = await repository.review.get(nr);
      return text;
    },
    reviewDate: async ({ nr }, _, { repository }) => {
      const { reviewDate } = await repository.review.get(nr);
      return reviewDate;
    },
    rating1: async ({ nr }, _, { repository }) => {
      const { rating1 } = await repository.review.get(nr);
      return rating1;
    },
    rating2: async ({ nr }, _, { repository }) => {
      const { rating2 } = await repository.review.get(nr);
      return rating2;
    },
    rating3: async ({ nr }, _, { repository }) => {
      const { rating3 } = await repository.review.get(nr);
      return rating3;
    },
    rating4: async ({ nr }, _, { repository }) => {
      const { rating4 } = await repository.review.get(nr);
      return rating4;
    },
    publishDate: async ({ nr }, _, { repository }) => {
      const { publishDate } = await repository.review.get(nr);
      return publishDate;
    },
    reviewer: async ({ nr }, _, { repository }) => {
      const { reviewer } = await repository.review.get(nr);
      return repository.person.get(reviewer);
    },
    reviewFor: async ({ nr }, _, { repository }) => {
      const { product } = await repository.review.get(nr);
      return repository.product.get(product);
    }
  }
};
