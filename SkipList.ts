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
        for( let i: number = 0; i < height; i++ )
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
			this.nextNode.push(null);
		}
    }

    // Remove references from the top of this node’s tower of next references until 
    // this node’s height has been reduced to the value given in the height parameter.
    public trim( height: number ): void
    {
        for( let i: number = this.height(); i > height; i--  )
        {
            this.nextNode.pop();
        }
    }
}

class SkipList<T>
{
    SkipList( height?: number )
    {
        ;
    }

    public size(): number
    {
        return 0;
    }

    public height(): number
    {
        return 0;
    }

    public head(): SkipListNode<T>
    {
        return null;
    }

    public insert( data: T, height?: number): void
    {
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

    private static getMaxHeight( n: number ): number
    {
        return 0;
    }

    private static generateRandomHeight( maxHeight: number ): number
    {
        return 0;
    }

    private growSkipList(): void
    {

    }

    private trimSkipList(): void
    {

    }
}
