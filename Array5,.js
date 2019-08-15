// 旋转数组的最小数字

// 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 
// 输入一个非减排序的数组的一个旋转，输出旋转数组的最小元素。 
// 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 
// NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。

// 方法1 找出两个相邻数，前一个比后一个大
function minNumberInRotateArray(rotateArray)
{
    // write code here
    let i = 0, length = rotateArray.length;
    if(length === 0) return 0;
    while(i < length - 1) {
        if(rotateArray[i] > rotateArray[i + 1]) {
            return rotateArray[i + 1];
        } else {
            i++;
        }
    }
    // 全等
    return rotateArray[0];
}

// 方法2 二分法查找
// 边界判定？？？？
function minNumberInRotateArray(rotateArray)
{
    // write code here
    let length = rotateArray.length;
    if(length === 0) return 0;
    let left = 0, right = length - 1;
    while(left < right) { // [l,r) 只考虑至少存在两个数据的情况
        // 递增有序数组
        if(rotateArray[left] < rotateArray[right]) {
            return rotateArray[left];
        }
        
        let middle = Math.floor((left + right) / 2); // 加法可能会导致整型溢出，可以换为 left + (right - left) / 2
        if(rotateArray[left] < rotateArray[middle]) { // [m+1, r)
            // 左半边有序
            left = middle + 1;
        } else if(rotateArray[right] > rotateArray[middle]) { // [l, m)
            // 右半边有序
            right = middle;
        } else {
            // rotateArray[left] == rotateArray[middle] == rotateArray[right]
            // 这种存在两种情况
            // 1. 全等
            // 2. 左半边相等
            // 因为右边是开区间，但 r - 1 可能是最小值，所以只能加左边的指针
            // 这道题真难……
            left++;
        }
    }
    return rotateArray[left];
}

// 时间效率问题
// 数组中出现次数超过一半的数字
// 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
// 例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。
// 由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。
function MoreThanHalfNum_Solution(numbers)
{
    // write code here
    var length = numbers.length;
    
    var count = {}, temp;
    
    for(var i = 0; i < length; i++) {
        temp = numbers[i];
        if(!count[temp]) {
            count[temp] = 1;
        } else {
            count[temp]++;
        }
    }
    
    for(var key in count) {
        if(count[key] > (length/2)){
           return Number(key);
        }
    }
    
    return 0;
}

// 还可以用栈实现，时间复杂度 O(n)
// 规则：
// 1. 栈为空，入栈
// 2. 元素 == 栈顶，入栈
// 3. 元素 !== 栈顶，栈顶出栈
// up启发了我，可以用一个指针指向栈顶，栈为空，指针 -1，而不需要每次计算栈长度

// 还可以降低时间复杂度，用一个值cand表示栈顶元素，用count计数
// 1. 栈为空，入栈，cand=num[i]
// 2. 元素 == 栈顶，入栈 count++
// 3. 元素 !== 栈顶，栈顶出栈 count--
// return cand

// 时间效率问题
// 最小的K个数
// 输入n个整数，找出其中最小的K个数。例如输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4,。

// 借助了 js 的 Math.max() 函数
// 自定义大小堆/红黑树/二叉树等方法暂时不会

function GetLeastNumbers_Solution(input, k)
{
    // write code here
    var length = input.length;
    if (input == null || k <= 0 || k > length) {
        return [];
    }
    var minArr = input.slice(0, k);
    var max = Math.max(...minArr), maxInd = minArr.indexOf(max);
    
    for(var i = k; i < length; i++) {
        if(input[i] < max) {
            minArr[maxInd] = input[i];
            max = Math.max(...minArr);
            maxInd = minArr.indexOf(max);
            // console.log(i,minArr,max,maxInd);
        }
    }
    
    return minArr.sort(function(a,b){return a-b;});
}

// 把数组排成最小的数
// 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
// 例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。

// 先将整型数组转换成String数组，然后将String数组排序，最后将排好序的字符串数组拼接出来。关键就是制定排序规则。
//  * 排序规则如下：
//  * 若a+b > b+a 则 a > b，
//  * 若a+b < b+a 则 a < b，
//  * 若a+b = b+a 则 a = b

function PrintMinNumber(numbers)
{
    // write code here
    let length = numbers.length;
    if(numbers.length < 0) return null;
    if(numbers.length === 0) return "";
    let newNumbers = numbers.map(a => a.toString());
    newNumbers.sort((a, b) => {
        let str1 = a + b, str2 = b + a;
        for(let i = 0; i < str1.length; i++) {
            if(str1.charAt(i) === str2.charAt(i)) {
                continue;
            } else {
                return str1.charAt(i) - str2.charAt(i);
            }
        }
        return 1;
    }); // console.log(newNumbers)
    // 先连接，再按位比较

    let result = newNumbers[0];
    for(let i = 1; i < length; i++) {
        let tmp1 = Number(result + newNumbers[i]);
        let tmp2 = Number(newNumbers[i] + result);
        result = (tmp1 <= tmp2 ? tmp1 : tmp2).toString();
    }
    return Number(result);
}

