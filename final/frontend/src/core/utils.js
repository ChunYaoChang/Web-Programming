// reference: https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
export const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
