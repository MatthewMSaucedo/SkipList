// TypeScript Probabilistic SkipList
var SkipListNode = /** @class */ (function () {
    // This constructor creates a new node with the specified height, data.
    function SkipListNode(height, data) {
        // create empty nextNode array
        this.nextNode = new Array();
        // add amount of null references equivalent to height
        for (var i = 0; i < height; i++) {
            this.nextNode.push(null);
        }
        // add data to node 
        if (data != undefined) {
            this.data = data;
        }
    }
    // returns the value stored at this node.
    SkipListNode.prototype.value = function () {
        return this.data;
    };
    // returns the height of this node.
    SkipListNode.prototype.height = function () {
        return this.nextNode.length;
    };
    // returns reference to next node at the given level.
    SkipListNode.prototype.next = function (level) {
        // attempt to access level that DNE returns null
        if (level < 0 || level > this.nextNode.length - 1) {
            return null;
        }
        return this.nextNode[level];
    };
    // Set the next reference at the given level within this node to node.
    SkipListNode.prototype.setNext = function (level, node) {
        this.nextNode[level] = node;
    };
    // Grow this node by exactly one level.
    SkipListNode.prototype.grow = function () {
        this.nextNode.push(null);
    };
    // returns random number from min to max, inclusive
    SkipListNode.prototype.randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    // Grow this node by exactly one level with a probability of 50%.
    SkipListNode.prototype.maybeGrow = function () {
        var probability = this.randomIntFromInterval(0, 1);
        // 1 or 0 is randomly generated, giving a 50% probability
        if (probability == 1) {
            this.nextNode.push(null);
        }
    };
    // Remove references from the top of this node’s tower of next references until 
    // this node’s height has been reduced to the value given in the height parameter.
    SkipListNode.prototype.trim = function (height) {
        for (var i = this.height(); i > height; i--) {
            this.nextNode.pop();
        }
    };
    return SkipListNode;
}());
var SkipList = /** @class */ (function () {
    function SkipList() {
    }
    SkipList.prototype.SkipList = function (height) {
        // create head node with prescribed height
        if (height != undefined) {
            // ensure valid height
            if (height < 0) {
                this.headNode = new SkipListNode(0);
            }
            else {
                this.headNode = new SkipListNode(height);
            }
        }
        // create head of list with height of 0
        this.headNode = new SkipListNode(0);
    };
    // return size of the Skip List (excluding the head node)
    SkipList.prototype.size = function () {
        var numNodes = 0;
        for (var nodeIterator = this.headNode.next(0); nodeIterator != null; nodeIterator = nodeIterator.next(0)) {
            numNodes++;
        }
        return numNodes;
    };
    // return the height of the skiplist
    SkipList.prototype.height = function () {
        return this.headNode.height();
    };
    SkipList.prototype.head = function () {
        return this.headNode;
    };
    SkipList.prototype.insert = function (data, height) {
        /* Insert data into the skip list with an expected (average-case) runtime of O(log n).
        If the value being inserted already appears in the skip list, this new copy should
        be inserted before the first occurrence of that value in the skip list.
        (See test cases #14 and #15 for further clarification on the order in which
        duplicate values should be inserted.)
            
        You will have to generate a random height for this node in a way that respects both
        the maximum height of the skip list and the expected distribution of node heights.
        (I.e., there shouldbe a 50% chance that the new node has a height of 1, a 25% chance
        that it has a height of 2, andso on, up to the maximum height allowable for this skip
        list.)
        
        The maximum possible height of this new node should be either ⌈ log2(n) ⌉ or the current
        height of the skip list – whichever is greater. (Recall that the height of the skip list
        can exceed ⌈ log2(n) ⌉ if the list was initialized using the second SkipList constructor
        described above.)
        
        If inserting this node causes ⌈ log2(n) ⌉ to exceed the skip list’s current height, you must
        increase the overall height of the skip list. Recall that our procedure for growing the
        skip list is as follows:
            (1) the height of the head node increases by 1, and
            (2) each node whose height was maxed out now has a 50% chance of seeing its height increased by 1.
        For example, if the height of the skip list is increasing from 4 to 5, the head node must
        grow to height 5, and each other node of height 4 has (independently) a 50% chance of growing
         to height 5.
         
         Test Cases #1 through #3 demonstrate how the insert() method should affect the height of
         a skiplist under a variety of circumstances. Test Cases #4 and #5 speak to the expected
         height distribution of nodes in a skip list. */
    };
    SkipList.prototype["delete"] = function (data) {
    };
    SkipList.prototype.contains = function (data) {
        return false;
    };
    SkipList.prototype.get = function (data) {
        return null;
    };
    SkipList.prototype.getMaxHeight = function (n) {
        return 0;
    };
    SkipList.prototype.generateRandomHeight = function (maxHeight) {
        return this.generateRandomHeightHelper(maxHeight, 1);
    };
    SkipList.prototype.generateRandomHeightHelper = function (maxHeight, height) {
        /* Returns 1 with 50% probability, 2 with 25% probability, 3 with 12.5% probability,
        and so on, without exceeding maxHeight */
        if (height == maxHeight) {
            return height;
        }
        // 1/2 probability that function will be called again with increased height
        if (this.randomIntFromInterval(1, 2) == 1) {
            height = this.generateRandomHeightHelper(maxHeight, height + 1);
        }
        // this returns result of all recursive calls.
        return height;
    };
    SkipList.prototype.growSkipList = function () {
    };
    SkipList.prototype.trimSkipList = function () {
    };
    // returns random number from min to max, inclusive
    SkipList.prototype.randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return SkipList;
}());
// MAIN
var exampleNode = new SkipListNode(4, 7);
var exampleSkipList = new SkipList();
console.log("The exampleNode has a height of "
    + exampleNode.height() + ", and stores this data: " + exampleNode.value());
exampleNode.trim(2);
console.log("The exampleNode has a height of "
    + exampleNode.height() + ", and stores this data: " + exampleNode.value());
for (var i = 0; i < 50; i++) {
    console.log(exampleSkipList.generateRandomHeight(5));
}
