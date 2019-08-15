// 链表一般问题（一般要考虑设置双指针或者多指针）

// 链表中倒数第k个结点

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindKthToTail(head, k)
{
    // write code here
    // 方法1. 把节点值全部存入数组，取倒数第k个val
    // 方法2. 遍历链表，获取链表总长度，再遍历一次获取倒数第k个节点
    // 方法3. 双指针，一个指针先跑k-1步，两个指针再一起跑，直到先跑的指针跑到终点
    
    // 如果输入的参数k为0,由于k是一个无符号整数，那么在for循环中k-1得到的将不是-1，而是4294967295（无符号的0xFFFFFFFF）
    if(head == null || k == 0) return null; 
    
    var first = head ,last = head;
    
    for(var i = 0; i < (k - 1); i++) {
        if(first.next !== null) { 
            first = first.next; 
        } else { 
            return null; // 链表长度小于k
        }
    }
    
    while(first.next !== null) { // 先跑的指针跑到终点
        first = first.next;
        last = last.next;
    }
    
    return last;
}

// 反转链表

// 输入一个链表，反转链表后，输出新链表的表头

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(pHead)
{
    // write code here
    if(pHead == null || pHead.next == null) return pHead;
    
    var prev = null, next = null;
    
    while(pHead != null) { // pHead不为空而不是pHead.null不为空，因为指针已经指向前一个node
        // 反转
        next = pHead.next; 
        pHead.next = prev;
        
        // 移动指针
        prev = pHead;
        pHead = next;
    }
    
    return prev; // 注意返回值，此时pHead已经指向了空
}

function ReverseList(pHead)
{
    // write code here
    if(pHead == null || pHead.next == null) return pHead;
    
    // 设置 prev, curr, next 三个指针
    var prev = null, curr = pHead;
    
    while(curr != null) {
        let next = curr.next;

        curr.next = prev;
        prev = curr;
        curr = next;
    }
    
    return prev; // 注意返回值，此时curr已经指向了空
}

// 83  删除排序链表中的重复元素

// 86

// 328

// 4

// 465

// 虚拟头结点问题

// 设置虚拟头结点，不需要考虑头结点为空的特殊情况（尤其是头结点一直在更新的情况）


// 203. 移除链表元素

// 输入: 1->2->6->3->4->5->6, val = 6
// 输出: 1->2->3->4->5

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
var removeElements = function(head, val) {
    if(head === null) return null;
    
    let dummyHead = new ListNode(0);
    dummyHead.next = head; // 设置虚拟头结点
    
    let curr = dummyHead;
    while(curr.next !== null) {
        if(curr.next.val === val) {
            curr.next = curr.next.next;
        } else {
            curr = curr.next; //
        }
    }
    
    
    return dummyHead.next;
};

// 删除链表中重复的结点

// 在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，
// 返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function deleteDuplication(pHead)
{
    // write code here
    if(pHead == null || pHead.next == null) return pHead;
    
    // 我感觉这道题应该要建个虚拟头结点，因为头结点可能会一直更新
    let dummyHead = new ListNode(0);
    dummyHead.next = pHead; // 设置虚拟头结点
    
    let pre = dummyHead;
    let curr = dummyHead.next;
    
    while(curr) {
        if(curr.next && curr.val === curr.next.val) { // 存在相同值
            // 找到最后一个与当前节点有相同值的节点，将curr指针指向它
            while(curr.next && curr.val === curr.next.val) {
                curr = curr.next;
            }
            pre.next = curr.next; // 跳过所有相同值节点
            curr = curr.next;            
        } else {
            // 两个指针都后移
            pre = pre.next;
            curr = curr.next;
        }

    }
    
    return dummyHead.next;
}

// 3. 合并两个排序的链表

// 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

// 方法1 递归
// 说实话我开始都没想到还有递归方法，但是写起来确实很容易，逻辑也很清晰
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function Merge(pHead1, pHead2)
{
    // write code here
    if (pHead1 == null) {
        return pHead2;
    } else if (pHead2 == null) {
        return pHead1;
    }
    
    if(pHead1.val <= pHead2.val) {
        pHead1.next = Merge(pHead1.next, pHead2);
        return pHead1;
    } else {
        pHead2.next = Merge(pHead1, pHead2.next);
        return pHead2;       
    }
}

