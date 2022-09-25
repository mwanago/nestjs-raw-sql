function getDifferenceBetweenArrays<ListType extends unknown>(
  firstArray: ListType[],
  secondArray: unknown[],
): ListType[] {
  return firstArray.filter((arrayElement) => {
    return !secondArray.includes(arrayElement);
  });
}

export default getDifferenceBetweenArrays;
