const createNestedMenu = (arr = [], parent = null) => {
  const fix = [];

  arr.sort((a, b) => a.position - b.position);

  for (let i in arr) {
    if (arr[i].parent_id === parent) {
      let children = createNestedMenu(arr, arr[i].id);

      if (children.length) arr[i].children = children;

      fix.push(arr[i]);
    }
  }

  return fix;
};

const getParentId = (itemsArr, path) => {
  if (path.length === 1) return null;

  let workedArr = [...itemsArr];
  const workedPath = path.slice(0, path.length - 1);

  workedPath.forEach((el, i) => {
    if (i === workedPath.length - 1) {
      return (workedArr = workedArr[el]);
    }
    workedArr = workedArr[el].children;
  });

  return workedArr.id;
};

export { createNestedMenu, getParentId };
