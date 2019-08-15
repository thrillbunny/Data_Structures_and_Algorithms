//75颜色分类
var sortColors = function(nums) {
    /*
    //计数法
    var count = [0, 0, 0];
    for(var i = 0; i < nums.length; i++){
        if(nums[i] > 2) continue;
        count[nums[i]]++;
    }
    nums.length = 0;//清空数组
    //另一种据说效率更高的方法nums=[],但这里无用，还有一种splice(0,nums.length)
    for(var j = 0; j <= 2; j++){
        for(var k = 0; k < count[j]; k++){
            nums.push(j);
        }
    }    
    return nums;
    */
   //[0,zero],[zero+1,two),[two,nums.length-1]
   var zero = -1, two = nums.length;//注意指针指向
   var i;//自由指针
   var temp;
   for(i = (zero+1); i < two; ){
       if(nums[i] === 1){
           i++;
       }
       else if(nums[i] === 0){
           zero++;
           if(i !== zero){
               temp = nums[zero];
               nums[zero] = nums[i];
               nums[i] = temp;
           }
           else{
               i++; //这句很重要！
           }
       }
       else if(nums[i] === 2){
           two--;
           temp = nums[i];
           nums[i] = nums[two];
           nums[two] = temp;            
       }
       console.log(zero,two,i,nums);
   }
   return nums;
};

//88合并两个有序数组
var merge = function(nums1, m, nums2, n) {
    /*
    //es6语法,便捷行为，但不符合视频老师的出题意图
    var length = nums1.length - m;
    nums1.splice(m, length, ...nums2);
    return nums1.sort((a,b) => {return a-b;});
    */
   var i = m-1, j = n-1 , k = (m + n -1);
   while(i >= 0 && j >=0){
       if(nums2[j] >= nums1[i]){
           nums1[k--] = nums2[j];
           j--;
       }
       else{
           nums1[k--] = nums1[i];
           i--;
       }
       //console.log(i,j,k,nums1);
   }
   //j < 0说明数字全部就位，i < 0说明数组有位置没填满
   if(i < 0){
       for(i = 0; i <= j; i++){
           nums1[i] = nums2[i];
       }
   } 
};

//215数组中的第K个最大元素
var findKthLargest = function(nums, k) {
    //es6,冒泡排序
    nums.sort((a,b) => {return b-a;});
    return nums[k - 1];
};
