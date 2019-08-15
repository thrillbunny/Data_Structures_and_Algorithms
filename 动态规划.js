// FindGreatestSumOfSubArray
// 连续子数组的最大和

// 思路1
function FindGreatestSumOfSubArray(array)
{
    // write code here
    // 动态规划问题
    // 时间复杂度O(n)
    // {6,-3,-2,7,-15,1,2,2} 为例
    // F(i) 为以array[i]为连续数组的最大值
    // F(i) = max(F(i-1)+array[i], array[i])
    // 即以array[i-1]为连续数组的最大值+array[i]反而比array[i]自己小，就将前面的累加值舍去
    // result 为所有连续子数组和的最大值，需要实时更新保存最大值
   if(array === null) {
       return null;
   }
    let f = array[0]; // 连续数组和的最大值
    let result = array[0]; // 最大值结果
    for(let i = 1; i < array.length; i++) {
        f = Math.max(f + array[i], array[i]);
        result = Math.max(f, result);
    }
    return result;
}

// 思路2 非动态规划解法，可变动步长
function FindGreatestSumOfSubArray(array)
{
   if(array === null) {
       return null;
   }
    let sum = array[0], maxSum = array[0];
    for(let i = 1; i < array.length; i++) {
        if(sum < 0) { // 上一次累加结果 < 0, 继续累加无意义
            sum = array[i];
        } else {
            sum += array[i];
        }
        
        if(sum > maxSum) { // 判定是否需要更新结果值
            maxSum = sum;
        }
    }
    return maxSum;
}