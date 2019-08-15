//283移动零
var moveZeroes = function(nums) {
    var length = nums.length;
    var k = 0 , temp;
    for(var i = 0 ; i < length ; i++){//i指针遍历数组
        if(nums[i]){
            if(!nums[k] && i != k){
                nums[k] = nums.splice(i, 1, nums[k])[0]; //或采用经典算法
                k++;
            }
            else{
                k++;
            }
        }
    }
};

//27移除元素
var removeElement = function(nums, val) {
    /*
    //javascript方法
    while(nums.indexOf(val) != -1 ){
        nums.splice(nums.indexOf(val), 1);   
    };
    return nums.length;
    */
    /*
    //通用方法，两指针,均指向开头
    var j = 0, length = nums.length;
    for(var i = 0; i < length; i++){
        if(nums[i] !== val){
            nums[j] = nums[i];
            j++;
        }
    }    
    return j;
    */
    //通用方法，两指针,一个指向开头，一个结尾
    //[0,length-1]用<=,[0,length)用<,边界问题用数学思想思考
    var i = 0, j = nums.length-1;
    while(i <= j){
        if(nums[i] !== val){
            i++;
        }
        else{
            nums[i] = nums[j];
            j--;
        }
    }
    return ++j;
};

//26删除排序数组中的重复项
var removeDuplicates = function(nums) {
    //暂时没想出不需要消耗额外空间的更好方法
    var length = nums.length;
    for(var i = 0 ; i < length-1 ; i++){
        for(var j = i+1 ; j < length ; ){
            if(nums[i] === nums[j]){
                for(var k = j ; k < length ; k++){
                    nums[k] = nums[k+1];
                }
                length--;
            }
            else{
                j++;
            }
        }
    }
    return length;
};

//80删除排序数组中的重复项 II
var removeDuplicates = function(nums) {
    //暂时没想出不需要消耗额外空间的更好方法
    var length = nums.length , count;
    for(var i = 0 ; i < length-1 ; i++){//与26题比增加了一个计数器
        count = 1;
        for(var j = i+1 ; j < length ; ){
            if(nums[i] === nums[j]){
                count++;
                if(count > 2){
                    for(var k = j ; k < length ; k++){
                        nums[k] = nums[k+1];
                    }
                    length--;
                }
                else{
                    j++;//注意这里的指针移位，避免停滞
                }
            }
            else{
                j++;
            }
        }
    }
    return length;    
};


