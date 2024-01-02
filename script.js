const menu = document.querySelector('.menu-items');
const sortingContainer = document.querySelector('.sorting-container');

function previousMenu(){
    menu.scrollBy({
        top: 0,
        left: -100,
        behavior: 'smooth',
    });
}
function nextMenu(){
    menu.scrollBy({
        top: 0,
        left: 100,
        behavior: 'smooth',
    });
}


function swap(arr, x, y){
    const itemX = document.getElementById(`item${arr[x]}`);
    const itemY = document.getElementById(`item${arr[y]}`);
    // const space = Math.abs(itemX.getClientRects()[0].left - itemY.getClientRects()[0].left);
    tl.to(itemX, {duration: 1, x: y * (itemWidth + spaceWidth)});
    tl.to(itemY, {duration: 1, x: x * (itemWidth + spaceWidth)}, '-=1');
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
            // adding animation for comparison
            changeColorAnimation(arr[j], 'skyblue', 1);
            changeColorAnimation(arr[j + 1], 'skyblue', 1, true);

            if(arr[j] > arr[j+1]){
                swap(arr, j, j+1);
                flag = 1;
            }

            // Animation to end comparison
            changeColorAnimation(arr[j], 'black');
            changeColorAnimation(arr[j + 1], 'black');
            
        }
        if(flag == 0){
            break;
        }
    }
}

// 2. Insertion Sort
function insertionSort(arr, gap = 1){
    for(let i = gap ; i < arr.length; i++){
        let j = i - 1;
        while(arr[j] > arr[j + gap]){
            changeColorAnimation(arr[j], 'skyblue', 1);
            changeColorAnimation(arr[j + gap], 'skyblue', 1, true);
            
            swap(arr, j, j + gap);
            
            // changeColorAnimation(arr[j], 'black');
            changeColorAnimation(arr[j + gap], 'black');
            
            j = j - gap;
            if(j == gap - 2){
                break;
            }
        }
        changeColorAnimation(arr[j + gap], 'black');

    }
}

