//滑动窗口

// 和为S的连续正数序列
// 输出所有和为S的连续正数序列。
// 序列内按照从小至大的顺序，序列间按照开始数字从小到大的顺序

// 注意是正数，不包括0

function FindContinuousSequence(sum)
{
    // write code here
    // 数学方法 设连续数列的长度为 n
    // 区分 n 为 奇数 和 偶数 的情况
    
    // 滑动窗口
    // 至少包含两个数，设置初始值 l = 0, r = 1, [l, r]闭区间
    // r 是闭括号，所以截止位为 Math.floor((1 + sum) / 2) [即至少有两个数的情况]
    // (r + l) * (r - l + 1) / 2 < sum，包含的数不够多 r++
    // (r + l) * (r - l + 1) / 2 > sum，包含的数太多 l++
    let result = [];
    if(sum <= 1) return result; 
    let l = 1, r = 2;
    while(r <= Math.floor((1 + sum) / 2)) {
        let tmpSum = (r + l) * (r - l + 1) / 2;
        if(tmpSum < sum) {
            r++;
        } else if(tmpSum > sum) {
            l++;
        } else { // ===
            let list = [];
            for(let i = l; i <= r; i++) {
                list.push(i);
            }
            // console.log(l,r,list)
            result.push(list);
            l++; // 新范围
            r++;
        }
    }
    return result;
}

// 和为S的两个数字
// 输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S
// 如果有多对数字的和等于S，输出两个数的乘积最小的


function FindNumbersWithSum(array, sum)
{
    // write code here
    // 双指针(递增排序数列)
    let length = array.length;
    let l = 0, r = length - 1; // [l, r]
    let result = [];
    while(l < r) {
        let little = array[l], large = array[r];
        let tmpSum = little + large;
        if(tmpSum === sum) {
            result[0] = little;
            result[1] = large; 
            break;
        } else if(tmpSum < sum) {
            l++;
        } else {
            r--;
        }
    }
    return result; 
}


//209长度最小的子数组
//滑动窗口
var minSubArrayLen = function(s, nums) {
    var l = 0, r = -1; //nums[l...r]变长滑动窗口
    var minLen = nums.length + 1; //判断不存在子串的情况
    var sum = 0;    
    while(l < nums.length){
        if((r + 1) < nums.length && sum < s){
            sum += nums[++r];
        }
        else{
            sum -= nums[l++];
        }
        if(sum === s){
            minLen = Math.min(minLen , r - l + 1);
        }
        console.log(l,r,minLen);
    }    
    if(minLen === nums.length + 1){
        minLen = 0;
    }
    return minLen;    
};
//本题另外提出了一个要求，想出一个O(nlogn)的解法
//网上提出二分查找法，二分查找法需要构造一个有序数组http://www.cnblogs.com/grandyang/p/4501934.html

//3 无重复字符的最长子串
//暴力破解法
var lengthOfLongestSubstring = function(s) {
    //var l = 0 , r = -1;//s[l...r]
    if(s.length == 1){
        return 1;
    }
    var nonRepeated = [];
    var longest = 0;
    for(var j = 0; j < s.length; j++){
        for(var i = j; i < s.length; i++){
            if(nonRepeated.indexOf(s[i]) < 0){
                nonRepeated.push(s[i]);
            }
            else{
                if(nonRepeated.length > longest){
                    longest = nonRepeated.length;
                }
                //console.log(nonRepeated);
                nonRepeated.length = 0;
                break;
            }
        }
        //console.log(j,i,longest);
    }
    return longest;
};
//总之这个滑动窗我写得很奇怪，数组运用有问题
var lengthOfLongestSubstring = function(s) {
    if(s.length == 0){
        return 0;
    }
    var l = 0 , r = -1;//s[l...r]
    var longest = 0, length = s.length;
    var repeated = [];
    while(l < length){
        if((r + 1) < length && repeated[s[r + 1]] === undefined){
            r++;
            repeated[s[r]]++;  //NaN     
        }
        else{
            repeated[s[l]] = undefined;  //undefined
            l++;
        }

        if(longest < (r - l + 1)){
            longest = (r - l + 1);                
        }
            
        //console.log(l,r,longest);

    }
    return longest;
};
//初始化数组为零，字母转ascii码位置，存在对应字母则ascii码对应位计数加一
var lengthOfLongestSubstring = function(s) {
    if(s.length == 0){
        return 0;
    }
    var l = 0 , r = -1;//s[l...r]
    var longest = 0, length = s.length;
    var repeated = [].fill.call({length:256},0);;
    while(l < length){
        if((r + 1) < length && repeated[s[r + 1].charCodeAt()] === 0){
            r++;
            repeated[s[r].charCodeAt()]++;       
        }
        else{
            repeated[s[l].charCodeAt()]--; 
            l++;
        }

        if(longest < (r - l + 1)){
            longest = (r - l + 1);                
        }
            
        //console.log(l,r,longest);

    }
    return longest;
};

