export default {
  Query: {
    person: (root, { nr }, { repository }) => {
      return repository.person.get(parseInt(nr));
    },
    persons: (root, args, { repository }) => {
      return repository.person.all();
    }
  },
  Person: {
    country: ({ country }) => country
  }
};
