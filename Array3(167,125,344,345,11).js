//对撞指针
//167两数之和 II - 输入有序数组
var twoSum = function(numbers, target) {
    /*
    //速度慢
    var index = [];
    for(var i = 0; i < (numbers.length - 1); i++){
        var r = target - numbers[i];
        var rIndex = numbers.indexOf(r , i+1);//stringObject.indexOf(searchvalue,fromindex)
        if(rIndex > i){
            index = [i+1 , rIndex+1];
            return index;
        }
    }
    */
    //对撞指针,效率提升，时间复杂度O(n)，空间复杂度O(1)
    var index = [];
    var lIndex = 0, rIndex = numbers.length - 1;
    while(lIndex < rIndex){
        if(numbers[lIndex] + numbers[rIndex] === target){
            index = [lIndex + 1, rIndex + 1];
            return index;
        }
        else if(numbers[lIndex] + numbers[rIndex] < target){
            lIndex ++;
        }
        else{
            rIndex --;
        }
    }
};

//125验证回文串
//console打印真的好浪费时间，不加打印80ms，加了800ms
var isPalindrome = function(s) {
    if (s === ""){return true;}
    //正则表达式匹配最优，顺便有些程序是列举非数组字母字符的，太扯了，排除法比较好，还是要去读一下那本正则表达式的书
    s = s.replace(/[^0-9a-zA-Z]/ig , "").toLowerCase();
    var l = 0, r = s.length - 1;
    while(l < r){
        if(s[l] != s[r]){
            return false;
        }
        l++;
        r--;
    }
    return true;
};

//344反转字符串
var reverseString = function(s) {
    //JS内置函数
    s = s.split("");
    //s.reverse();
    var l = 0, r = s.length-1;
    while(l < r){
        var temp = s[l];
        s[l++] = s[r];
        s[r--] = temp;
    }
    s = s.join("");
    return s;
    //pipe式写法到底哪些标准里存在？
    //return s.split("").reverse().join("");
};

//345反转字符串中的元音字母
var reverseVowels = function(s) {
    var vowel = ["a" , "e" , "i" , "o" , "u"];
    s = s.split(""); 
    //也可以不转换为数组，通过正则表达式和slice切片来组装成新字符串
    //s = s.slice(0,i) + s[j] + s.slice(i+1,j) + s[i] + s.slice(j+1)(未测试)
    var l = 0 , r = s.length - 1;
    while(l < r){
        var lIndex = vowel.indexOf(s[l].toLowerCase()) , //注意大小写
            rIndex = vowel.indexOf(s[r].toLowerCase());
        if(lIndex >= 0 && rIndex >= 0){
            var temp = s[l];
            s[l++] = s[r]; //注意双指针的移动，否则可能会无限循环
            s[r--] = temp;
        }
        if(lIndex < 0){ 
            l++;
        }
        if(rIndex < 0){
            r--;
        }
    }
    s = s.join("");
    return s;
};

//11盛最多水的容器
//做这道题时我有一个误区，把Index和height[Index]概念混淆了，在写程序前就要整理清楚这些基本关系
var maxArea = function(height) {
    var l = 0, r = height.length - 1;
    var max = Math.min(l , r)*(r - l);
    //指向较短线段的指针向较长线段那端移动
    while(l < r){
        var temp = Math.min(height[l] , height[r])*(r - l);
        max = (temp > max ? temp : max);
        if(height[l] <= height[r]){
            l++;
        }
        else{
            r--;
        }
    }
    return max;
};