/*将数组初始化为0的四种方法，三四种来源于网络*/
var a1 = Array(256).fill(0);
var a2 = [].fill.call({length:256},0); //fill会将空位视为正常的数组位置,所以必须修改array.prototype的length属性
var a3 = Array.apply(null,Array(256)).map(function(v, i){
    return 0;
}); 
var a4 = Array(256).join('0').split('').map(x => parseInt(x));

//438
//这道题说实话我自己是没想明白，后面的逻辑用的全部都是别人的了
//看了别人的程序我觉得这道就像一个赛跑，lr站在同一起跑线上
//l让r先走p.length格，然后之后l每动一格，r会跟着动一格，使lr始终保持plength的距离
var findAnagrams = function(s, p) {
    var result =[];
    var s = s.split("");
    var l = 0, r = 0;
    var plength = p.length;
    var repeated = Array(27).fill(0);//全小写字母
    for(var i of p){ //es6
        repeated[i.charCodeAt() - 97]++;    
    }
    while(r < s.length){
        if(repeated[s[r++].charCodeAt() - 97]-- >= 1){
            plength--;
        }
        if(plength === 0){
            result.push(l);
        }
        console.log(l,r,plength);
        if(r - l === p.length && repeated[s[l++].charCodeAt() - 97]++ >= 0){
            plength++;
        }
    }
    return result;
}

//76最小覆盖子串
//我的错误解答
var minWindow = function(s, t) {
    var l = 0, r = 0;
    var tLength = t.length;
    var repeated = Array(256).fill(0);//全小写字母
    for(var i of t){ //es6
        repeated[i.charCodeAt()]++;    
    } 
    var result = "";
    var stop = [];
    while(r < s.length){
        if(repeated[s[r++].charCodeAt()]-- >= 1){
            tLength--;
            if(r - 1 != l){stop.push(r-1);}          
        }
        if(tLength === 0){
            if(result === ""){
                result = s.slice(l, r);
            }
            else{
                var newLength = r - l;
                if(result.length > newLength){
                    result = s.slice(l, r);
                }
            }
            l = stop.shift(), r = l, stop = [], tLength = t.length;
            repeated = Array(256).fill(0);
            for(var i of t){ //es6
                repeated[i.charCodeAt()]++;    
            } 
        }
        console.log(l,r,stop,stop.shift(),result);
    }
    return result;
};

//

function printMatrix(matrix)
{
    // write code here
    let row = matrix.length, column = matrix[0].length;// console.log(row,column);
    let result = [];
    if(row === 0 || column === 0) return result;
    
    let top = 0, left = 0, right = column - 1, bottom = row - 1;
    
    // 考虑极端情况
    // 1行
    // 1列
    // 1行1列（注意边界！！！）
    while(top <= bottom && left <= right) {
        // 从左上至右上
        for(let i = left; i <= right; i++) { 
            result.push(matrix[top][i]);// console.log(matrix[top][i])
        }
        // 从右上至右下
        for(let j = top + 1 ; j <= bottom; j++) { 
            result.push(matrix[j][right]);// console.log(matrix[j][right])
        }
        // 从右下至左下
        // 考虑到1行情况，为避免重复写入，必须 top < bottom
        for(let k = right - 1; k >= left && top < bottom; k--) {  
            result.push(matrix[bottom][k]);// console.log(matrix[bottom][k])
        }
        // 从左下至左上
        for(let l = bottom - 1; l > top && left < right; l--) { // 考虑1列情况
            result.push(matrix[l][left]);// console.log(matrix[l][left])
        }
        // 指针全部向内圈移位
        top++;
        left++;
        right--;
        bottom--;
    }
    return result;
}




