export default {
  Query: {
    producer: (root, { nr }, { repository }) => {
      return repository.producer.get(nr);
    },
    producers: (root, args, { repository }) => {
      return repository.producer.all();
    }
  },
  Producer: {
    products: ({ nr }, _, { repository }) => {
      return repository.product.findBy({ producerNr: nr });
    }
  }
};
