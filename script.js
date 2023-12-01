a = [4,3,5,2,6,1];

console.log('Before sorting', a)

function swap(arr, x, y){
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
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
    if(arr[i] > arr[j]){
        tempArray.push(arr[i]);
        i++;

        // if left array ends before right array
        if(i > mid){
            for(let k = j; k <= hi; k++){
                tempArray.push(arr[k]);
            }
            return;
        }
    }else{
        tempArray.push(j);
        j++;
        
        // if right array ends before left array
        if(j > hi){
            for(let k = i; k <= mid; k++){
                tempArray.push(arr[k]);
            }
            return;
        }

    }

    // copy the tempArray to original array
    for(let i = 0; i < arr.length; i++){
        arr[i] = tempArray[i];
    }

}

function mergeSort(arr, lo, hi){
    if(lo == hi){
        return;
    }
    let mid = Math.floor((lo + hi) / 2);
    mergeSort(arr, lo, mid);
    mergeSort(arr, mid + 1, hi);
    mergeArray(arr,lo, mid, hi);
}

// 5. Heap Sort
// 6. Quick Sort
// 7. Radix Sorlt
// 8. Shel Sort



mergeSort(a, 0, a.length - 1);
console.log('After sorting', a);