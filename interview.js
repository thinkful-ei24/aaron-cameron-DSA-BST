/* Given a sorted array, write an algorithm that creates a Binary Search Tree from the elements of the sorted array in O(n) runtime. The resulting tree will be height balanced. */

let sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Have to start from the middle of the array, so either side will be balanced

// i'm assuming that i have an insert function and an existing BST

// This identifies the index of the middle
function sortedArrayFunction(arr) {
  if (arr && arr.length > 1) {

    let firstItem = Math.floor(arr.length / 2);

    // This inserts the middle item, and then removes it from the array

    // BST.insert(firstItem)
    let removeItem = arr[firstItem];
    let newOne = arr.filter(item => item !== removeItem);
    let newArr = newOne.slice(0, firstItem);
    let newArr2 = newOne.slice(firstItem, newOne.length);
    console.log(newArr, newArr2);
    sortedArrayFunction(newArr);
    sortedArrayFunction(newArr2);
  }
  else if (arr.length === 1) {
    //   BST.insert(arr[0]);
      return;
  }
  return;
}

sortedArrayFunction(sortedArray);