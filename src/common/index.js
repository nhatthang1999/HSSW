export const checkObjectSearch = (object) => {
  for (var key in object) {
    if (object[key] !== null && object[key] !== "") return false;
  }
  return true;
};
