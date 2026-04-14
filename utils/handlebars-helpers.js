const handlebarsHelpers = {
  findPrice: (entries, selectedItem) => {
    const found = entries.find((el) => el[0] === selectedItem);

    if (!found) {
      throw new Error(`Cannot find price of "${selectedItem}".`);
    }

    const [, price] = found;
    return price;
  },

  pricify: (price) => price.toFixed(2),

  isNotInArray: (arr, el) => !arr.includes(el),
  isInArray: (arr, el) => arr.includes(el),

};

module.exports = {
  handlebarsHelpers,
};
