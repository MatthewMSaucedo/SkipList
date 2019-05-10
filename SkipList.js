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
    function SkipList(height) {
        // create head node with prescribed height
        if (height != undefined) {
            // ensure valid height
            if (height < 1) {
                this.headNode = new SkipListNode(1);
            }
            else {
                this.headNode = new SkipListNode(height);
            }
        }
        // create head node with height of 1
        else {
            this.headNode = new SkipListNode(1);
        }
        // initialize the node count
        this.numNodes = 1;
    }
    // return size of the Skip List (excluding the head node)
    SkipList.prototype.size = function () {
        return this.numNodes - 1;
    };
    // return the height of the skiplist
    SkipList.prototype.height = function () {
        return this.headNode.height();
    };
    SkipList.prototype.head = function () {
        return this.headNode;
    };
    SkipList.prototype.insert = function (data, height) {
        var currentLevel;
        var currentNode = this.headNode;
        var nodesOutdatedRefs = new Array();
        var newNode;
        // If inserting this node causes ⌈log2(n)⌉ to exceed the skip list’s current height,
        // you must increase the overall height of the skip list. 
        if (Math.ceil(Math.log(this.numNodes) / Math.log(2)) > this.height()) {
            this.growSkipList();
        }
        // set current search level to maxmimum level available
        currentLevel = this.height() - 1;
        while (currentLevel >= 0) {
            // check next node at current level for null
            if (currentNode.next(currentLevel) == null) {
                // current node may need ref at this level updated
                nodesOutdatedRefs.push(currentNode);
                // dropdown level
                currentLevel--;
            }
            // check next node at current level for lesser value
            else if (currentNode.next(currentLevel).data < data) {
                // advance to the next node at this level
                currentNode = currentNode.next(currentLevel);
            }
            // next node was greater or equal to value
            else {
                // current node may need ref at this level updated
                nodesOutdatedRefs.push(currentNode);
                // dropdown level
                currentLevel--;
            }
        }
        // check if there was a prescribed height
        if (height != undefined) {
            // add node of specified height
            newNode = new SkipListNode(height, data);
        }
        else {
            // add node of randomized height
            var maxHeight = Math.max(this.getMaxHeight(this.numNodes), this.height());
            newNode = new SkipListNode(this.generateRandomHeight(maxHeight), data);
        }
        // reverse the outdated refs array so that their level needing to be updated
        // corresponds to their index in the array
        nodesOutdatedRefs = nodesOutdatedRefs.reverse();
        // update references of inserted node and outdated nodes
        for (var i = newNode.height() - 1; i >= 0; i--) {
            // add reference to newNode
            newNode.nextNode[i] = nodesOutdatedRefs[i].next(i);
            // update reference of outdated Node
            nodesOutdatedRefs[i].nextNode[i] = newNode;
        }
        this.numNodes++;
    };
    SkipList.prototype["delete"] = function (data) {
    };
    // returns boolean indicating whether given value exists in list
    SkipList.prototype.contains = function (data) {
        var currentLevel = this.height() - 1;
        var currentNode = this.head();
        while (currentLevel >= 0) {
            // check next node at current level for null
            if (currentNode.next(currentLevel) == null) {
                // dropdown level
                currentLevel--;
            }
            // check next node at current level for search value
            else if (currentNode.next(currentLevel).value() == data) {
                return true;
            }
            // check next node at current level for less than search value
            else if (currentNode.next(currentLevel).value() < data) {
                // advance to the next node at this level
                currentNode = currentNode.next(currentLevel);
            }
            // next node was greater than search value
            else {
                // dropdown level
                currentLevel--;
            }
        }
        // value is not in list
        return false;
    };
    SkipList.prototype.get = function (data) {
        return null;
    };
    // returns the max height of a skip list with n nodes
    SkipList.prototype.getMaxHeight = function (n) {
        if (n == 1) {
            return 1;
        }
        return Math.ceil(Math.log(n) / Math.log(2));
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
    // increase size of skiplist by one when appropriate
    SkipList.prototype.growSkipList = function () {
        var searchLevel = this.height() - 1;
        var lastGrownNode;
        // grow the head
        var currentNode = this.head();
        currentNode.grow();
        lastGrownNode = currentNode;
        // for each node at old maximum height, there is a 50% chance of increasing to new height
        for (currentNode = currentNode.nextNode[searchLevel]; currentNode != null; currentNode = currentNode.nextNode[searchLevel]) {
            if (this.randomIntFromInterval(1, 2) == 1) {
                currentNode.grow();
                // update reference from last grown node to this grown node
                lastGrownNode.nextNode[searchLevel + 1] = currentNode;
                // update this node as the last grown node
                lastGrownNode = currentNode;
            }
        }
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
exampleSkipList.insert(2);
console.log("2 was added!");
exampleSkipList.insert(4);
console.log("4 was added!");
exampleSkipList.insert(8);
console.log("8 was added!");
exampleSkipList.insert(10);
console.log("10 was added!");
exampleSkipList.insert(18);
console.log("18 was added!");
exampleSkipList.insert(20);
console.log("20 was added!");
exampleSkipList.insert(27);
console.log("27 was added!");
exampleSkipList.insert(30);
console.log("30 was added!");
exampleSkipList.insert(36);
console.log("36 was added!");
exampleSkipList.insert(41);
console.log("41 was added!");
exampleSkipList.insert(50);
console.log("50 was added!");
exampleSkipList.insert(47);
console.log("47 was added!");
console.log(exampleSkipList.size());
console.log("contains 26?: " + exampleSkipList.contains(26));
console.log("contains 50?: " + exampleSkipList.contains(50));
