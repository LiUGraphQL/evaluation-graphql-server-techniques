export default {
  Query: {
    producer: (root, { nr }) => ({ nr: parseInt(nr) }),
    producers: (root, args, { repository }) => {
      return repository.producer.all();
    }
  },
  Producer: {
    nr: ({ nr }) => nr,
    label: async ({ nr }, _, { repository }) => {
      const { label } = await repository.producer.get(nr);
      return label;
    },
    comment: async ({ nr }, _, { repository }) => {
      const { comment } = await repository.producer.get(nr);
      return comment;
    },
    homepage: async ({ nr }, _, { repository }) => {
      const { homepage } = await repository.producer.get(nr);
      return homepage;
    },
    country: async ({ nr }, _, { repository }) => {
      const { country } = await repository.producer.get(nr);
      return country;
    },
    products: ({ nr }, _, { repository }) => {
      return repository.product.findBy({ producerNr: nr });
    }
  }
};
