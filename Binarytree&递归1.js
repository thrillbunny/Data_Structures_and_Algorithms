// es6 yield 实现中序遍历
function Tree(left, node, right) {
    this.left = left;
    this.node = node;
    this.right = right;
}
// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用 generator 函数。
// 函数体内采用递归算法，所以左树和右树要用 yield* 遍历
function* inorder(t) {
    if(t) {
        yield* inorder(t.left);
        yield t.node;
        yield* inorder(t.right);
    }
}
// 生成二叉树
function make(array) {
    if(array.length === 1) return new Tree(null, array[0], null);
    return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}

result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']

// 二叉树递归最重要的是递归终止条件和返回值

// 104 二叉树的最大深度

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if(root == null) {
        return 0;
    }
    
    // root 叶子节点判定,是叶子节点则只返回自身的深度
    if(root.left == null && root.right == null) {
        return 1;
    }
    
    // 设定返回值为左右子树中深度最大的值 + 1（root自身）
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1 ;
};

// 一行代码实现（递归探究的层数比上一方法深一层）

var maxDepth = function(root) {
    return root == null ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};





// 111 二叉树的最低深度

// 本题需要注意的是，在左子树或是右子树为空时，计算的是不为空的子树高度为最小高度

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    if(root == null) {
        return 0;
    }
    
    // root 叶子节点判定,是叶子节点则只返回自身的深度
    if(root.left == null && root.right == null) {
        return 1;
    }
    
    // 左子树或右子树有一边为空时，计算不为空的子树最小深度（本题的坑）
    if(root.left == null) {
        return minDepth(root.right) + 1 ;
    }
    if(root.right == null) {
        return minDepth(root.left) + 1 ;
    }
    
    // 设定返回值为左右子树中深度最大的值 + 1（root自身）
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1 ;
};






// 226 翻转一棵二叉树

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

// 这里用了 es6 互换
var invertTree = function(root) {
    // 空节点直接返回 null
    if(root == null) {
        return null;
    }
    

    // 对换左右节点(值和指针)(null也需要对换)
    // es6
    [root.left, root.right] = [root.right, root.left];

    // 递归对换左右子树
    root.left = invertTree(root.left);
    root.right = invertTree(root.right);

    return root;
};

// 或者不采用 es6 方法
var invertTree = function(root) {

    if (root !== null) {
        
        var temp = root.left;
        root.left = root.right;
        root.right = temp;
          
        root.left = invertTree(root.left); 
        root.right = invertTree(root.right);
    }
    
    // root 若等于 null 就直接返回 null， 不为 null 返回 root 节点
    return root;
};






// 100 相同的树

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if(p == null && q == null) { // 递归探寻到最底层了，返回 true
        return true;
    }
    
    if(p != null && q != null && p.val == q.val) {
        
        return (isSameTree(p.left, q.left)) && (isSameTree(p.right, q.right));

    } else {
        
        return false; // 有任意一个值不等或为空，返回 false
    }
};





// 101 对称二叉树

// 方法1 递归

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if(root == null) { // 递归探寻到最底层了，返回 true
        return true;
    }
    
    return isCheck(root.left, root.right);
    
}

function isCheck(left, right) {
    
    if(left == null && right == null) { return true; } // 这个判定要放到前面，否则会覆盖后一个判定导致输出永远为 false
    
    if(left == null || right == null) { return false; }
    
    if(left.val == right.val) {
        return isCheck(left.right, right.left) && isCheck(left.left, right.right);
    } else {
        return false;
    }
    
}

// 方法2 迭代（通过栈）

var isSymmetric = function(root) {
    if(root == null) {
        return true;
    }
    
    var stack = [], left = root.left, right = root.right;
    stack.push(left); stack.push(right);
    
    while(stack.length != 0) {
        l = stack.shift(); // 取出栈顶元素并删除
        r = stack.shift();
        
        
        if(l == null && r == null) { // 均为空
            continue;
        } 
        
        if(l == null || r == null) { // 有一个为空
            return false;
        }
        
        if(l.val != r.val) { // 值不同
            return false;
        }
        
        stack.push(l.left); stack.push(r.right);
        stack.push(l.right); stack.push(r.left);
    }
    
    return true;
    
};






// 222 完全二叉树的节点个数

// 完全二叉树的定义如下：
// 在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。
// 若最底层为第 h 层，则该层包含 1~ 2h 个节点。

// 思考了下，还是要遍历整棵树

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {
    if(root == null) {
        return 0;
    }
    
    return countNodes(root.left) + countNodes(root.right) + 1; // 1 即为 root
};

