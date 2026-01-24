export const dataStructures = [
  {
    "id": ":r0:01",
    "topic": "dsa",
    "question": "Selection Sort",
    "answer": "\n\n Code:\n\n ```Selection Sort\n// Time Complexity:\n//   Best, Average, Worst: O(n²)\n// Explanation: Always scans the unsorted part of the array to find the minimum and swaps it into place.\nfunction selectionSort(arr) {\n  let n = arr.length;\n  for (let i = 0; i < n - 1; i++) {            // Outer loop runs n-1 times\n    let min = i;\n    for (let j = i + 1; j < n; j++) {            // Inner loop scans the unsorted portion\n      if (arr[j] < arr[min]) {\n        min = j;\n      }\n    }\n    [arr[i], arr[min]] = [arr[min], arr[i]];     // Swap the found minimum element with arr[i]\n  }\n  return arr;\n}```\n\n\n Additional Explanation:\n- How It Works:  \n  The algorithm divides the array into a sorted and unsorted region. For each position, it finds the smallest element in the unsorted region and swaps it into position.\n- When to Use:  \n  Simple to implement, but inefficient for large arrays due to quadratic time complexity.",
    "tags": [
      "sorting"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": ":r0:11",
    "topic": "dsa",
    "question": "Bubble Sort",
    "answer": "\n\n Code:\n\n```Bubble Sort\n// Time Complexity:\n//   Best: O(n) [if optimized with an early exit],\n//   Average & Worst: O(n²)\n// Explanation: Repeatedly swaps adjacent elements if they are in the wrong order, \"bubbling\" the highest value to the end.\nfunction bubbleSort(arr) {\r\n  //*it is a poor sorting algo , not recommended use apart from interview practice.\r\n  let N = arr.length;\r\n  for (var i = 0; i < N; i++) {\r\n    for (j = 0; j < N - i - 1; j++) {\r\n      if (arr[j] > arr[j + 1]) {\r\n        swap(j, j + 1, arr);\r\n      }\r\n    }\r\n  }\r\n  return arr;\r\n}\r\nfunction swap(x, y, arr) {\r\n  temp = arr[x];\r\n  arr[x] = arr[y];\r\n  arr[y] = temp;\r\n}\r\n\r\nconsole.log(bubbleSort([-6, 20, 8, -2, 4]));```\n\n\n Additional Explanation:\n- How It Works:  \n  During each pass through the array, adjacent elements are compared and swapped if necessary. This causes larger elements to \"bubble\" to the end.\n- When to Use:  \n  Mostly useful in teaching and understanding basic sorting. Its simplicity is overshadowed by poor performance on large datasets.",
    "tags": [
      "sorting"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": ":r0:21",
    "topic": "dsa",
    "question": "Insertion Sort",
    "answer": "\n Code:\n\n ```Insertion Sort\n// Time Complexity:\n//   Best: O(n) [if the array is already (or nearly) sorted],\n//   Average & Worst: O(n²)\n// Explanation: Iterates through the array and inserts each element into its proper position in the already sorted portion.\nfunction insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    let current = arr[i];\n    let j = i - 1;\n    // Move elements of arr[0..i-1] that are greater than current to one position ahead\n    while (j >= 0 && arr[j] > current) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = current; // Insert the element at its right position\n  }\n  return arr;\n}```\n\n\n Additional Explanation:\n- How It Works:  \n  The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.\n- When to Use:  \n  Particularly efficient for small or mostly sorted data sets due to its best-case linear time performance.",
    "tags": [
      "sorting"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": ":r0:31",
    "topic": "dsa",
    "question": "Merge Sort",
    "answer": "\n Code:\n\n ```Merge Sort\n// Time Complexity: O(n log n) in Best, Average, and Worst cases\n// Space Complexity: O(n)\n// Explanation: Divides the array into halves, recursively sorts each half, and merges them back together in sorted order.\nfunction mergeSort(arr) {\n  if (arr.length <= 1) return arr; // Base case: arrays with 0 or 1 element are already sorted\n  \n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));   // Sort left half\n  const right = mergeSort(arr.slice(mid));       // Sort right half\n  \n  return merge(left, right);                     // Merge the sorted halves\n}\n\nfunction merge(left, right) {\n  const sorted = [];\n  // Merge left and right arrays by comparing the first elements of each\n  while (left.length && right.length) {\n    sorted.push(left[0] < right[0] ? left.shift() : right.shift());\n  }\n  // Append remaining elements (one of these will be empty)\n  return [...sorted, ...left, ...right];\n}```\n\n\n Additional Explanation:\n- How It Works:  \n  The array is split repeatedly into halves until there are single-element arrays, then merged in a sorted manner.\n- When to Use:  \n  Consistently performs well and is stable; however, it requires extra space.",
    "tags": [
      "sorting"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": ":r0:41",
    "topic": "dsa",
    "question": "Quick Sort",
    "answer": "\n\n Code:\n\n ```Quick Sort\n// Time Complexity:\n//   Best & Average: O(n log n),\n//   Worst: O(n²) when the pivot selection is poor (e.g., always picking the largest or smallest element)\n// Explanation: Selects a pivot element and partitions the array such that elements less than the pivot are on its left\n// and greater than the pivot on its right, then recursively sorts the partitions.\nfunction quickSort(arr) {\n  if (arr.length <= 1) return arr;\n\n  const pivot = arr[arr.length - 1];   // Typically, the last element is chosen as pivot\n  const left = [], right = [];\n  \n  for (let i = 0; i < arr.length - 1; i++) {\n    // Partition array into values less than pivot and values greater or equal\n    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);\n  }\n  \n  return [...quickSort(left), pivot, ...quickSort(right)];\n}```\n\n\n Additional Explanation:\n- How It Works:  \n  The algorithm divides the array around a pivot. Recursive calls on the partitions allow Quick Sort to run very efficiently on average.\n- When to Use:  \n  Often the fastest in practice for large, random arrays, though care is needed with pivot selection to avoid the worst-case scenario.",
    "tags": [
      "sorting"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": ":r0:51",
    "topic": "dsa",
    "question": "Heap Sort",
    "answer": "\n Code:\n\n```Heap Sort\n// Time Complexity: O(n log n) for Best, Average, and Worst cases\n// Space Complexity: O(1) additional space\n// Explanation: Converts the array into a max-heap, then repeatedly extracts the maximum element and rebuilds the heap.\nfunction heapSort(arr) {\n  let n = arr.length;\n\n  // Heapify function to maintain the max-heap property\n  const heapify = (i, size) => {\n    let largest = i;\n    let left = 2  i + 1;\n    let right = 2  i + 2;\n\n    if (left < size && arr[left] > arr[largest]) largest = left;\n    if (right < size && arr[right] > arr[largest]) largest = right;\n\n    // If root is not largest, swap with largest and continue heapifying\n    if (largest !== i) {\n      [arr[i], arr[largest]] = [arr[largest], arr[i]];\n      heapify(largest, size);\n    }\n  };\n\n  // Build a max-heap\n  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {\n    heapify(i, n);\n  }\n\n  // Extract elements from the heap one by one\n  for (let i = n - 1; i > 0; i--) {\n    [arr[0], arr[i]] = [arr[i], arr[0]]; // Move current root to end\n    heapify(0, i);                      // Heapify the reduced heap\n  }\n  return arr;\n}```\n\n\n Additional Explanation:\n- How It Works:  \n  Heap Sort first rearranges the array into a max-heap where the largest element is at the root. Then it repeatedly swaps the root with the last element and rebuilds the heap.\n- When to Use:  \n  Useful when memory is limited because it sorts in place, though it is not a stable sort.",
    "tags": [
      "sorting"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": ":r0:61",
    "topic": "dsa",
    "question": "Cycle Sort",
    "answer": "\n\n Code:\n\n```Cycle Sort\n// Time Complexity:\n//   Best, Average, Worst: O(n²)\n// Explanation: Minimizes the number of writes to the array by rotating elements directly to their final positions.\n// It's especially useful when memory writes are expensive.\nfunction cycleSort(arr) {\n  let writes = 0;\n  \n  for (let cycleStart = 0; cycleStart < arr.length - 1; cycleStart++) {\n    let item = arr[cycleStart];\n    let pos = cycleStart;\n    \n    // Count the number of elements that are smaller than the current element\n    for (let i = cycleStart + 1; i < arr.length; i++) {\n      if (arr[i] < item) pos++;\n    }\n    \n    // If item is already in the correct position, continue\n    if (pos === cycleStart) continue;\n    \n    // Avoid duplicate placements\n    while (item === arr[pos]) {\n      pos++;\n    }\n    \n    // Put item to its correct position\n    [arr[pos], item] = [item, arr[pos]];\n    writes++;\n    \n    // Rotate the rest of the cycle\n    while (pos !== cycleStart) {\n      pos = cycleStart;\n      for (let i = cycleStart + 1; i < arr.length; i++) {\n        if (arr[i] < item) pos++;\n      }\n      \n      while (item === arr[pos]) {\n        pos++;\n      }\n      \n      [arr[pos], item] = [item, arr[pos]];\n      writes++;\n    }\n  }\n  return arr;\n}```\n\n\n Additional Explanation:\n- How It Works:  \n  This algorithm determines where each element should go and rotates the elements through cycles. It minimizes the number of write operations.\n- When to Use:  \n  Valuable in scenarios where writing to memory is costly (for example, on flash memory devices).",
    "tags": [
      "sorting"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": ":r0:71",
    "topic": "dsa",
    "question": "3-Way Merge Sort",
    "answer": "\n Code:\n\n```3-Way Merge Sort\n// Time Complexity: O(n log n) for Best, Average, and Worst cases\n// Space Complexity: O(n)\n// Explanation: Similar to merge sort, but splits the array into three parts and merges them, which can be advantageous when there are many duplicate keys.\nfunction threeWayMergeSort(arr) {\n  if (arr.length <= 1) return arr;\n\n  const third = Math.floor(arr.length / 3);\n  const mid1 = third;\n  const mid2 = 2  third;\n\n  const left = threeWayMergeSort(arr.slice(0, mid1));\n  const middle = threeWayMergeSort(arr.slice(mid1, mid2));\n  const right = threeWayMergeSort(arr.slice(mid2));\n\n  return mergeThree(left, middle, right);\n}\n\n// Using a helper that merges three sorted arrays\nfunction mergeThree(a, b, c) {\n  // First merge two arrays, then merge the result with the third array\n  return merge(merge(a, b), c);\n}\n\n// Reuse the merge function from Merge Sort:\nfunction merge(left, right) {\n  const sorted = [];\n  while (left.length && right.length) {\n    sorted.push(left[0] < right[0] ? left.shift() : right.shift());\n  }\n  return [...sorted, ...left, ...right];\n}```\n\n\n Additional Explanation:\n- How It Works:  \n  Instead of the traditional two-way splitting, this version splits the array into three segments, recursively sorts each segment, and then merges them.  \n- When to Use:  \n  Especially beneficial when the data contains many duplicate keys, potentially reducing the number of comparisons during merging.",
    "tags": [
      "sorting"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": ":r0:01sa",
    "topic": "dsa",
    "question": " Linear Search\n",
    "answer": "\n Code:\n\n```// Linear Search\n// Time Complexity:\n//   Best case: O(1) when the element is at the beginning\n//   Average & Worst case: O(n) when the element is in the middle or not present\n//\n// Explanation: \n// Iterate through each element in the array until the target is found.\n// This method does not require a sorted array.\nfunction linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) {\n      return i; // Return the index where the target is found\n    }\n  }\n  return -1; // Target not found\n}\n\n// Example usage:\nconsole.log(linearSearch([5, 3, 7, 1, 9], 7)); // Output: 2```\n\n\n Additional Explanation:\n- How It Works:  \n  The algorithm loops through the array sequentially to check each element.\n- Use Case:   Useful for small or unsorted datasets where simplicity is preferred.",
    "tags": [
      "searching"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": ":r0:1aa1",
    "topic": "dsa",
    "question": "Binary Search",
    "answer": " \n\n Code:\n\n```// Binary Search\n// Time Complexity:\n//   Best case: O(1) when the middle element is the target\n//   Average & Worst case: O(log n)\n// Preconditions: The array must be sorted.\n// \n// Explanation: \n// Compare the target to the middle element; if they are not equal, \n// discard the half where the target cannot be and repeat on the remaining half.\nfunction binarySearch(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) {\n      return mid; // Target found\n    } else if (arr[mid] < target) {\n      low = mid + 1; // Target must be in the right half\n    } else {\n      high = mid - 1; // Target must be in the left half\n    }\n  }\n  return -1; // Target not found\n}\n\n// Example usage (array should be sorted):\nconsole.log(binarySearch([1, 3, 5, 7, 9], 7)); // Output: 3\n```\n\n\n Additional Explanation:\n- How It Works:  \n  The search repeatedly divides the search interval in half by comparing the target with the middle value.\n- Use Case:  \n  Very efficient for large, sorted datasets.",
    "tags": [
      "searching"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": ":r0:2af1",
    "topic": "dsa",
    "question": "Jump Search",
    "answer": "\n\n Code:\n\n```// Jump Search\n// Time Complexity: O(√n)\n// Preconditions: The array must be sorted.\n// \n// Explanation:\n// The algorithm jumps ahead by fixed steps (block size), then does a linear search within the block where the target might be located.\nfunction jumpSearch(arr, target) {\n  const n = arr.length;\n  const step = Math.floor(Math.sqrt(n)); // Optimal jump size is √n\n  let prev = 0;\n\n  // Find the block where the target may be located\n  while (arr[Math.min(step, n) - 1] < target) {\n    prev = step;\n    if (prev >= n) return -1;\n    // Increase the step\n    step += Math.floor(Math.sqrt(n));\n  }\n\n  // Linear search within the identified block\n  for (let i = prev; i < Math.min(step, n); i++) {\n    if (arr[i] === target) {\n      return i;\n    }\n  }\n  return -1; // Target not found\n}\n\n// Example usage (array must be sorted):\nconsole.log(jumpSearch([1, 3, 5, 7, 9, 11, 13, 15, 17], 13)); // Output: 6\n\n```\n\n\n Additional Explanation:\n- How It Works:  \n  It makes fixed-size jumps through the array to narrow down the region containing the target and then performs a linear search in that region.\n- Use Case:  \n  Useful when the cost of jumping is low and data is sorted.\n",
    "tags": [
      "searching"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": ":r0:3fsdg1",
    "topic": "dsa",
    "question": "Interpolation Search\n",
    "answer": "\n Code:\n\n```// Interpolation Search\n// Time Complexity:\n//   Average: O(log log n) for uniformly distributed arrays\n//   Worst: O(n) for non-uniform distributions\n// Preconditions: The array must be sorted and uniformly distributed.\n// \n// Explanation:\n// Similar to binary search, but instead of choosing the middle element, \n// it estimates the position of the target based on the key value and the array's distribution.\nfunction interpolationSearch(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n\n  while (low <= high && target >= arr[low] && target <= arr[high]) {\n    // Avoid division by zero\n    if (low === high) {\n      if (arr[low] === target) return low;\n      return -1;\n    }\n    \n    // Estimate the position using the interpolation formula\n    let pos = low + Math.floor(((target - arr[low])  (high - low)) / (arr[high] - arr[low]));\n\n    if (arr[pos] === target) {\n      return pos;\n    } else if (arr[pos] < target) {\n      low = pos + 1;\n    } else {\n      high = pos - 1;\n    }\n  }\n  return -1; // Target not found\n}\n\n// Example usage (with uniformly distributed, sorted array):\nconsole.log(interpolationSearch([10, 20, 30, 40, 50, 60, 70], 40)); // Output: 3\n\n```\n\n\n Additional Explanation:\n- How It Works:  \n  It calculates a probable index using a linear interpolation based on the target and boundary values.\n- Use Case:  \n  Ideal for large, uniformly distributed, and sorted arrays; however, performance may degrade if the distribution is uneven.",
    "tags": [
      "searching"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": ":r0:4sdgw1",
    "topic": "dsa",
    "question": "Exponential Search",
    "answer": "\n\n Code:\n\n```// Exponential Search\n// Time Complexity: O(log n)\n// Preconditions: The array must be sorted.\n// \n// Explanation:\n// First, find a range where the target could reside by checking exponentially increasing indices.\n// Then, perform a binary search within that range.\nfunction exponentialSearch(arr, target) {\n  if (arr[0] === target) return 0;\n\n  let i = 1;\n  const n = arr.length;\n  \n  // Find the range for binary search by doubling index 'i'\n  while (i < n && arr[i] <= target) {\n    i = 2;\n  }\n\n  // Do binary search between i/2 and min(i, n-1)\n  return binarySearchHelper(arr, target, Math.floor(i / 2), Math.min(i, n - 1));\n}\n\nfunction binarySearchHelper(arr, target, low, high) {\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    else if (arr[mid] < target) {\n      low = mid + 1;\n    } else {\n      high = mid - 1;\n    }\n  }\n  return -1;\n}\n\n// Example usage (sorted array):\nconsole.log(exponentialSearch([2, 3, 4, 10, 40, 50, 60, 70, 80, 90], 10)); // Output: 3\n\n```\n\n\n Additional Explanation:\n- How It Works:  \n  The algorithm first finds an interval where the target value could be by repeatedly doubling the index. It then uses binary search within this interval.\n- Use Case:  Efficient for unbounded or very large sorted arrays where you might not know the size in advance  ",
    "tags": [
      "searching"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },


]