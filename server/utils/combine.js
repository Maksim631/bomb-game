export const combine = (arr1, arr2) => {
  const maxLength = Math.max(arr1.length, arr2.length);
  return Array.from({ length: maxLength }).reduce((acc, _, index) => {
    if (arr1[index] !== undefined) acc.push(arr1[index]);
    if (arr2[index] !== undefined) acc.push(arr2[index]);
    return acc;
  }, []);
};
