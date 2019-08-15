// 基数排序

// LSD
function LSDsort(arr) {
    if(!arr || arr.length === 0) {
        return [];
    }
    let length = arr.length; // 待排序数组长度
    let maxDigit = getMaxDigit(arr, length); // 获取最大数长度

    let buckets = []; // 初始化10个桶 0-9
    for(let i = 0; i < 10; i++) {
        buckets[i] = [];
    }    

    for(let base = 0; base < maxDigit; base++) { // base: 基数
        // 个位入桶，按顺序从桶内取出覆盖原数组，十位入桶，取出，百位入，取出...
        lsdSort(arr, buckets, length, base)
    } 

    return arr;
}

// 获取最大数字的位宽
function getMaxDigit(arr, length) {
    let digit = 1; // 最长数据的长
    let base = 10;
    for(let i = 0; i < length; i++) {
        while(arr[i] >= base) {
            digit ++;
            base *= 10;
        }
    }
    return digit;
}

function lsdSort(arr, buckets, length, base) {
    // 入桶
    for(let i = 0; i < length; i++) {
        let num = arr[i];
        let index = getBucketNumber(num, base);
        buckets[index].push(num);
    }
    // 重写原数组
    let start = 0;
    for(let j = 0; j < 10; j++) {
        let bucket = buckets[j];
        for(let k = 0; k < bucket.length; k++) {
            arr[start ++] = bucket[k];
        }
        bucket.length = 0; // 桶里面内容数不一样，所以每次都需要清空
    }
}

// 根据某位数确定数字应投入的桶的编号
function getBucketNumber(num, i) {
    return Math.floor((num / Math.pow(10, i)) % 10);
}
/*
function getBucketNumber(num, i) {
    return (num + '').reverse()[i];
}
*/

// MSD
function MSDsort(arr) {
    if(!arr || arr.length === 0) {
        return [];
    }
    let length = arr.length; // 待排序数组长度
    let maxDigit = getMaxDigit(arr, length); // 获取最大数长度

    // let buckets = []; // 初始化10个桶 0-9
    // for(let i = 0; i < 10; i++) {
    //     buckets[i] = [];
    // }    

    msdSort(arr, length, maxDigit - 1);

    return arr;
}

// 获取最大数字的位宽
function getMaxDigit(arr, length) {
    let digit = 1; // 最长数据的长
    let base = 10;
    for(let i = 0; i < length; i++) {
        while(arr[i] >= base) {
            digit ++;
            base *= 10;
        }
    }
    return digit;
}


// 根据某位数确定数字应投入的桶的编号
function getBucketNumber(num, i) {
    return Math.floor((num / Math.pow(10, i)) % 10);
}

function msdSort(arr, length, maxDigit) {
    let buckets = []; // 初始化10个桶 0-9
    for(let i = 0; i < 10; i++) {
        buckets[i] = [];
    } 

    // 各元素入桶
    for(let i = 0; i < length; i++) {
        let num = arr[i];
        let index = getBucketNumber(num, maxDigit);
        buckets[index].push(num);
    }
    // 递归子桶
    for(let j = 0; j < 10; j++) {
        let bucket = buckets[j];
        if(bucket.length > 1 && maxDigit - 1) {
            msdSort(arr, length, maxDigit - 1);
        }
    }
    let start = 0;
    // 重写原数组
    for(let k = 0; k < 10; k++) {
        let bucket = buckets[k];
        for(let l = 0; l < bucket.length; l++) {
            arr[start ++] = bucket[l];
        }
        bucket.length = 0;
    }
}

// 基数排序衍生

