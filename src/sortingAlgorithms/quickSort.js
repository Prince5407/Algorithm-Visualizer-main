const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const partition = async (array, low, high, setArray) => {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (array[j] < pivot) {
      i++;
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      setArray([...array]);
      await sleep(1);
    }
  }

  const temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;
  setArray([...array]);
  await sleep(1);

  return i + 1;
};

const quickSortHelper = async (array, low, high, setArray) => {
  if (low < high) {
    const pi = await partition(array, low, high, setArray);
    await quickSortHelper(array, low, pi - 1, setArray);
    await quickSortHelper(array, pi + 1, high, setArray);
  }
};

const quickSort = async (array, setArray) => {
  const sortedArray = [...array];
  await quickSortHelper(sortedArray, 0, sortedArray.length - 1, setArray);
};

export default quickSort;
