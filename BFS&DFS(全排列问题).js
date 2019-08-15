// 难题
// dfs 回溯
// 回溯法是暴力解法的一个主要方式
// 树形问题

// 基本只知道个思路
// 字符串的全排列

// 输入一个字符串,按字典序打印出该字符串中字符的所有排列。
// 例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。

// 先学习下非递归方法，非常有技巧性，绝对想不到的我自己

// 1. 非递归方法（字典序法）：
// 　　对给定的字符集中的字符规定了一个先后关系，在此基础上规定两个全排列的先后是从左到右逐个比较对应的字符的先后。

// 　[例]字符集{1,2,3},较小的数字较先,这样按字典序生成的全排列是:

//      　　　　123,132,213,231,312,321
// 　　※ 一个全排列可看做一个字符串，字符串可有前缀、后缀。

// 　　生成给定全排列的下一个排列.所谓一个的下一个就是这一个与下一个之间没有其他的。这就要求这一个与下一个有尽可能长的共同前缀，也即变化限制在尽可能短的后缀上。

// 如 839647521是1--9的排列。1—9的排列最前面的是123456789，最后面的987654321，从右向左扫描若都是增的，就到了987654321，也就没有下一个了。否则找出第一次出现下降的位置。

// 【例】 一般而言，设P是[1,n]的一个全排列。
// 　　　　　　P=P1P2…Pn=P1P2…Pj-1PjPj+1…Pk-1PkPk+1…Pn
// 　　　　find:　　j=max{i|Pi<Pi+1}
// 　　　　　　　　　k=max{i|Pi>Pj}
// 　　　　　　1，  对换Pj，Pk，
// 　　　　　　2，  将Pj+1…Pk-1PjPk+1…Pn翻转
//           P’= P1P2…Pj-1PkPn…Pk+1PjPk-1…Pj+1即P的下一个

// 【例】 如何得到346987521的下一个
//     1，从尾部往前找第一个P(i-1) < P(i)的位置
//             3 4 6 <- 9 <- 8 <- 7 <- 5 <- 2 <- 1
//         最终找到6是第一个变小的数字，记录下6的位置i-1
//     2，从i位置往后找到最后一个大于6的数
//             3 4 6 -> 9 -> 8 -> 7 5 2 1
//         最终找到7的位置，记录位置为m
//     3，交换位置i-1和m的值
//             3 4 7 9 8 6 5 2 1
//     4，倒序i位置后的所有数据
//             3 4 7 1 2 5 6 8 9
//     则347125689为346987521的下一个排列

// 2. 递归写法
// 这是一道经典的DFS题目，利用回溯的思想找到一个字符数组的全排列，并完成去重与字典序排序操作。

// 大致思想便是，先确定第i个字符（从i到最后完成遍历枚举），然后对i+1-N-1个字符递归使用全排列（缩小范围），这便是dfs。
// 但因为DFS过程必须向后序递归过程传递剩下的字符，那么如何传递呢？ 
// 每一次确定字符后，将剩余字符装入一个容器中，传递下去。但这样会增加许多拷贝遍历操作，极其麻烦。
// 另一种方法，便是将确定的字符与当前第 i个字符相交换，然后i+1-N-1依然是剩下的字符。 
// 但是要注意，这样做改变了字符数组，必须进行完一次dfs过程后，将数组复原，便于确定i位置其他元素时，不会受到影响。 

// 简单来说就是
// 固定第一个字符，递归取得第一个字符后面的各种字符串组合；
// 再把第一个字符与后面每一个字符交换，并同样递归获得收尾后面的字符串组合；
// 递归的出口为当只有一个字符的时候 

function Permutation(str)
{
    // write code here
    if(!str || str.length === 0) return [];
    if(str.length === 1) return [str];
    
    let letters = str.split('');
    
    let result = [];
    findPermutation(result, letters, 0);
    
    // 按字典序输出
    result.sort();
    return result;
}

// 对 letters 中 [index, str.length - 1] 的数完成全排列并加入到 result 中
function findPermutation(result, letters, index) { // 递归
    // 下标移动到了 letters 末尾，递归终止
    if(index === letters.length - 1) {
        result.push(letters.join(''));
        return;
    }
    for(let i = index; i < letters.length; i++) {
        if(letters[i] === letters[index] && i != index) {
            // 重复字母
            continue;
        }
        [letters[index], letters[i]] = [letters[i], letters[index]];
        //确定好index位置，对letters[index+1~length-1]范围内的字符数组完成全排列
        findPermutation(result, letters, index + 1); 
        // 恢复原数组，防止重复
        // 这步非常重要
        [letters[index], letters[i]] = [letters[i], letters[index]];
    }
}

