a = [2,3,4,5,1];

console.log('Before sorting', a)

function swap(arr, x, y){
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}

// Shuffle the array
function shuffle(arr){
    arr.sort(() => Math.random() - 0.5);
}

// 1. Bubble Sort
function bubbleSort(arr){
    for(let i = 0; i < arr.length; i++){
        let flag = 0;
        for(let j = 0; j < arr.length - 1 - i; j++){
            if(arr[j] > arr[j+1]){
                swap(arr, j, j+1);
                flag = 1;
            }
        }
        if(flag == 0){
            break;
        }
    }
}

// 2. Insertion Sort
function insertionSort(arr){
    for(let i = 1; i < arr.length; i++){
        let key = arr[i];
        let j = i - 1;
        while(arr[j] > key){
            arr[j + 1] = arr[j];
            j--;
            if(j == -1){
                break;
            }
        }
        arr[j + 1] = key;
    }
}

// 3. Selection Sort
function selectionSort(arr){
    for(let i = 0; i < arr.length - 1; i++){
        small = i;
        for(let j = i + 1; j < arr.length; j++){
            if(arr[small] > arr[j]){
                small = j;
            }
        }
        if(i != small){
            swap(arr, i, small);
        }
        console.log(arr);
    }
}

// 4. Merge Sort
function mergeArray(arr, lo, mid, hi){
    let tempArray = [];

    let i = lo;
    let j = mid + 1;

    while(i <= mid && j <= hi){
        if(arr[i] < arr[j]){
            tempArray.push(arr[i]);
            i++;
        }else{
            tempArray.push(arr[j]);
            j++;
        }
    }
    while(i <= mid){
        tempArray.push(arr[i]);
        i++;
    }
    while(j <= hi){
        tempArray.push(arr[j]);
        j++;
    }
    // copy the tempArray to original array
    for(let i = 0; i < tempArray.length; i++){
        arr[lo + i] = tempArray[i];
    }
}

function mergeArray2(arr, lo, mid, hi){
    const leftArr = [];
    const rightArr = [];
    
    // insert elment to left array
    for(let i = lo; i <= mid; i++){
        leftArr.push(arr[i]);
    }
    leftArr.push(Infinity);

    // insert elment to right array
    for(let i = mid + 1; i <= hi; i++){
        rightArr.push(arr[i]);
    }
    rightArr.push(Infinity);

    let i = j = 0;
    for(let k = lo; k <= hi; k++){
        if(leftArr[i] < rightArr[j]){
            arr[k] = leftArr[i];
            i++;
        }else{
            arr[k] = rightArr[j];
            j++;
        }
    }
}

function mergeSort(arr, lo, hi){
    if(lo == hi){
        return;
    }
    let mid = Math.floor((lo + hi) / 2);
    mergeSort(arr, lo, mid);
    mergeSort(arr, mid + 1, hi);
    mergeArray2(arr,lo, mid, hi);
}

// 5. Heap Sort

// 6. Quick Sort
function partition(arr, lo, hi){
    let pivot = arr[lo];
    let i = lo;
    let j = hi;
    while(true){
        while(i <= j && pivot >= arr[i]){
            i++;
        }
        while(i <= j && pivot <= arr[j]){
            j--;
        }
        if(i <= j){
            swap(arr, i, j);
        }else{
            break;
        }   
    }
    swap(arr, lo, j);
    return j;
}

function quickSort(arr, lo, hi){
    if(lo < hi){
        let p = partition(arr, lo, hi);
        quickSort(arr, lo, p - 1);
        quickSort(arr, p + 1, hi);
    }
}

// 7. Radix Sorlt

// 8. Shell Sort



quickSort(a, 0, a.length - 1);
console.log('After sorting', a);