// 但我觉得这道题的出题意图不是这，而是要探求树的深度……

// 看到有一位博主提供的思路，但我觉得没啥用……
var countNodes = function(root) {
    if(root == null) {
        return 0;
    }
    
    var l = root, r = root, hleft = 0, hright = 0;
    
    while (l) {
        ++hleft;
        l = l.left;
    }
    while (r) {
        ++hright;
        r = r.right;
    }
    
    if(hleft == hright) {
        return Math.pow(2, hleft) - 1;
    }
    
    return countNodes(root.left) + countNodes(root.right) + 1; // 1 即为 root
};





// 110 平衡二叉树

// 方法1 比较常规的解法，对每一个节点先判断其左右子树的高度差，若不大于1再继续探寻其左右子树是否平衡
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    if(root == null) { // 空树是平衡二叉树
        return true;
    }
    
    
    if(Math.abs(treeHeight(root.left) - treeHeight(root.right)) > 1) { 
        // 对每一棵树而言，其左子树和右子树的高度差大于1就必然不是平衡二叉树
        // 就不用再探究其子树是否平衡
        return false;
        
    } else { 
        // 否则探寻其左右子树是否是平衡二叉树
        return isBalanced(root.left) && isBalanced(root.right);
    }
    
};

function treeHeight(node) {
    if(node == null) { // 根节点为null，树高为0
        return 0;
    }
    
    // 否则取左子树和右子树高度的最大值 + 1（root自身高度）
    return Math.max(treeHeight(node.left), treeHeight(node.right)) + 1;
}




// 112 路径总和
// 是否存在根节点到叶子节点（即左右指针指向null的节点）的路径
// 如果一个节点存在任意一个子节点，就不能算作叶子节点
// 考察递归的终止条件

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
    if(root == null) { // 空二叉树
        return false;
    }
    
    if(root.left == null && root.right == null) { // 叶子节点
        return root.val == sum; // 这里的sum是递归减去父节点值后的sum
    }
    
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val); // 返回递归结果
};





// 404 左叶子之和

// 方法1 非递归遍历（前序遍历）整棵二叉树，找出其中的左叶子，时间复杂度仍旧是O(n)

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
    if(root == null) {
        return 0;
    }

    var sum = 0, stack = []; // 设置一个空栈

    while(root || stack.length != 0) {
        while(root) {
            stack.push(root); // 当前节点入栈

            var left = root.left;

            if(left != null && left.left == null && left.right == null) { // 左叶子
                sum += left.val;
            }

            root = left;
        }

        if(stack.length != 0) {
            root = stack.pop();

            root = root.right;
        }
    }

    return sum;
};

// 方法2 递归，时间复杂度仍旧是O(n)

// 三种情况
// 1. 左子树已经是叶子了，直接转为探寻右子树
// 2. 左子树不是叶子节点，递归获取左子树的左子节点的值
// 3. 右子树直接递归获取左子节点的值

// 返回的 sum = 左子树中左叶子的总和 + 右子树中左叶子的总和

var sumOfLeftLeaves = function(root) {
    if(root == null) {
        return 0;
    }
    
    // 如果左子树恰好是左叶子
    if(root.left != null && root.left.left == null && root.left.right == null) {
        return root.left.val + sumOfLeftLeaves(root.right);
    }

    // 否则递归获取左子树中左叶子的总和 + 右子树中左叶子的总和
    return sumOfLeftLeaves(root.left) + sumOfLeftLeaves(root.right);
};




// 102 二叉树层次遍历

// 给定二叉树: [3,9,20,null,null,15,7]
// 返回其层次遍历结果：

// [
//     [3],
//     [9,20],
//     [15,7]
// ]
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    
    // 队列
    var queue = [], result = [];
    
    if(root != null) {
        queue.push(root);
    }
    
    while(queue.length != 0) {
        var length = queue.length;
        
        var line = []; // 每行都用一个单独的数组存放
        
        while(length--) {  // 先用后减,将一行的节点都放进去
            var tmp = queue.shift();
            
            if(tmp.left) {
                queue.push(tmp.left);
            }
            
            if(tmp.right) {
                queue.push(tmp.right);
            }
            
            line.push(tmp.val);
        }
        result.push(line);
    }
    
    return result;
};


// 103 二叉树的锯齿形（之字形）层次遍历

// 给定二叉树 [3,9,20,null,null,15,7]

// 返回锯齿形层次遍历如下：
// [
//   [3],
//   [20,9],
//   [15,7]
// ]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