// 第一个只出现一次的字符

// 在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次的字符,
// 并返回它的位置, 如果没有则返回 -1（需要区分大小写）.

function FirstNotRepeatingChar(str)
{
    // write code here
    // 考察时间效率
    // 这道题如果改成数组中只出现一次的数，就可以采用位运算
    // a^b^a = b
    // 但可惜这道题不是，还是只能想出hash表
    
    // js 中数组可以直接用索引指向每一位
    // 方法1 索引 时间复杂度 O(n) ~ O(n^2)
    /*
    for(let i = 0; i < str.length; i++) {
        if(str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
            return i; // 返回位置
        }
    }
    return -1;
    */
    let hash = {};
    for(let i = 0; i < str.length; i++) {
        if(!hash[str[i]]) {
            hash[str[i]] = 1;
        } else {
            hash[str[i]]++;
        }
    }
    for(let j = 0; j < str.length; j++) {
        if(hash[str[j]] === 1) {
            return j;
        }
    }
    return -1;
}

// 数组中的逆序对

// 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。
// 输入一个数组,求出这个数组中的逆序对的总数P。并将P对1000000007取模的结果输出。 
// 即输出P%1000000007

// 方法1

function InversePairs(data)
{
    // write code here
    // 方法1 暴力解法(O(n^2)算法复杂度太大，会超时)
    let length = data.length;
    let minIndex = length - 1;
    let p = 0;
    while(minIndex >= 1) {
        for(let i = (minIndex - 1); i >= 0; i--) {
            if(data[i] > data[minIndex]) {
                p++;
            }
        }
        minIndex--;
    }
    return p % 1000000007;
}

// 方法2 类似归并排序
// 归并排序及类似算法需要开辟 O(n) 的辅助空间
function InversePairs(data)
{
    // write code here
    if(!data || data.length === 0) {
        return 0;
    }
    let dataCopy = [];
    for(let i = 0; i < data.length; i++) {
        dataCopy[i] = data[i];
    } // dataCopy = data.slice(); 很好的数组复制方法，记住
    // [l, r]
    return InversePairsHelp(data, dataCopy, 0, data.length - 1) % 1000000007;
}

function InversePairsHelp(data, copy, left, right) {
    if(left >= right) return 0;
    let middle = parseInt((left + right) / 2);
    // 交换 data 和 copy 的传入位置，把排序过的 copy 传入下一次
    let leftCount = InversePairsHelp(copy, data, left, middle); // [l, m]
    let rightCount = InversePairsHelp(copy, data, middle + 1, right); // [m+1, r]
    let count = 0;
    let p = middle; // 左边数组的最后一位
    let q = right; // 右边数组的最后一位
    let copyIndex = right; // 指针指向 copy 数组的最后一位
    
    // console.log('1',p,q,middle)
    
    while(p >= left && q >= (middle + 1)) {
        // console.log(data,p,data[p],q,data[q])
        if(data[p] > data[q]) { // 左边最后一位大于右边最后一位（即右边经过排序后的最大值）
            count = count + q - middle;
            copy[copyIndex --] = data[p --]; // 最大值塞给copy数组
        } else {
            // 右边最后一位是最大值
            copy[copyIndex --] = data[q --]; // 最大值塞给copy数组
        }
        // console.log('2',p,q,count)
    }
    while(p >= left) {
        copy[copyIndex --] = data[p --];
    }
    while(q >= (middle + 1)) {
        copy[copyIndex --] = data[q --];
    }
    
    // 也可以不交换递归传参，直接更新 data 为排序过的数组

    return leftCount + rightCount + count;
} 

// 时间效率问题

// 丑数
// 把只包含质因子2、3和5的数称作丑数（Ugly Number）。
// 例如6、8都是丑数，但14不是，因为它包含质因子7。 
// 习惯上我们把1当做是第一个丑数。求按从小到大的顺序的第N个丑数。

function GetUglyNumber_Solution(index)
{
    // write code here
    // 丑数 1 2 3 4 5 6 | 8 
    if(index === 0) return 0;
    if(index === 1) return 1; 
    let ugly = [];
    ugly[0] = 1;
    let i2 = 0, i3 = 0, i5 = 0; // 2^i2 * 3^i3 * 5^i5
    // 先用大佬的做法
    // 写得真好啊

    // 丑数的定义是1或者因子只有2 3 5，可推出丑数=丑数*丑数，假定丑数有序序列为：a1,a2,a3.......an
    // 所以可以将以上序列（a1除外）可以分成3类，必定满足：
    // 包含2的有序丑数序列：2*a1, 2*a2, 2*a3 .....3 * ugly[i3]
    // 包含3的有序丑数序列：3*a1, 3*a2, 3*a3 .....
    // 包含5的有序丑数序列：5*a1, 5*a2, 5*a3 .....
    // 将上面的序列排列为有序数列
    
    for(let i = 1; i < index; i++) {
        ugly[i] = Math.min(2 * ugly[i2], Math.min(3 * ugly[i3], 5 * ugly[i5]));
        if(ugly[i] === 2 * ugly[i2]) i2++;
        if(ugly[i] === 3 * ugly[i3]) i3++;
        if(ugly[i] === 5 * ugly[i5]) i5++;
    }
    return ugly[index - 1];
}

