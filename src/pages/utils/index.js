function flatten(array) {
  let arr = [];
  array.forEach((item) => {
    if (Array.isArray(item)) {
      arr = arr.concat(flatten(item));
    } else {
      arr.push(item);
    }
  });
  return arr;
}

export { flatten };
