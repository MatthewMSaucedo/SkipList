// TypeScript Probabilistic SkipList

class SkipListNode<T>
{
    nextNode: Array<SkipListNode<T>>;
    data: T;

    // This constructor creates a new node with the specified height, data.
    constructor( height: number, data?: T )
    {   
        // create empty nextNode array
        this.nextNode = new Array<SkipListNode<T>>();
		
        // add amount of null references equivalent to height
        for( let i = 0; i < height; i++ )
        {
            this.nextNode.push( null );
        }

        // add data to node 
        if( data != undefined ) 
        {
            this.data = data;
        }
    }

    // returns the value stored at this node.
    public value(): T 
    {
        return this.data;
    }

    // returns the height of this node.
    public height(): number
    {
        return this.nextNode.length;
    }

    // returns reference to next node at the given level.
    public next( level: number ): SkipListNode<T>
    {
        // attempt to access level that DNE returns null
        if( level < 0 || level > this.nextNode.length - 1 )
        {
            return null;
        }
        
        return this.nextNode[level];
    }

    // Set the next reference at the given level within this node to node.
    public setNext( level: number, node: SkipListNode<T>): void
    {
        this.nextNode[level] = node;
    }
    
    // Grow this node by exactly one level.
    public grow(): void
    {
        this.nextNode.push( null );
    }
    
    // returns random number from min to max, inclusive
    public randomIntFromInterval( min: number , max: number ): number
    {
        return Math.floor( Math.random() * (max-min+1) + min );
    }

    // Grow this node by exactly one level with a probability of 50%.
    public maybeGrow(): void
    {
        let probability: number = this.randomIntFromInterval( 0, 1 );  
		
		// 1 or 0 is randomly generated, giving a 50% probability
		if( probability == 1 )
		{
			this.nextNode.push( null );
		}
    }

    // Remove references from the top of this node’s tower of next references until 
    // this node’s height has been reduced to the value given in the height parameter.
    public trim( height: number ): void
    {
        for( let i = this.height(); i > height; i--  )
        {
            this.nextNode.pop();
        }
    }
}

class SkipList<T>
{
    headNode: SkipListNode<T>;
    numNodes: number;

    constructor( height?: number )
    {
        // create head node with prescribed height
        if( height != undefined )
        {
            // ensure valid height
            if( height < 1 )
            {
                this.headNode = new SkipListNode<T>( 1 );
            }
            else
            {
                this.headNode = new SkipListNode<T>( height );
            }
        }
        // create head node with height of 1
        else
        {
            this.headNode = new SkipListNode<T>( 1 );
        }

        // initialize the node count
        this.numNodes = 1;
    }

    // return size of the Skip List (excluding the head node)
    public size(): number
    {
        return this.numNodes - 1;
    }

    // return the height of the skiplist
    public height(): number
    {
        return this.headNode.height();
    }

    public head(): SkipListNode<T>
    {
        return this.headNode;
    }

    public insert( data: T, height?: number): void
    {
        let currentLevel: number;
        let currentNode: SkipListNode<T> = this.headNode;
        let nodesOutdatedRefs: Array<SkipListNode<T>> = new Array<SkipListNode<T>>();
        let newNode: SkipListNode<T>;

        // If inserting this node causes ⌈log2(n)⌉ to exceed the skip list’s current height,
        // you must increase the overall height of the skip list. 
        if( Math.ceil(Math.log(this.numNodes) / Math.log(2)) > this.height() )
        {
            this.growSkipList();
        }
        currentLevel = this.height() - 1;

        while( currentLevel >= 0 )
        {
             // check next node at current level for null
            if( currentNode.nextNode[currentLevel] == null ) 
            {
                 // current node may need ref at this level updated
                nodesOutdatedRefs.push( currentNode );

                // dropdown level
                currentLevel--;
            }
            // check next node at current level for lesser value
            else if( currentNode.nextNode[currentLevel].data < data )
            {
                // advance to the next node at this level
                currentNode = currentNode.nextNode[currentLevel];
            }
            // next node was greater or equal to value
            else
            {
                // current node may need ref at this level updated
                nodesOutdatedRefs.push( currentNode );

                // dropdown level
                currentLevel--;
            }
        }

        // check if there was a prescribed height
        if( height != undefined  )
        {
            // add node of specified height
            newNode = new SkipListNode<T>( height, data );
        }
        else
        {
            // add node of randomized height
            let maxHeight = Math.max( this.getMaxHeight( this.numNodes ), this.height() );
            newNode = new SkipListNode<T>( this.generateRandomHeight( maxHeight ), data );
        }

        // reverse the outdated refs array so that their level needing to be updated
        // corresponds to their index in the array
        nodesOutdatedRefs = nodesOutdatedRefs.reverse();
        
        // update references of inserted node and outdated nodes
        for( let i = newNode.height() - 1; i >= 0; i-- )
        {
            // add reference to newNode
            newNode.nextNode[i] = nodesOutdatedRefs[i].nextNode[i];

            // update reference of outdated Node
            nodesOutdatedRefs[i].nextNode[i] = newNode;
        }
        this.numNodes++;
    }

