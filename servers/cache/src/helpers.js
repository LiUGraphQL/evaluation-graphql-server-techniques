import db from "./database";

export const getGeneric = async (nr, model, databaseTable) => {
  return db
    .select()
    .from(databaseTable)
    .where("nr", nr)
    .first()
    .then(response => new model(response));
};

export const allGeneric = async (model, databaseTable) => {
  return db
    .select()
    .from(databaseTable)
    .then(response => response.map(raw => new model(raw)));
};

export const simpleSortRows = (rows, nrs, model) => {
  return nrs.map(nr => {
    return new model(rows.find(row => row.nr == nr));
  });
};

export const memoize = func => {
  const cache = {};
  return function() {
    const key = JSON.stringify(arguments);
    if (cache[key]) {
      return cache[key];
    } else {
      const val = func.apply(this, arguments);
      cache[key] = val;
      return val;
    }
  };
};
