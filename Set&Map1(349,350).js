//ES6标准引入了iterable类型，Array、Map、Set都属于iterable类型
//具有iterable类型的集合可以通过新的for ... of循环来遍历

//349两个数组的交集
//set特性：元素唯一
var intersection = function(nums1, nums2) {
    var inter = new Set();
    var nums1 = new Set(nums1), nums2 = new Set(nums2);
    for(var i of nums2){
        if(nums1.has(i)){
            inter.add(i);
        }
    }
    return [...inter];
};
//解法2，利用索引
var intersection = function(nums1, nums2) {
    var short = (nums1.length > nums2.length ? nums2 : nums1);
    var long = (nums1.length > nums2.length ? nums1 : nums2);
    var result = [];
    for(var i of short){
        if(long.indexOf(i) >= 0){
            if(result.indexOf(i) < 0){
                result.push(i);
            }
        }
    }
    return result;
};

//350两个数组的交集 II
//map
var intersect = function(nums1, nums2) {
    var record = new Map(); //var record = {} ,采用Object
    for(var i of nums1){ //for...of迭代元素
        if(record[i]) {
            record[i]++;
        } 
        else{
            record[i] = 1;
        }
    }
    var result = [];
    for(var j of nums2){
        if(record[j]-- > 0){
            result.push(j);
        }
    }
    return result;
};
//解法2，利用索引
var intersect = function(nums1, nums2) {
    var short = (nums1.length > nums2.length ? nums2 : nums1);
    var long = (nums1.length > nums2.length ? nums1 : nums2);
    var result = [];
    for(var i of short){
        var iIndex = long.indexOf(i);
        if(iIndex >= 0){
            result.push(i);
            long.splice(iIndex , 1);
        }
    }
    return result;   
};