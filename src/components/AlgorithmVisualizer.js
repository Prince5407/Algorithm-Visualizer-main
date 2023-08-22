import React, { useState } from "react";
import GenerateArrayButton from "./GenerateArrayButton";
import SortingAlgorithmSelector from "./SortingAlgorithmSelector";
import SortButton from "./SortButton";
import "./AlgorithmVisualizer.css";
import bubbleSort from "../sortingAlgorithms/bubbleSort";
import ResetButton from "./ResetButton";
import selectionSort from "../sortingAlgorithms/selectionSort";
import DisplayButtom from "./Display";
import mergeSort from "../sortingAlgorithms/mergeSort";
import quickSort from "../sortingAlgorithms/quickSort";

const AlgorithmVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sortingInProgress, setSortingInProgress] = useState(false);
  const [selectedAlgorithmIndex, setSelectedAlgorithmIndex] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false); 
  const [algorithmDescription, setAlgorithmDescription] = useState("");
  const [contentShow,setContentShow]=useState(false);

  const sortingAlgorithms = [
    {
      name: "Bubble Sort",
      sortFunction: bubbleSort,
      description:
        "Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.Time Complexity are as follow:\n" +
        "Worst-case time complexity: O(n^2) and"+"Best-case time complexity: O(n)" ,
        
    },
    {
      name: "Selection Sort",
      sortFunction: selectionSort,
      description:
        "Selection sort is an in-place comparison sorting algorithm that divides the input list into two parts:\n" +
        "the sorted sublist of items already processed, which is built up from left to right at the front (left) of the list," +
        "and the sublist of items remaining to be sorted."+
        "Time Complexity are as follows\n" +
        "Worst-case time complexity: O(n^2) and Best-case time complexity: O(n^2)\n"
       
    },
    {
      name: "Merge Sort",
      sortFunction: mergeSort,
      description:
      "Merge sort is a comparison-based sorting algorithm that follows the divide and conquer strategy\n" +
      "It divides the input array into two halves, recursively sorts them, and then merges the sorted halves " +
       "to produce a single sorted array .Merge sort is efficient and stable, with a predictable time complexity.\n" +
      "Time Complexity: Worst-case time complexity: O(n log n) ,Best-case time complexity: O(n log n) ,Average-case time complexity: O(n log n),Space Complexity: O(n)",
  },
  {
    name: "Quick Sort",
    sortFunction: quickSort,
    description:
      "Quick sort is a widely used comparison-based sorting algorithm that employs the divide and conquer strategy.\n"+
      " It selects a 'pivot' element, partitions the array into two subarrays - elements less than the pivot and elements greater than the pivot -.\n"+
      " and then recursively sorts the subarrays .Quick sort is efficient in practice and often outperforms other sorting algorithms.Time Complexity:\n" +
      "Worst-case time complexity: O(n^2) - when the pivot selection is unbalanced Average-case time complexity: O(n log n) - typically\n" +
      "Best-case time complexity: O(n log n) - when the pivot selection is balanced Space Complexity: O(log n) - for the recursive call stack\n",
  },
  ];
  
  
  


  const generateRandomArray = () => {
    const newArray = Array.from(
      { length: 100 },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
  };

  const handleAlgorithmChange = (event) => {
    const selectedAlgorithmIndex = parseInt(event.target.value);
    setSelectedAlgorithmIndex(selectedAlgorithmIndex);
    if (selectedAlgorithmIndex >= 0 && selectedAlgorithmIndex < sortingAlgorithms.length) {
      setAlgorithmDescription(sortingAlgorithms[selectedAlgorithmIndex].description || "");
    } else {
      setAlgorithmDescription(""); // Clear description if index is out of bounds or null
    }
    if(selectedAlgorithmIndex===null){
      setContentShow(false);

    }
    setContentShow(false);
  };

  const sort = async () => {
    if (selectedAlgorithmIndex !== null && !sortingInProgress) {
      setSortingInProgress(true);
      setIsCancelling(false); 
      await sortingAlgorithms[selectedAlgorithmIndex].sortFunction(array, setArray);
      handleSortingComplete();
    }
  };
  const display=async()=>{

    if(contentShow===false){
setContentShow(true);


    }
  
    

  };

  const reset = () => {
    if (sortingInProgress) {
      setIsCancelling(true); 
    } else {
      setArray([]);
      setSelectedAlgorithmIndex(null);
    }
  };

  const handleSortingComplete = () => {
    setSortingInProgress(false);
    setIsCancelling(false); 
  };

  return (
    <div className="main-container">
    <div className="container">
      <h1 className="header">Algorithm Visualizer</h1>
      <GenerateArrayButton
        onClick={generateRandomArray}
        disabled={sortingInProgress}
      />
      <div className="controls">
        <SortingAlgorithmSelector
          sortingAlgorithms={sortingAlgorithms}
          selectedAlgorithmIndex={selectedAlgorithmIndex}
          onChange={handleAlgorithmChange}
        />
        <SortButton
          className="sort-button"
          onClick={sort}
          disabled={sortingInProgress}
        >
          Sort
        </SortButton>
        <ResetButton
          className="reset-button"
          onClick={reset}
          disabled={sortingInProgress}
          isCancelling={isCancelling}
        />
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value * 3}px` }}
          ></div>
        ))}
      </div>

      <div className="bottom">
        <div className="desc">
          <DisplayButtom className="displayDesc" onClick={display}>
            Display Desc.
          </DisplayButtom>
          {contentShow ? (
    algorithmDescription !== "" ? (
      <div className="algorithm-description">
        {algorithmDescription.length > 25  ? (
          <>
            {algorithmDescription.split('\n').map((line, index) => (
              <p key={index} className={contentShow ? "typing-animation" : ""}>
                {line}
              </p>
            ))}
          </>
        ) : (
          <p className={contentShow ? "typing-animation" : ""}>
            {algorithmDescription}
          </p>
        )}
      </div>
    ) : (
      <p>Select Any Algorithm</p>
    )
  ) : (
    <p>Select Any Algorithm</p>
  )}

        </div>
      </div>
    </div>
    </div>
  );
};

export default AlgorithmVisualizer;
