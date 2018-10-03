const utils = {};

utils.isNullOrUndefined = (arg) => {
  return arg === null || arg === undefined || arg === '';
};

utils.isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

utils.scrollTo = (element, to, duration) => {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function () {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
};

utils.groupBy = (xs, key) => {
  return xs.reduce(function (rv, x) {
    let v = key instanceof Function ? key(x) : x[key];
    let el = rv.find((r) => r && r.key === v); 
    if (el) { el.values.push(x); } else { rv.push({ key: v, values: [x] }); } return rv;
  }, []);
};

utils.GetComposedPath = (element) => {
  if (element === null) {
    return [];
  }

  const pathArr = [element];

  while (element.parentElement !== null) {
    element = element.parentElement;
    pathArr.unshift(element);
  }

  return pathArr;
};

/**
 * Used to completely stop event propagation
 * @param event
 */
utils.stopEvent = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};
