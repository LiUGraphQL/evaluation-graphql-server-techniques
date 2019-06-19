export default {
  Query: {
    person: (root, { nr }, { repository }) => {
      return repository.person.get(nr);
    },
    persons: (root, args, { repository }) => {
      return repository.person.all();
    }
  }
};
