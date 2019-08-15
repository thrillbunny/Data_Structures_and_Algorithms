function BinarySearchTree() { // 二叉搜索树，左节点比父节点小，右节点比父节点大
    this.Node = Node;
    let root = null;

    this.insert = insert;    //insert(key)：向树中插入一个新的键。

    this.search = search;    //search(key)：在树中查找一个键，如果节点存在，则返回true；如果不存在，则返回false。
    this.min = min;    //min：返回树中最小的值/键。
    this.max = max;    //max：返回树中最大的值/键。

    this.inOrderTraverse = inOrderTraverse;  //inOrderTraverse：通过中序遍历方式遍历所有节点。
    this.preOrderTraverse = preOrderTraverse;  //preOrderTraverse：通过先序遍历方式遍历所有节点。
    this.postOrderTraverse = postOrderTraverse;  //postOrderTraverse：通过后序遍历方式遍历所有节点。
    this.remove = remove;    //remove(key)：从树中移除某个键。
}

function Node (key) {
    this.key = key;
    this.left = null;
    this.right = null;
}

// 插入
function insert (key) { // 向树中插入一个新的键
    let newNode = new this.Node(key); // 这里注意新建的 Node 要指定 this

    if(this.root == null) {
        this.root = newNode;
    } else {
        insertNode(this.root, newNode);
    }
}
function insertNode(root, newNode){ //运用递归实现辅助函数
    if(newNode.key < root.key){
        if(root.left == null){
            root.left = newNode;
        }else{
            insertNode(root.left, newNode);
        }
    }else{
        if(root.right == null){
            root.right = newNode;
        }else{
            insertNode(root.right, newNode);
        }
    }
}

// 查找
function min () { // BST 最左的节点
    let node = this.root;
    if(node) {
        while(node && node.left) {
            node = node.left;
        }

        return node.key;
    }

    return null;
}
function max () { // BST 最右的节点
    let node = this.root;
    if(node) {
        while(node && node.right) {
            node = node.right;
        }

        return node.key;
    }

    return null;
}
function search (key) { // 在树中查找一个键是否存在
    return searchNode(this.root, key);
}
function searchNode (node, key) {
    if(node == null) {
        return false;
    }

    if(key < node.key) {
        return searchNode(node.left, key); // 递归结果必须返回
    } else if (key > node.key) {
        return searchNode(node.right, key);
    } else {
        return true;
    }
}

// 遍历
function inOrderTraverse() { // 中序遍历，左根右
    let result = [];
    inOrder(this.root, result);
    console.log(result);

    return result;
}
function inOrder(node, result) {
    if(node) { // 递归终止条件，相当于 if(node == null) return;
        inOrder(node.left, result);
        result.push(node.key);
        inOrder(node.right, result);
    }
}

function preOrderTraverse() { // 前序遍历，根左右
    let result = [];
    preOrder(this.root, result);
    console.log(result);

    return result;
}
function preOrder(node, result) {
    if(node) {
        result.push(node.key);
        preOrder(node.left, result);
        preOrder(node.right, result);
    }
}

function postOrderTraverse() { // 后序遍历，左右根
    let result = [];
    postOrder(this.root, result);
    console.log(result);

    return result;
}
function postOrder(node, result) {
    if(node) {
        postOrder(node.left, result);
        postOrder(node.right, result);
        result.push(node.key);
    }
}

// Q: 如何使用非递归方法实现二叉树的遍历？
// 借助出入栈
function inOrderTraverseII() {
    let result = []. stack = [];
    let pointer = this.root;

    while (pointer || stack.length != 0) { // pointer 为 null & stack 为空是边界条件
        while (pointer) {
            stack.push(pointer); //当前节点入栈

            // result.push(pointer.key); // 前序遍历

            pointer = pointer.left; //转向当前节点的左孩子节点
        } 

        if(stack.length != 0) { 
            pointer = stack.pop();

            result.push(pointer.key); // 数组保存结果

            pointer = pointer.right;
        }
    }
    return result;
}

function preOrderTraverseII() {
    let result = []. stack = [];
    let pointer = this.root;

    while (pointer || stack.length != 0) { // pointer 为 null & stack 为空是边界条件
        while (pointer) {
            stack.push(pointer); //当前节点入栈

            result.push(pointer.key); // 前序遍历,Add before going to children

            pointer = pointer.left; //转向当前节点的左孩子节点
        } 

        if(stack.length != 0) { 
            pointer = stack.pop();

            pointer = pointer.right;
        }
    }
    return result;
}

// 后序遍历时由于访问完左右子树后才能访问根结点，因此需要将根结点在栈内保留到左右子树被访问后
// 但同时会出现一个问题，当右子树弹出后遇到根结点又会将右子树结点压入栈中，造成死循环
// 需要在定义一个变量last代表最后一个访问的结点，当last与栈顶结点的右子树结点相同时，则不再将右子树结点压入栈中。
function preOrderTraverseII() {

}

// 删除
// 需要实时返回更新后的节点（即给被删除节点的父节点指针赋值 null）
function remove (key) {
    this.root = removeNode(this.root, key);
}
function removeNode (node, key) {
    if(node == null) {
        return null;
    }

    if(key < node.key) {
        node.left = removeNode(node.left, key);
        return node;
    } else if(key > node.key) {
        node.right = removeNode(node.right, key);
        return node;
    } else { // key == node.key
        // 叶节点
        if(node.left == null && node.left == null) {
            node = null;
            return node;
        } 

        // 删除只有一个子节点的节点
        if(node.left == null) {
            node = node.right;
            return node;
        } else if (node.right == null){
            node = node.left;
            return node;
        }

        // 删除有两个子节点的节点
        let temp = findMinNode (node.right); // 找出右子树的最小值
        node.key = temp.key;
        node.right = removeNode(node.right, temp.key); // 删除已经移动的点
        return node;
    }
}
function findMinNode(node) {
    while (node && node.left != null){
        node = node.left;
    }
    return node;
}

// 测试
var tree = new BinarySearchTree();

tree.insert(11); 
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3); 
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

tree.inOrderTraverse(); // [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25]
tree.preOrderTraverse(); // [11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25]
tree.postOrderTraverse(); // [3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11]

console.log(tree.min()); // 3
console.log(tree.max()); // 25
console.log(tree.search(13)); // true
console.log(tree.search(24)); // false

tree.remove(15);
console.log(tree.search(15)); // false
