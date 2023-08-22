const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const merge = async (array, left, middle, right, setArray) => {
  const n1 = middle - left + 1;
  const n2 = right - middle;

  const leftArray = new Array(n1);
  const rightArray = new Array(n2);

  for (let i = 0; i < n1; i++) {
    leftArray[i] = array[left + i];
  }
  for (let j = 0; j < n2; j++) {
    rightArray[j] = array[middle + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = left;

  while (i < n1 && j < n2) {
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      i++;
    } else {
      array[k] = rightArray[j];
      j++;
    }
    k++;
    setArray([...array]);
    await sleep(1);
  }

  while (i < n1) {
    array[k] = leftArray[i];
    i++;
    k++;
    setArray([...array]);
    await sleep(1);
  }

  while (j < n2) {
    array[k] = rightArray[j];
    j++;
    k++;
    setArray([...array]);
    await sleep(1);
  }
};

const mergeSortHelper = async (array, left, right, setArray) => {
  if (left < right) {
    const middle = Math.floor((left + right) / 2);

    await mergeSortHelper(array, left, middle, setArray);
    await mergeSortHelper(array, middle + 1, right, setArray);

    await merge(array, left, middle, right, setArray);
  }
};

const mergeSort = async (array, setArray) => {
  const sortedArray = [...array];
  const n = sortedArray.length;
  await mergeSortHelper(sortedArray, 0, n - 1, setArray);
};

export default mergeSort;