// 写法2 利用了数组切割
function Permutation(str)
{
    // write code here
    if(!str || str.length === 0) return [];
    if(str.length === 1) return [str];
    let result = [];
    let arr = str.split('');
    let strTemp = '';
    permutationDFS(result, arr, strTemp);
    return result;

}
function permutationDFS(result, arr, strTemp){
    if(arr.length === 0){
        result.push(strTemp);
    }else{
        let isRepeated = {};
        for(let i=0;i<arr.length;i++){
            if(!isRepeated[arr[i]]){
                let p = arr.splice(i,1)[0];
                strTemp += p;
                permutationDFS(result,arr,strTemp);
                arr.splice(i,0,p);
                strTemp = strTemp.slice(0,strTemp.length-1);
                isRepeated[p] = true;
            }
        }
    }

}

// 类似题目：

// 1、输入一个含有8个数字的数组，判断有么有可能把这8个数字分别放到正方体的8个顶点上，使得正方体上三组相对的面上的4个顶点的和相等。

//  思路：相当于求出8个数字的全排列，判断有没有一个排列符合题目给定的条件，即三组对面上顶点的和相等。

// 2、N皇后问题：在8 X 8的国际象棋上摆放八个皇后，使其不能相互攻击，即任意两个皇后不得处于同一行，同一列或者同意对角线上，求出所有符合条件的摆法。

// 思路：由于8个皇后不能处在同一行，那么肯定每个皇后占据一行，这样可以定义一个数组A[8]，数组中第i个数字，即A[i]表示位于第i行的皇后的列号。
// 先把数组A[8]分别用0-7初始化，接下来对该数组做全排列，由于我们用0-7这7个不同的数字初始化数组，因此任意两个皇后肯定也不同列，
// 那么我们只需要判断每个排列对应的8个皇后中是否有任意两个在同一对角线上即可，
// 即对于数组的两个下标i和j，如果i-j==A[i]-A[j]或i-j==A[j]-A[i]，则认为有两个元素位于了同一个对角线上，则该排列不符合条件。





// 二叉树中和为某一值的路径
// 输入一颗二叉树的跟节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。
// 路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。(注意: 在返回值的list中，数组长度大的数组靠前)

// 其实和上一道题是一样的

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function FindPath(root, expectNumber)
{
    // write code here
    var listAll = [], list = [];
    
    if(root == null) {
        return listAll;
    }
    
    FindPathHelp(root, expectNumber, list, listAll);
    
    return listAll;
}

function FindPathHelp(root, expectNumber, list, listAll) {
    list.push(root.val);

    if(root.val == expectNumber && root.left == null && root.rigth == null) {
        // 已经跑到了叶子节点了
        // 路径走完，压入结果数组

        // 这步我想不明白，直接压入 list 为什么就不行了？
        // 看了一篇博文，才发现问题所在
        // 我自己也写过一篇博客，讲的就是js中的传值方式
        // 所以 list 传值其实是引用传递
        listAll.push(Array.of(...list)); // list.slice(0) 也可以，为什么
    } else {
        var newExpextNum = expectNumber - root.val;
        if(root.left) {
            FindPathHelp(root.left, newExpextNum, list, listAll);
        }
        if(root.right) {
            FindPathHelp(root.right, newExpextNum, list, listAll);
        }
    }
    list.pop(); // dfs 遍历完一条路径后出栈
}

// leetcode 17
// 时间复杂度 3^n = O(2^n) 最多处理 n = 20

// leetcode 93

// leetcode 131

// 回溯-排列
// leetcode 17(无重复数)


// leetcode 47(有重复数)

// 回溯-组合(顺序不重要)
// leetcode 77
// 可以优化剪枝

// leetcode 39

// leetcode 40

// leetcode 216

// leetcode 78

// leetcode 90(难一些)

// leetcode 401(难)

// 回溯-二维平面

// 机器人的运动范围
// 地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，
// 但是不能进入行坐标和列坐标的数位之和大于k的格子。 
// 例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。
// 但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？

// 本题对移动顺序不作约束，但可能会有题目需要顺时针/逆时针移动
let m = [[1, 0], [0, 1], [-1, 0], [0, -1]]; 