// 滑动窗口的最大值

// 给定一个数组和滑动窗口的大小，找出所有滑动窗口里数值的最大值。
// 例如，如果输入数组{2,3,4,2,6,2,5,1}及滑动窗口的大小3，那么一共存在6个滑动窗口，他们的最大值分别为{4,4,6,6,6,5}； 
// 针对数组{2,3,4,2,6,2,5,1}的滑动窗口有以下6个： 
// {[2,3,4],2,6,2,5,1}， {2,[3,4,2],6,2,5,1}， {2,3,[4,2,6],2,5,1}， 
// {2,3,4,[2,6,2],5,1}， {2,3,4,2,[6,2,5],1}， {2,3,4,2,6,[2,5,1]}。

// 解法1 我自己的解法，普通的双指针解决滑动窗口问题

// leetcode 效率：时间效率击败了16%，空间效率击败了45%

function maxInWindows(num, size)
{
    // write code here
    if(!num || num.length === 0 || size <= 0) return [];
    let result = [];
    if(size === 1) return num;
    let step = size - 1;
    let l = 0, r = l, tmpMax = num[l];
    while(l <= (num.length - size) && r - l < step) { // [l, r]
        // console.log('1', l, r, tmpMax)
        r++;
        if(num[r] > tmpMax) {
            tmpMax = num[r];
        }
        // console.log('2', l, r, tmpMax)
        if(r - l === step) {
            l++;
            r = l;
            result.push(tmpMax);
            tmpMax = num[l];
        }
        // console.log('3', l, r, tmpMax)
    }
    return result;
}

// 解法2 本题的最佳思路 双端队列(有些难理解)

//时间复杂度o（n），空间复杂度为o（n）


//   双端队列，队列中的头节点保存的数据是最大值
//   假如当前的数据比队尾的数字大，说明当前这个数字最起码在从现在起到后面的过程中可能是最大值
//   ，而之前队尾的数字不可能最大了，所以要删除队尾元素。
//   此外，还要判断队头的元素是否超过size长度，由于存储的是下标，所以可以计算得到；
//   特别说明，我们在双端队列中保存的数字是传入的向量的下标；

function maxInWindows(num, size)
{
    // write code here
    if(!num || num.length === 0 || size <= 0 || num.length < size) return [];
    let result = [];
    let winIndex = []; // 双向队列存放数组下标
    // 处理前 size 个数据,队列头就是该滑动窗的最大值
    // 此时不把滑动窗口的最大值压入结果
    for(let i = 0; i < size; i++) {
        // 如果winIndex非空，并且新添加的数字大于等于队列中最小的数字，则删除队列中最小的数字
        while(winIndex.length !== 0 && num[i] >= num[winIndex[winIndex.length - 1]]) {
            winIndex.pop();
        }
        winIndex.push(i);
    }
    // 处理 size 之后的数据
    // j 相当于滑动窗口的后移指针
    for(let j = size; j < num.length; j++) {
        // console.log('1',winIndex, num[winIndex[0]])
        result.push(num[winIndex[0]]);
        
        while(winIndex.length > 0 && num[j] >= num[winIndex[winIndex.length - 1]]) {
            winIndex.pop();
        }
        // 判断队头的下标是否超出 size 大小，如果超过，要删除队头元素
        if(winIndex.length > 0 && winIndex[0] < (j - size + 1)) {
            winIndex.shift();
        }
        winIndex.push(j);
        // console.log('2',winIndex, num[winIndex[0]])
    }
    // 由于每次都是指针移位后的第一步压入最大值，最后一个滑动窗的最大值还没被压入
    // 需要补充一次
    result.push(num[winIndex[0]]);
    
    return result;
}