// 92 反转链表II（需要好好思考下的问题）

// 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
// 说明:
// 1 ≤ m ≤ n ≤ 链表长度。
// 示例:
// 输入: 1->2->3->4->5->NULL, m = 2, n = 4
// 输出: 1->4->3->2->5->NULL

// 解题思路：
// 以1->2->3->4->5, m = 2, n=4 为例:

// 首先指针移位，定位到要反转部分的头节点 2，head = 2；前驱结点 1，prev = 1；
// 将当前节点的下一个节点3调整为前驱节点的下一个节点 1（prev）->3（next）->2（curr）->4->5,
// 当前结点仍为2，当前节点的下一个节点是4，前驱结点依然是1，重复上一步操作1（prev）->4（next）->3->2（curr）->5

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
    if(head == null || head.next == null) return head;
    
    var prev = new ListNode(0); // 设置指针指向头结点的前驱节点（虚拟头结点）
    prev.next = head;
    
    var final = prev; // 因为prev之后作为指针移动，这里新建一个final保存虚拟头结点
    
    for(var i = 1; i < m; i++){
        prev = prev.next;
    }
    
    var curr = prev.next; // 开始反转的点,prev是其前驱节点
    var next; // 设置后一节点
    
    for(var j = m; j < n; j++) {
        next = curr.next; // 保留指针，防止断链

        curr.next = next.next;

        // next.next = curr;
        // curr 指针实际上一直指向了开始反转的点，next指针会发生移动
        // 这步非常重要，很容易错（画）
        next.next = prev.next;

        prev.next = next;
    }
    
    return final.next; 
    // 疑问：为什么不能反悔head结点而是返回了保存的虚拟头结点？
    // 答：head.next指向的依然是原链表的第2个数，依照范例这里指向了2，所以链表会不完整了，必需采用虚拟头结点

    // 思考：m=1时是如何工作的
};


// 双链表问题

// 两个链表的第一个公共结点

// 解法一：两条相交的链表呈Y型。可以从两条链表尾部同时出发，
// 最后一个相同的结点就是链表的第一个相同的结点。
// 可以利用栈来实现,建立两个不同的栈，将链表元素入栈，然后出栈比较。时间复杂度有O(m + n), 空间复杂度为O(m + n)
function FindFirstCommonNode(pHead1, pHead2)
{
    // write code here
    // 如果存在共同节点的话，那么从该节点，两个链表之后的元素都是相同的。
    // Y字形链表
    
    if(pHead1 === null || pHead2 === null) return null;
    
    let stack1 = [], stack2 = [];
    while(pHead1 !== null) {
        stack1.push(pHead1);
        pHead1 = pHead1.next;
    }
    while(pHead2 !== null) {
        stack2.push(pHead2);
        pHead2 = pHead2.next;
    }
    
    let commonNode = null;
    while(stack1.length > 0 && stack2.length > 0 && stack1[stack1.length - 1] === stack2[stack2.length - 1]) {
        /*
        let tmp1 = stack1.pop();
        let tmp2 = stack2.pop();
        if(tmp1 == tmp2) {
            commonNode = tmp1;
        } else {
            break;
        }*/
        commonNode = stack1.pop();
        stack2.pop();
    }
    
    return commonNode;
}

// 解法2 很巧妙的标记法，先遍历一遍链表1，将每个节点打上标记，再遍历链表2找出第一个被标记的点
function FindFirstCommonNode(pHead1, pHead2)
{
    // write code here
    
    if(pHead1 === null || pHead2 === null) return null;
    
    while(pHead1) {
        pHead1.visited = true;
        pHead1 = pHead1.next;
    }

    while(pHead2) {
        if (pHead2.visited) {
            return pHead2;
        }
        pHead2 = pHead2.next;
    }
    
    return null;
}