    public delete( data: T): void
    {

    }

    public contains( data: T ): boolean
    {
        return false;
    }

    public get( data: T ): SkipListNode<T>
    {
        return null;
    }

    //  Returns the max height of a skip list with n nodes.
    public getMaxHeight( n: number ): number
    {
        if( n == 1 )
		{
			return 1;
		}
		
		return Math.ceil( Math.log(n) / Math.log(2) );
    }

    public generateRandomHeight( maxHeight: number ): number
    {
       return this.generateRandomHeightHelper( maxHeight, 1 );
    }

    public generateRandomHeightHelper( maxHeight: number, height: number ): number
    {
        /* Returns 1 with 50% probability, 2 with 25% probability, 3 with 12.5% probability,
        and so on, without exceeding maxHeight */
		
		if ( height == maxHeight)
		{
			return height;
		}
		
		// 1/2 probability that function will be called again with increased height
		if ( this.randomIntFromInterval( 1, 2 ) == 1 )
		{
			height = this.generateRandomHeightHelper(maxHeight, height + 1);
		}
		
		// this returns result of all recursive calls.
		return height;
    }

    // increase size of skiplist by one when appropriate
    public growSkipList(): void
    {
        let searchLevel = this.height() - 1;
        let lastGrownNode: SkipListNode<T>;

        // grow the head
        let currentNode: SkipListNode<T> = this.head();
        currentNode.grow();
        lastGrownNode = currentNode;

        // for each node at old maximum height, there is a 50% chance of increasing to new height
        for( currentNode = currentNode.nextNode[searchLevel]; currentNode != null; currentNode = currentNode.nextNode[searchLevel] )
        {
            if( this.randomIntFromInterval( 1, 2 ) == 1 )
            {
                currentNode.grow();

                // update reference from last grown node to this grown node
                lastGrownNode.nextNode[searchLevel+1] = currentNode;

                // update this node as the last grown node
                lastGrownNode = currentNode;
            }
        }
    }

    public trimSkipList(): void
    {

    }

    // returns random number from min to max, inclusive
    public randomIntFromInterval( min: number , max: number ): number
    {
        return Math.floor( Math.random() * (max-min+1) + min );
    }
}


// MAIN
let exampleNode: SkipListNode<number> = new SkipListNode<number>( 4, 7 );
let exampleSkipList: SkipList<number> = new SkipList<number>();

console.log("The exampleNode has a height of " 
    + exampleNode.height() + ", and stores this data: " + exampleNode.value() );

    
exampleSkipList.insert(2);
console.log( "2 was added!" );
exampleSkipList.insert(4);
console.log( "4 was added!" );
exampleSkipList.insert(8);
console.log( "8 was added!" );
exampleSkipList.insert(10);
console.log( "10 was added!" );
exampleSkipList.insert(18);
console.log( "18 was added!" );
exampleSkipList.insert(20);
console.log( "20 was added!" );
exampleSkipList.insert(27);
console.log( "27 was added!" );
exampleSkipList.insert(30);
console.log( "30 was added!" );
exampleSkipList.insert(36);
console.log( "36 was added!" );
exampleSkipList.insert(41);
console.log( "41 was added!" );
exampleSkipList.insert(50);
console.log( "50 was added!" );
exampleSkipList.insert(47);
console.log( "47 was added!" );
console.log( exampleSkipList.size() );