function movingCount(threshold, rows, cols)
{
    // write code here
    if(threshold < 0 || rows <= 0 || cols <= 0) return 0;
    // 题目问的是机器人能够到达的格子数，而不是机器人可能走过的路径
    // 将所有格子置 false,机器人经过就置 true
    let coord = [];
    for(let i = 0; i < rows; i++) {
        coord[i] = [];
        for(let j = 0; j < cols; j++) {
            coord[i][j] = false;
        }
    }

    // 机器人能够上下左右移动，每次移动一格，所以每次 x 和 y 只能有一个值改变
    // 值可以 +1 或 -1 或 0
    return movingHelp(threshold, rows, cols, 0, 0, coord);
}

function movingHelp(threshold, rows, cols, x, y, coord) {
    if(x < 0 || y < 0 || 
       x >= rows || y >= cols || 
       coordinateSum(x, y) > threshold ||
       coord[x][y] === true) {
        return 0;
    } // 设置递归返回条件
    // 标记已经访问的点坐标
    // 这里的标记不需要重置，只需判定坐标是否被访问过即可
    coord[x][y] = true; 
    return 1 + // 访问点 + 1
        movingHelp(threshold, rows, cols, x + m[0][0], y + m[0][1], coord) +
        movingHelp(threshold, rows, cols, x + m[1][0], y + m[1][1], coord) +
        movingHelp(threshold, rows, cols, x + m[2][0], y + m[2][1], coord) +
        movingHelp(threshold, rows, cols, x + m[3][0], y + m[3][1], coord);
}

function coordinateSum(x, y) {
    let sum = 0;
    while(x !== 0) {
        sum += x % 10;
        x = parseInt(x / 10);
    } 
    while(y !== 0) {
        sum += y % 10;
        y = parseInt(y / 10); 
    }
    return sum;
}

// 矩阵中的路径
// 请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。
// 路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。
// 如果一条路径经过了矩阵中的某一个格子，则之后不能再次进入这个格子。 
// 例如 a b c e s f c s a d e e 这样的3 X 4 矩阵中包含一条字符串"bcced"的路径，
// 但是矩阵中不包含"abcb"路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。

// 和上道题差不多，注意每次递归开始都要进行 矩阵数据 和 字符串 数据的判定
// 字符串也注意移位和长度

let m = [[1, 0], [0, 1], [-1, 0], [0, -1]]; 

function hasPath(matrix, rows, cols, path)
{
    // write code here
    if(!path || rows <= 0 || cols <= 0) {
       return false;
    }
    // 初始化矩阵格子为 false
    let coord = [];
    for(let i = 0; i < rows; i++) {
        coord[i] = [];
        for(let j = 0; j < cols; j++) {
            coord[i][j] = false;
        }
    }
    
    for(let m = 0; m < rows; m++) {
        for(let n = 0; n < cols; n++) {
            // 设置递归不同起始点
            if(hasPathHelper(matrix, rows, cols, m, n, coord,  path, 0)) {
                return true;
            }
        } 
    }
    return false;
}

// x, y 矩阵坐标
// k 字符串指针
// matrix 是一个一维字符串数组？
function hasPathHelper(matrix, rows, cols, x, y, coord, path, k) {
    if(x < 0 || y < 0 || x >= rows || y >= cols 
       || coord[x][y] === true || matrix[x * cols + y] !== path[k]) { // 这里 matrix[x * cols + y] 开始写错了
        return false;
    } // 递归终止条件
    
    // 标记已经访问过的格子
    coord[x][y] = true;
    
    // 字符串已经检验到最后一个字母了
    // 树剪枝
    if(k === path.length - 1) {
        return true;
    }
    
    // 上下左右有一条路返回 true 就为 true
    if(hasPathHelper(matrix, rows, cols, x + m[0][0], y + m[0][1], coord, path, k + 1) ||
       hasPathHelper(matrix, rows, cols, x + m[1][0], y + m[1][1], coord, path, k + 1) ||
       hasPathHelper(matrix, rows, cols, x + m[2][0], y + m[2][1], coord, path, k + 1) ||
       hasPathHelper(matrix, rows, cols, x + m[3][0], y + m[3][1], coord, path, k + 1)) {
        return true;
    }
    
    // 回溯
    coord[x][y] = false;
    
    return false;
}


// 和上道题差不多

// leetcode 79

// 下面三道是 floodfill 算法，有点儿难啊
// leetcode 200

// leetcode 130(???)

// leetcode 417