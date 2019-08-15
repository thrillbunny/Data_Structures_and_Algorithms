// 用两个栈实现队列
var stack1 = [], stack2 = [];
function push(node)
{
    // write code here
    stack1.push(node);
}
function pop()
{
    // write code here
    // stack2 出数顺序就是队列出数的顺序，所以如果 stack2 中已有数值要先出去
    // 这点要特别注意
    if(stack2.length > 0) {
        return stack2.pop();
    } else {
        if(stack1.length === 0) {
            return null;
        } else {
            // stack1 出栈入 stack2 
            // stack2 出栈
            while(stack1.length > 0) {
                stack2.push(stack1.pop());
            }
            return stack2.pop();
        }        
    }
}

// 包含min函数的栈
// 定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。

// 注意这道题的时间复杂度，题目的意思应该是用一个辅助栈
// 方法1 
var stack = [];
function push(node)
{
    // write code here
    stack.push(node);
}
function pop()
{
    // write code here
    if(stack.length === 0) {
        return null;
    }
    return stack.pop();
}
function top()
{
    // write code here
    return stack.length === 0 ? null : stack[0];
}
function min()
{
    // write code here
    // 时间复杂度O(1)
    // 也就是耗时/耗空间与输入数据大小无关，无论输入数据增大多少倍，耗时/耗空间都不变。 
    return Math.min(...stack);
}

// 方法2 辅助栈
var stack = [], stackMin = [];
// 如果 stackMin 为空，直接将 node 压栈
// 否则比较 stackMin 栈顶元素（此元素必为之前已压入 stack 中的最小值）
// 如果 node < 则压入 stackMin 栈
function push(node)
{
    // write code here
    stack.push(node);
    if(stackMin.length === 0) {
        stackMin.push(node);
    } else {
        let tmp = stackMin[stackMin.length - 1];
        if(node < tmp) {
            stackMin.push(node);
        }
    }
}
// pop 需要注意 stackMin 中的数要对应出栈，否则影响最小值的结果
// stackMin 一定是个金字塔形状的栈
function pop()
{
    // write code here
    if(stack.length === 0) {
        return null;
    }
    let popNum = stack.pop();
    if(popNum === stackMin[stackMin.length - 1]) {
        stackMin.pop();
    }
    return popNum;
}
function top()
{
    // write code here
    return stack.length === 0 ? null : stack[stack.length - 1];
}
// stackMin 栈顶元素必为已压入 stack 中的最小值）
function min()
{
    // write code here
    // 时间复杂度O(1)
    // 也就是耗时/耗空间与输入数据大小无关，无论输入数据增大多少倍，耗时/耗空间都不变。 
    return stackMin[stackMin.length - 1];
}

// 栈的压入、弹出序列
// 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。
// 假设压入栈的所有数字均不相等。
// 例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。
// （注意：这两个序列的长度是相等的）

function IsPopOrder(pushV, popV)
{
    // write code here
    let stack = [];
    let pushLength = pushV.length, popLength = popV.length;
    if(pushLength !== popLength) {
        return false;
    }
    let index = 0;
    for(let i = 0; i < pushLength; i++) {
        stack.push(pushV[i]); // 入栈
        
        // 判定栈顶元素与 popV数组 index 指向元素是否一致
        // 直至栈元素为空（即全部一致）或者有不一致的
        while(stack[stack.length - 1] === popV[index] && stack.length > 0) {
            index++; 
            let tmp = stack.pop(); // 压入辅助栈的元素要出栈
            // console.log(tmp, index)
        }
    }
    
    // 根据辅助栈是否为空得到结果
    return stack.length > 0 ? false : true;
}


// leetcode 20


// leetcode 150

// leetcode 75