// 解法3 找出2个链表的长度，然后让长的先走两个链表的长度差，然后再一起走
function FindFirstCommonNode(pHead1, pHead2)
{
    // write code here
    if(pHead1 === null || pHead2 === null) return null;
    
    let length1 = getLength(pHead1);
    let length2 = getLength(pHead2);
    
    if(length1 > length2) { // pHead1 first
        pHead1 = walkFirst(pHead1, length1 - length2);
    } else {
        pHead2 = walkFirst(pHead2, length2 - length1);
    }
    
    // pHead1 & pHead2 at the same start point
    while(pHead1) {
        if(pHead1 === pHead2) {
            return pHead1;
        }
        pHead1 = pHead1.next;
        pHead2 = pHead2.next;
    }
    return null;
}

function getLength(head) {
    let length = 0;
    
    let move = head; // 创建一个新的指针
    while(move) {
        length++;
        move = move.next;
    }
    
    return length;
}
    
function walkFirst(head, step) { // 提前走 step 步
    while(step) {
        step--;
        head = head.next;
    }
    return head;
}


// 约瑟夫环问题
// 孩子们的游戏(圆圈中最后剩下的数)

function ListNode(x){
    this.val = x;
    this.pre = null;
    this.next = null;
}

function LastRemaining_Solution(n, m)
{
    // write code here
    if(n <= 0 || m < 0) {
        return -1;
    }
    
    /* 方法1 数学公式推导*/
    /* 映射得出公式 n > 1, f(n,m)=[f(n-1,m)+m]%n */
    /*
    let last = 0;
    for(let i = 2; i <= n; i++) {
        last = (last + m) % i;
    }
    return last;
    */
    let head = new ListNode(0);
    let currNode = head;
    let lastNode = null;
    for(let i = 1; i < n; i++) {
        // 建立双向链表
        lastNode = new ListNode(i);
        lastNode.pre = currNode;
        currNode.next = lastNode;
        
        // 更新 currNode
        currNode = lastNode;
    }
    // 建立环形链表
    lastNode.next = head;
    head.pre = lastNode;
    
    currNode = head;
    let count = n; // 统计剩余小朋友数量直至剩1
    while(count !== 1) {
        for(let i = 0; i < m - 1; i++) { [0, m - 1]
            currNode = currNode.next;
        }
        // 去除第 m 个节点，即此时的 currNode 指向
        currNode.next.pre = currNode.pre;
        currNode.pre.next = currNode.next;
        
        currNode = currNode.next; // 移动 currNode 指向新开始的节点
        count--;
    }
    return currNode.val;
}


// 链表中环的入口结点

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function EntryNodeOfLoop(pHead)
{
    // write code here
    // 其实是数学问题
    /*
    假设x为环前面的路程
    a为环入口到相遇点的路程
    b为相遇点到环入口的路程
    c为环的长度（a+b）
    设置快慢指针，快指针一次走两步，慢指针一次走一步，快慢指针终会在环内相遇
    此时设快指针走了m圈，慢指针走了n圈
    当快慢指针相遇的时候：
    慢指针走的路程为Sslow = x + m * c + a
    快指针走的路程为Sfast = x + n * c + a
    计算得到
    x = (n - 2 * m )*c - a 
    = (n - 2 *m -1 )*c + c - a
    = (n - 2 *m -1 )*c + b
    即
    x-b = (n - 2 *m -1 )*c
    所以让一个指针从相遇点开始，另一个从起点开始走，终会在环入口相遇
    时间复杂度：O(n)
    空间复杂度：O(1)
    */
    if(!pHead || !pHead.next) return null;
    let slow = pHead, fast = pHead; 
    // fast 跑得快，用它进行条件判定（可能不存在环）
    while(fast && fast.next) {
        fast = fast.next.next; // step 2
        slow = slow.next; // step 1
        if(slow == fast) {
            fast = pHead; // 将其中一个指针指向头结点
            while(slow != fast) {
                fast = fast.next;
                slow = slow.next;
            }
            if(slow == fast) {
                return slow;
            }
        }
    }
    return null;
}