// 方法1 reverse
var zigzagLevelOrder = function(root) {
    // 队列
    var queue = [], result = [];
    
    // 计数器用来统计所在行
    var count = 0;
    
    if(root != null) {
        queue.push(root);
    }
    
    while(queue.length != 0) {
        count++;
        
        var length = queue.length;
        
        var line = []; // 每行都用一个单独的数组存放
        
        while(length--) {  // 先用后减,将一行的节点都放进去
            var tmp = queue.shift();
            
            if(tmp.left) {
                queue.push(tmp.left);
            }
            
            if(tmp.right) {
                queue.push(tmp.right);
            }
            
            line.push(tmp.val);
        }
        
        if(count%2 != 0) { // 单数行
            result.push(line);
        } else { // 偶数行
             result.push(line.reverse());
        }
        
    }
    
    return result;    
};

// 方法2 海量数据时 reverse 效率低，使用双栈
function Print(pRoot)
{
    // write code here
    if(pRoot === null){
        return [];
    }
    var stackOdd = [], stackEven = [];
    var result = [];
    
    stackOdd.push(pRoot);
    
    while(stackOdd.length != 0 || stackEven.length != 0) {
        var tmp = undefined;
        if(stackOdd.length) {
            var line1 = [];
            while(stackOdd.length) {
                tmp = stackOdd.pop();
                
                if(tmp.left) {
                    stackEven.push(tmp.left);
                }
                if(tmp.right) {
                    stackEven.push(tmp.right);
                }
                
                line1.push(tmp.val);
            }
            result.push(line1);
        }
        if(stackEven.length) {
            var line2 = [];
            while(stackEven.length) {
                tmp = stackEven.pop();
                
                if(tmp.right) {
                    stackOdd.push(tmp.right);
                }
                if(tmp.left) {
                    stackOdd.push(tmp.left);
                }
                
                line2.push(tmp.val);
            }
            result.push(line2);
        }
        
    }
    
    return result;
}

// 重建二叉树
// 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。
// 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
// 例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

// 方法 1 递归

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function reConstructBinaryTree(pre, vin)
{
    // write code here
    if(pre.length === 0 || vin.length === 0 || pre.length !== vin.length) {
        return null;
    }

    let root = pre[0];
    let vinRootIndex = vin.indexOf(root);
    let vinLeft = vin.slice(0, vinRootIndex), 
        vinRight = vin.slice(vinRootIndex + 1);
    let preLeft = pre.slice(1, vinRootIndex + 1),
        preRight = pre.slice(vinRootIndex + 1);
    
    let newTree = new TreeNode(root); // 重建二叉树的根节点
    newTree.left = reConstructBinaryTree(preLeft, vinLeft);
    newTree.right = reConstructBinaryTree(preRight, vinRight);

    return newTree;
}

// 树的子结构
// 输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function HasSubtree(pRoot1, pRoot2)
{
    // write code here
    if(pRoot1 === null || pRoot2 === null) {
        return false;
    }
    
    return isSubtree(pRoot1, pRoot2) ||
        isSubtree(pRoot1.left, pRoot2) ||
        isSubtree(pRoot1.right, pRoot2);
}

function isSubtree(root1, root2) {
    // 出口设置是程序关键点
    if(root2 === null) { // root1 可以为空，也可以不为空
        return true;
    }
    if(root1 === null) { // 已经排除了 root2 为空的情况
        return false;
    }
    if(root1.val === root2.val) { // 注意是节点值的判定
        return isSubtree(root1.left, root2.left) && isSubtree(root1.right, root2.right);
    } else {
        return false;
    }
}

// 二叉搜索树的后序遍历序列
// 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。
// 如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

function VerifySquenceOfBST(sequence)
{
    // write code here
    let length = sequence.length;
    if(length === 0) {
        return false;
    }
    if(length === 1) {
        return true;
    }
    
    return verifyBST(sequence, 0, length - 1); // 传入判定开始和结束索引
}

function verifyBST(seq, start, end) {
    // 出口，注意必须为大于等于（>对应空子树情况，=对应叶子节点）
    if(start >= end) {
        return true;
    }

    let index = start, root = seq[end]; // 后序遍历最后一位为子树的根节点
    while(seq[index] < root) { // 分为左右子树
        index++;
    }
    for(let i = index; i < end; i++) { // 右堆的所有数都应比根节点值大
        if(seq[i] < root) {
            return false;
        }
    }

    return verifyBST(seq, start, index - 1) && verifyBST(seq, index, end - 1);
}

// 求1+2+3+...+n

// 求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。

