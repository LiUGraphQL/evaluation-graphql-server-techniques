export default {
  Query: {
    vendor: (root, { nr }) => ({ nr: parseInt(nr) }),
    vendors: (root, _, { repository }) => {
      return repository.vendor.all();
    }
  },
  Vendor: {
    nr: ({ nr }) => nr,
    label: async ({ nr }, _, { repository }) => {
      const { label } = await repository.vendor.get(nr);
      return label;
    },
    comment: async ({ nr }, _, { repository }) => {
      const { comment } = await repository.vendor.get(nr);
      return comment;
    },
    homepage: async ({ nr }, _, { repository }) => {
      const { homepage } = await repository.vendor.get(nr);
      return homepage;
    },
    country: async ({ nr }, _, { repository }) => {
      const { country } = await repository.vendor.get(nr);
      return country;
    },
    publisher: async ({ nr }, _, { repository }) => {
      const { publisher } = await repository.vendor.get(nr);
      return publisher;
    },
    publishDate: async ({ nr }, _, { repository }) => {
      const { publishDate } = await repository.vendor.get(nr);
      return publishDate;
    },
    offers: async ({ nr }, { limit, offset }, { repository }) => {
      const offers = await repository.offer.findByVendor({ nr, limit, offset });
      return offers.map(({ nr }) => ({ nr }));
    },
    offersConnection: ({ nr }) => ({ nr })
  }
};
