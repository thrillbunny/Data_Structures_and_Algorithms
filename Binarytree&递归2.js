// 难度 up
// 257(有讲解)






// 113









// 129




// 难度 up up

// 437(有讲解)




// BST

// 235(有讲解)

// 98

// 450(难)

// 108

// 230

// 236(LCA，难)


// 二叉树遍历的非递归实现 - 栈

// 二叉搜索树的第k个结点
// 给定一棵二叉搜索树，请找出其中的第k小的结点。
// 例如， （5，3，7，2，4，6，8） 中，按结点数值大小顺序第三小结点的值为4。

// 方法1 非递归中序遍历（根节点入栈）

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

function KthNode(pRoot, k)
{
    // write code here
    // BST 性质，中序遍历到的第 k 个节点就是结果
    if(pRoot === null || k === 0) return null;
    let count = 0;
    let stack = [];
    while(pRoot !== null || stack.length !== 0) {
        while(pRoot) {
            stack.push(pRoot);
            pRoot = pRoot.left;
        } 
        pRoot = stack.pop();
        count++;
        if(count === k) {
            return pRoot;
        }
        pRoot = pRoot.right;
    }
    return null;
}

// 方法2 递归中序遍历
// 咋做都不对，还是要搞个二叉树测试下
// 先把错误的版本贴这，思路是对的

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
var count = 0;
function KthNode(pRoot, k)
{
    // write code here
    // BST 性质，中序遍历到的第 k 个节点就是结果
    if(pRoot === null || k === 0) return null;
    
    return KthHelp(pRoot, k);
}

function KthHelp(root, k) {
    if(root) {
        KthHelp(root.left, k);

        count++; console.log(count, root.val)
        if(count === k) return root;

        KthHelp(root.right, k);
    }
    
    return null;
}

// leetcode 上改了改，但是测试明明是对的，提交了还是报错
// 还是之后自己建树检查吧

var count = 0;
var result;
var kthSmallest = function(root, k) {
    if(root === null || k <= 0) return null;

    KthHelp(root, k);
    
    return result;
};

var KthHelp = function(root, k) {
    if(!root) return null;

    KthHelp(root.left, k);

    count++; // console.log(count, root.val)
    if(count === k) result = root.val;

    KthHelp(root.right, k);

}

// 数据流中的中位数

// 这道题考察的是树，应该就是在 insert(num) 时建立一个AVL平衡二叉搜索树
// 如果插入奇数个 num，则返回根节点的值
// 如果插入偶数个 num，则返回根结点左子数或右子数中个数较多的子树中选出最大（左子树）或最小值（右子树）
// 但是平衡二叉搜索树的建立太难了，还需要考虑RR、RL、LR和LL情况
 
// 方法 1
// 看了评论还有用堆实现的，不过堆我还没复习到暂时就用最最最简单的方法来做吧，因为js里面 sort() 是优化过的，速度也很快……
let arr = [];
function Insert(num)
{
    // write code here
    arr.push(num);
    return arr;
}
function GetMedian(){
    // write code here
    arr.sort();
    let length  = arr.length;
    return length % 2 === 1 ? arr[Math.floor(length / 2)] : (arr[length / 2] + arr[length / 2 - 1]) / 2;
}

// 方法 2(难)







// 二叉树的下一个节点

// 给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。
// 注意，树中的结点不仅包含左右子结点，同时包含指向父结点的指针。

/*function TreeLinkNode(x){
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null; // 这个实际指向的是 parent
}*/
function GetNext(pNode) // pNode 是给定的节点而不是根节点，所以不能用遍历法暴力实现了
{
    // write code here
    // 分析以下几种情况：(这道题建议先画一根树分析)
    // 1. 节点有右子树，则下一节点就是右子树的第一个节点(最后一个左节点)
    // 2. 节点没有右子树，此时又可以分为两种情况
    // 2.1 节点是父节点的左节点（简单情况），下一节点是父节点
    // 2.2 节点是父节点的右节点，向上遍历父节点，
    // 直到找到一个前辈节点是其父节点的左节点或父节点为空时停止
    
    if(!pNode) return null;
    
    if(pNode.right) { // 节点有右子树
        let tmp = pNode.right;
        while(tmp.left) {
            tmp = tmp.left;
        }
        return tmp;
    }
    
    // 无右子树，向上遍历查找其父节点、爷爷节点...
    while(pNode.next && pNode.next.left !== pNode) {
        pNode = pNode.next;
    }
    return pNode.next; // 注意最后的返回值是探查节点的父亲节点
}



// 二叉搜索树与双向链表
// 输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新的结点，只能调整树中结点指针的指向。

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Convert(pRootOfTree)
{
    // write code here
    // 排序的双向链表 - 中序遍历
    if(!pRootOfTree) return null;
    let stack = [];
    let pre = null; // 记录
    let Root = null;
    while(pRootOfTree || stack.length !== 0) {
        while(pRootOfTree) {
            stack.push(pRootOfTree);
            pRootOfTree = pRootOfTree.left;
        }
        pRootOfTree = stack.pop();
        
        if(Root === null) { 
            Root = pRootOfTree; // 中序遍历的第一个点作为根节点返回
            pre = pRootOfTree;
        } else {
            pre.right = pRootOfTree; // 先前保存的节点和刚刚出栈的节点互相指向
            pRootOfTree.left = pre;
            pre = pRootOfTree;
        }
        
        pRootOfTree = pRootOfTree.right;
    }
    return Root;
}