// 3. Selection Sort
function selectionSort(arr){
    for(let i = 0; i < arr.length - 1; i++){
        small = i;
        changeColorAnimation(arr[small], 'skyblue');
        for(let j = i + 1; j < arr.length; j++){
            // adding animation for comparison
            changeColorAnimation(arr[j], 'skyblue', 1);
            changeColorAnimation(arr[j], 'black');

            if(arr[small] > arr[j]){
                changeColorAnimation(arr[j], 'skyblue');
                changeColorAnimation(arr[small], 'black');
                small = j;
            }
        }
        if(i != small){
            swap(arr, i, small);
        }
        changeColorAnimation(arr[small], 'black');
        changeColorAnimation(arr[i], 'black');
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

    // Left Arr Color Change Animation
    for(let i = 0; i < leftArr.length - 1; i++){
        changeColorAnimation(leftArr[i], 'skyblue');
    }
    // Left Arr upwards Animation
    tl.to(`#item${leftArr[0]}`, {
        duration: 1,
        y: leftArr[0] * (300 / a.length) - sortingContainer.clientHeight
    });
    for(let i = 1; i < leftArr.length - 1; i++){
        tl.to(`#item${leftArr[i]}`, {
            duration: 1,
            y: leftArr[i] * (300 / a.length) - sortingContainer.clientHeight 
        }, '<');
    }
    // Left Arr Color Change Animation
    for(let i = 0; i < leftArr.length - 1; i++){
        changeColorAnimation(leftArr[i], 'black');
    }

    // insert elment to right array
    for(let i = mid + 1; i <= hi; i++){
        rightArr.push(arr[i]);
    }
    rightArr.push(Infinity);


    // right Arr Color Change Animation
    for(let i = 0; i < rightArr.length - 1; i++){
        changeColorAnimation(rightArr[i], 'skyblue');
    }
    // right Arr upwards Animation
    tl.to(`#item${rightArr[0]}`, {
        duration: 1,
        y: rightArr[0] * (300 / a.length) - sortingContainer.clientHeight
    });
    for(let i = 1; i < rightArr.length - 1; i++){
        tl.to(`#item${rightArr[i]}`, {
            duration: 1,
            y: rightArr[i] * (300 / a.length) - sortingContainer.clientHeight
        }, '<');
    }
    // right Arr Color Change Animation
    for(let i = 0; i < rightArr.length - 1; i++){
        changeColorAnimation(rightArr[i], 'black');
    }

    let i = j = 0;
    for(let k = lo; k <= hi; k++){
        if(leftArr[i] < rightArr[j]){
            arr[k] = leftArr[i];
            mergeArrayAnimation(leftArr[i], k);
            i++;
        }else{
            arr[k] = rightArr[j];
            mergeArrayAnimation(rightArr[j], k);
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
function restoreHeapUp(arr, n){
    let key = n;
    while(key != 0){
        let parent = Math.floor((key - 1) / 2);
        
        changeColorAnimation(arr[key], 'skyblue', 1);
        changeColorAnimation(arr[parent], 'skyblue', 1, true);
        if(arr[key] > arr[parent]){
            swap(arr, key, parent);
            changeColorAnimation(arr[key], 'black');
            changeColorAnimation(arr[parent], 'black');
            key = parent;
        }else{
            changeColorAnimation(arr[key], 'black');
            changeColorAnimation(arr[parent], 'black');
            break;
        }
    }
}
function restoreHeapDown(arr, n){
    let key = 0;
    while(key <= n){
        let lc = 2 * key + 1;
        let rc = 2 * key + 2;
        let big = (rc > n || arr[lc] > arr[rc]) ? lc : rc;
        // if(rc > n){
        //     big = lc;
        // }
        if(big > n){
            break;
        }
        
        changeColorAnimation(arr[key], 'skyblue', 1);
        changeColorAnimation(arr[big], 'skyblue', 1, true);
        if(arr[key] < arr[big]){
            swap(arr, key, big);
            changeColorAnimation(arr[key], 'black');
            changeColorAnimation(arr[big], 'black');
            key = big;
        }else{
            changeColorAnimation(arr[key], 'black');
            changeColorAnimation(arr[big], 'black');
            break;
        }
    }
}

function heapSort(arr){
    // build the max heap
    for(let i = 1; i < arr.length; i++){
        restoreHeapUp(arr, i);
    }

    // delete the root node and place it at bottom of heap
    for(let i = 0; i < arr.length - 1; i++){
        changeColorAnimation(arr[0], 'skyblue', 1);
        changeColorAnimation(arr[arr.length - 1 - i], 'skyblue', 1, true);
        swap(arr, 0, arr.length - 1 - i);
        changeColorAnimation(arr[0], 'black');
        changeColorAnimation(arr[arr.length - 1 - i], 'black');
        restoreHeapDown(arr, arr.length - i - 2);
    }
}

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
        changeColorAnimation(arr[i], 'skyblue', 1);
        changeColorAnimation(arr[j], 'skyblue', 1, true);
        if(i <= j){
            swap(arr, i, j);
            changeColorAnimation(arr[i], 'black');
            changeColorAnimation(arr[j], 'black');
        }else{
            
            changeColorAnimation(arr[i], 'black');
            changeColorAnimation(arr[j], 'black');
            break;
        }   
    }
    if(lo != j){
        changeColorAnimation(arr[lo], 'skyblue', 1);
        changeColorAnimation(arr[j], 'skyblue', 1, true);
        swap(arr, lo, j);
        changeColorAnimation(arr[lo], 'black');
        changeColorAnimation(arr[j], 'black');
    }

    return j;
}

function quickSort(arr, lo, hi){
    if(lo < hi){
        let p = partition(arr, lo, hi);
        quickSort(arr, lo, p - 1);
        quickSort(arr, p + 1, hi);
    }
}

// 7. Shell Sort
function shellSort(arr){
    let n = arr.length; 
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) 
    { 
        insertionSort(arr, gap);
    }
}
// 8. Radix Sort


/*================= ANIMATION ===================*/

// Merge Array Animation
function mergeArrayAnimation(el, pos){
    changeColorAnimation(el, 'skyblue');
    tl.to(`#item${el}`, {
        duration: 1,
        y: 0,
        x: pos * (itemWidth + spaceWidth),
    });
    changeColorAnimation(el, 'black');
}

// Change Color Animation
function changeColorAnimation(el, color, dur = 0, cascade = false){
    if(cascade){
        tl.to(`#item${el}`,{
            backgroundColor: color,
            duration: dur,
            ease: 'steps(1)',
        }, '<');
    }else{
        tl.to(`#item${el}`,{
            backgroundColor: color,
            duration: dur,
            ease: 'steps(1)',
        });
    }
}

// Sorting Ending Animation
function endSortingAnimation(arr){
    for(let i = 0; i < arr.length; i++){
        const item = document.getElementById(`item${arr[i]}`);
        tl.to(item, {
            duration: '0.1',
            backgroundColor: 'skyblue',
            ease: 'steps(1)',
        });
    }

    for(let i = 0; i < arr.length; i++){
        const item = document.getElementById(`item${arr[i]}`);
        tl.to(item, {
            duration: '0.1',
            backgroundColor: 'black',
            ease: 'steps(1)',
        });
    }
}

// Play Sorting Animation
let playState = 0;  // play-> 1, pause -> 0, restart-> -1
const playPauseBtn = document.querySelector('.play-pause-btn');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');
const restartIcon = document.querySelector('.restart-icon');
restartIcon.style.display = 'none';
pauseIcon.style.display = 'none';
playIcon.style.display = 'inline-block';
playPauseBtn.addEventListener('click', playPauseSorting);
function playPauseSorting(){
    if(playState === 0){
        tl.resume();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline-block';
        playState = 1;
    }else if(playState === -1){
        restartIcon.style.display = 'none';
        pauseIcon.style.display = 'inline-block';
        tl.restart();
        playState = 0;
    }
    else{
        tl.pause();
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'inline-block';
        playState = 0;
    }
}

// change Animation Speedup
let speedupState = 1;
const speedupBtn = document.querySelector('.speedup');
const speedupLabel = document.querySelector('.speedup span');
speedupBtn.addEventListener('click', ()=>{
    if(speedupState === 1){
        speedupState = 2;

    }else{
        speedupState = 1;
    }
    speedupLabel.innerText = speedupState + 'x';
    tl.timeScale(speedupState);

})

// rewind Animation
const rewindBtn = document.querySelector('.rewind');
rewindBtn.addEventListener('click', ()=>{
    tl.seek(0);
})

// Shuffle Animation
function shuffleAnimation(){
    sl = gsap.timeline();
    for(let i = 0; i < a.length; i++){
        gsap.to(`#item${a[i]}`, {x: i * (itemWidth + spaceWidth), duration: 1});
    }
}

// Heart Animation
const heartShadow = document.querySelector('.heart-shadow');
heartAnimation = gsap.to(heartShadow, 0.3, {scale: 3, ease: 'back.out'});
heartAnimation.pause();

heartShadow.addEventListener('mouseover', ()=>{
    heartAnimation.play();
})
heartShadow.addEventListener('mouseout', ()=>{
    heartAnimation.reverse();
})

/*================= DOM MANIPULATION ===================*/
let activeSortingType = 'bubble';

// Shuffle Button
const shuffleBtn = document.querySelector('.shuffle');
shuffleBtn.addEventListener('click', ()=>{
    updateSortingPlayer(activeSortingType);
})

// Display Array Size
function displayArrSize(el){
    const output = document.querySelector('.array-size-output');
    output.innerText = el.value;
    console.log(el.value);
    
    
    let b = [...Array(el.value).keys()].map(i => i + 1);
    console.log(b);

    a = [];
    for(let i = 0; i < el.value; i++){
        a.push(i + 1);
    }
    console.log(a);
    updateSortingContainer();
    updateSortingPlayer(activeSortingType);
}

// Update DOM on resize
window.addEventListener('resize', ()=>{
    alpha = (sortingContainer.clientWidth - 100) / 2;
    itemWidth = alpha / a.length;
    spaceWidth = alpha / (a.length - 1);
    // updateSortingContainer();
    updateSortingPlayer(activeSortingType);
});

// Open sorting for different menu items
function openSorting(event, sortName){
    // removing the active class for all the menu items
    const menuItems = document.querySelector('.menu-items ul').children;
    for(let i = 0; i < menuItems.length; i++){
        menuItems[i].classList.remove('active');
    }

    // adding active class to the currenct menu
    const activeMenu = document.querySelector(`.${sortName}`);
    activeMenu.classList.add('active');

    // reset the play-pause button
    pauseIcon.style.display = 'none';
    playIcon.style.display = 'inline-block';
    playState = 0;

    // call updateSorting with sortName
    updateSortingPlayer(sortName);
}


// Update Sorting Container
let a = [...Array(10).keys()].map(i => i + 1);

let alpha = (sortingContainer.clientWidth - 100) / 2;
let itemWidth = alpha / a.length;
let spaceWidth = alpha / (a.length - 1);
function updateSortingContainer(){
    itemWidth = alpha / a.length;
    spaceWidth = alpha / (a.length - 1);
    sortingContainer.innerHTML = '';
    for(let i = 0; i < a.length; i++){
        sortingContainer.innerHTML += `<div id="item${a[i]}" class="sort-items" 
        style="width: ${itemWidth}px; height: ${a[i] * (300 / a.length)}px; transform: translateX(${i * (itemWidth + spaceWidth)}px);"></div>`;
    }
}


/*================= MAIN PROGRAM ===================*/
let tl = null;
function updateSortingPlayer(sortName){
    if(tl){
        tl.kill();
    }
    tl = null;
    tl = gsap.timeline({onComplete: ()=>{
        tl.pause();
        pauseIcon.style.display = 'none';
        restartIcon.style.display = 'inline-block';
        playState = -1;
    }});
    
    const durationTab = document.querySelector('.duration');
    durationTab.style.width = '100%';
    updateSortingContainer();
    shuffle(a);
    shuffleAnimation();
    console.log('Before sorting', a);
    activeSortingType = sortName;

    tl.pause();
    tl.timeScale(speedupState);

    playState = 0;
    restartIcon.style.display = 'none';
    pauseIcon.style.display = 'none';
    playIcon.style.display = 'inline-block';

    switch(sortName){
        case 'bubble':
            bubbleSort(a);
            break;
        case 'selection':
            selectionSort(a);
            break;
        case 'insertion':
            insertionSort(a);
            break;
        case 'merge':
            mergeSort(a, 0, a.length - 1);
            break;
        case 'quick':
            quickSort(a, 0, a.length - 1);
            break;
        case 'heap':
            heapSort(a);
            break;
        case 'shell':
            shellSort(a);
            break;
        default:
            console.log('Invalid: sortName');
    }
    endSortingAnimation(a);
    tl.from('.duration', tl.duration(), {width: '0%', ease: Linear.easeNone}, 0);
    
    console.log('After sorting', a);
}

updateSortingPlayer('bubble');