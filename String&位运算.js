// 不用加减乘除做加法
// 写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。


// 注意运算符均为单目运算！！

function Add(num1, num2)
{
    // write code here
    // 明显的位操作题目
    
    // 直至无进位时跳出循环
    let tmp = 0;
    while(num1) {
        tmp = num1 ^ num2; // 不考虑进位加，异或实现
        num1 = (num1 & num2) << 1; // 考虑进位，按位与并左移得到进位值
        num2 = tmp;
    }

    return num2; 
}

// 求1+2+3+...+n
// 求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。

function Sum_Solution(n)
{
    // write code here
    return n && (n + Sum_Solution(n-1));
}