// 1. 数组中的重复数字
function IsReplication(arr) {
    if(!arr || arr.length == 0) {
        return null;
    }

    let length = arr.length;
    // 判断数组中的数字是否在 [0, length - 1] 范围内
    for(let i = 0; i < length; i++) {
        if(arr[i] < 0 || arr[i] >= length) {
            return null;
        }
    }

    
    for(let i = 0; i < length; i++) {
        // arr[i] 与 i 不相同时一直叫唤
        while(arr[i] !== i) { console.log(arr[i])
            // 如果 i 位置与 arr[i] 位置的数字相同，说明有重复数字
            if(arr[i] === arr[arr[i]]) {
                return arr[i]; // 重复数字
            } else {
                // es6 交换会出现问题，不知道为啥
                let tmp = arr[i];
                arr[i] = arr[tmp];
                arr[tmp] = tmp;
            }
        }
    }

    return null;
}

// 冒泡排序
function bubbleSortI(arr) {
    if(!arr || arr.length === 0) {
        return null;
    }

    let length = arr.length;

    for(let i = 0; i < length; i++) {
        for(let j = 0; j < length - 1 - i; j++) { // 去除外圈已经跑过的轮数
            if(arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        } 
    }

    return arr;
}

// 冒泡排序改进一 设置无序数列边界
function bubbleSortII(arr) {
    if(!arr || arr.length === 0) {
        return null;
    }

    let sortBorder = arr.length - 1;

    while(sortBorder > 0) {
        let pos = 0;
        for(let i = 0; i < sortBorder; i++) {
            if(arr[j] > arr[j + 1]) {
                pos = sortBorder; // 记录最后一次交换的位置
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
        sortBorder = pos; // 设置无序边界
    }

    return arr;
}

// 冒泡排序改进二 双指针冒泡
function bubbleSortIII(arr) {
    if(!arr || arr.length === 0) {
        return null;
    }

    let low = 0, high = arr.length - 1;
    let tmp, j;
    while(low < high) {
        for(let j = low; j < high; j++) { // 正向冒泡找出最大值
            if(arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
        high --;
        for(j = high; j < low; j--) { // 反向冒泡找出最小值
            if(arr[j] < arr[j - 1]) {
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
            }
        }
        low ++; console.log(rr)
    }
    return arr;
}

// 选择排序
function selectSortI(arr) {
    if(!arr || arr.length === 0) {
        return null;
    }

    let length = arr.length;

    for(let i = 0; i < length - 1; i++) {
        let min = i;
        // 找出最小值元素下标
        for(let j = i + 1; j < length; j++) {
            if(arr[j] < arr[min]) {
                min = j;
            }
        }
        // 把最小值和 i 所指向元素进行交换
        [arr[i], arr[min]] = [arr[min], arr[i]];
    }

    return arr;
}

// 选择排序改进 双指针选择排序
// 一次确定两个元素的位置，每次将最小值放在起始位置，最大值放在末尾位置

function selectSortII(arr) {
    if(!arr || arr.length === 0) {
        return null;
    }

    let length = arr.length;

    let low = 0, high = length - 1;

    while(low < high) {
        max = high;
        min = low;

        // 确定最小及最大值下标
        for(let j = low; j <= high; j++) {
            if(arr[j] < arr[min]) {
                min = j;
            }
            if(arr[j] > arr[max]) {
                max = j;
            }
        }

        // 最大值放到无序数组最后
        if(max !== high) {
            let tmp1 = arr[max];
            arr[max] = arr[high];
            arr[high] = tmp1;
        }

        if(min == high) {
            min = max;
        }

        // 最小值放在无序数组最前
        if(min !== low) {
            let tmp2 = arr[min];
            arr[min] = arr[low];
            arr[low] = tmp2;
        }

        low ++;
        high --;
    }

    return arr;
}


// 插入排序
// 1. 直接插入排序

function insertSort(arr) {
    if(!arr || arr.length === 0) {
        return null;
    }

    let length = arr.length;
    
    // arr[0] 已经是有序数组了，从 1 开始
    for(let i = 1; i < length; i++) {
        // 为 arr[i] 在前面 arr[0...i-1] 有序区间中找到
    }
}
