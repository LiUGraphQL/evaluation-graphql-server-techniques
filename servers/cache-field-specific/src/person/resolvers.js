export default {
  Query: {
    person: (root, { nr }) => ({ nr: parseInt(nr) }),
    persons: (root, args, { repository }) => {
      return repository.person.all();
    }
  },
  Person: {
    nr: ({ nr }) => nr,
    name: async ({ nr }, _, { repository }) => {
      const { name } = await repository.person.get(nr);
      return name;
    },
    mbox_sha1sum: async ({ nr }, _, { repository }) => {
      const { mbox_sha1sum } = await repository.person.get(nr);
      return mbox_sha1sum;
    },
    country: async ({ nr }, _, { repository }) => {
      const { country } = await repository.person.get(nr);
      return country;
    }
  }
};