// 我看了其他的解法其实也就是这种做法繁琐点的版本
/*
通俗易懂的解释：
首先从丑数的定义我们知道，一个丑数的因子只有2,3,5，那么丑数p = 2 ^ x * 3 ^ y * 5 ^ z，换句话说一个丑数一定由另一个丑数乘以2或者乘以3或者乘以5得到，那么我们从1开始乘以2,3,5，就得到2,3,5三个丑数，在从这三个丑数出发乘以2,3,5就得到4，6,10,6，9,15,10,15,25九个丑数，我们发现这种方法会得到重复的丑数，而且我们题目要求第N个丑数，这样的方法得到的丑数也是无序的。那么我们可以维护三个队列：
（1）丑数数组： 1
乘以2的队列：2
乘以3的队列：3
乘以5的队列：5
选择三个队列头最小的数2加入丑数数组，同时将该最小的数乘以2,3,5放入三个队列；
（2）丑数数组：1,2
乘以2的队列：4
乘以3的队列：3，6
乘以5的队列：5，10
选择三个队列头最小的数3加入丑数数组，同时将该最小的数乘以2,3,5放入三个队列；
（3）丑数数组：1,2,3
乘以2的队列：4,6
乘以3的队列：6,9
乘以5的队列：5,10,15
选择三个队列头里最小的数4加入丑数数组，同时将该最小的数乘以2,3,5放入三个队列；
（4）丑数数组：1,2,3,4
乘以2的队列：6，8
乘以3的队列：6,9,12
乘以5的队列：5,10,15,20
选择三个队列头里最小的数5加入丑数数组，同时将该最小的数乘以2,3,5放入三个队列；
（5）丑数数组：1,2,3,4,5
乘以2的队列：6,8,10，
乘以3的队列：6,9,12,15
乘以5的队列：10,15,20,25
选择三个队列头里最小的数6加入丑数数组，但我们发现，有两个队列头都为6，所以我们弹出两个队列头，同时将12,18,30放入三个队列；
……………………
疑问：
1.为什么分三个队列？
丑数数组里的数一定是有序的，因为我们是从丑数数组里的数乘以2,3,5选出的最小数，一定比以前未乘以2,3,5大，同时对于三个队列内部，按先后顺序乘以2,3,5分别放入，所以同一个队列内部也是有序的；
2.为什么比较三个队列头部最小的数放入丑数数组？
因为三个队列是有序的，所以取出三个头中最小的，等同于找到了三个队列所有数中最小的。
实现思路：
我们没有必要维护三个队列，只需要记录三个指针显示到达哪一步；“|”表示指针,arr表示丑数数组；
（1）1
|2
|3
|5
目前指针指向0,0,0，队列头arr[0] * 2 = 2,  arr[0] * 3 = 3,  arr[0] * 5 = 5
（2）1 2
2 |4
|3 6
|5 10
目前指针指向1,0,0，队列头arr[1] * 2 = 4,  arr[0] * 3 = 3, arr[0] * 5 = 5
（3）1 2 3
2| 4 6
3 |6 9
|5 10 15
目前指针指向1,1,0，队列头arr[1] * 2 = 4,  arr[1] * 3 = 6, arr[0] * 5 = 5
………………
*/

// 根据已知求到结果，再把这个结果当成已知，求下一个结果
// 这种解题思路非常重要！！！
// 很多位运算的解题中也有这种思路

// 数字在排序数组中出现的次数

function GetNumberOfK(data, k)
{
    // write code here
    // 找出数字第一次出现的位置和最后一次出现的位置
    // 排序数组，考虑二分法(这道题其实也应该考虑下究竟是升序还是降序)
    let first = getFirst(data, k);
    let last = getLast(data, k);
    
    return last - first + 1;
}

function getFirst(data, k) {
    let l = 0, r = data.length - 1;
    let m = parseInt(l + (r - l) / 2);
    while(l <= r) {
        if(data[m] < k) { 
            // k 在后半段
            // 因为查找的是起始点，所以不可以用 <=
            l = m + 1;
        } else {
            r = m - 1;
        }
        m = parseInt(l + (r - l) / 2); // console.log(l, m, r)
    }
    return l;
}

function getLast(data, k) {
    let l = 0, r = data.length - 1;
    let m = parseInt(l + (r - l) / 2);
    while(l <= r) {
        if(data[m] <= k) { 
            // k 在后半段存在
            // 必须用 <=，因为 data[m] 可能就是最后一个 k
            l = m + 1;
        } else {
            r = m - 1;
        }
        m = parseInt(l + (r - l) / 2); // console.log(l, m, r)
    }
    return r;
}