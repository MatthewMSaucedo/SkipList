// This is a basic template showing how to set up your Node and SkipList classes
// to be in the same file. For my test cases to work properly, you will need to
// implement your Node class here, in this file, outside of the SkipList class.
//
// Note: You will need to modify these class declarations to make your Node
// and SkipList containers generic and capable of holding any type of Comparable
// object.
//
// You should rename this file "SkipList.java" and remove this comment before
// submitting.

class SkipListNode<T>
{
    nextNode: Array<SkipListNode<T>>;
    data: T;

    constructor( data: T, height?: number )
    {
        if( height == undefined ) 
        {
            /* This constructor creates a new node with the specified height, 
            which will be greater than zero. Initially, all of the node’s 
            nextreferences should be initialized to null. 
            This constructor will be particularly useful when creating a head node,
            which does not store Tthing meaningful in its data field. 
            This constructor may be useful to you in other ways as well, 
            depending how you choose to implement certain of your skip list methods */;
        }
        else
        {
            /* This constructor creates a new node with the specified height, 
            which will be greater than zero, and initializes the node’s value to data.
            Initially, all of the node’s next references should be initialized to null.  */
        }
    }

    // An O(1) method that returns the value stored at this node.
    public value(): T 
    {
        return this.data;
    }

    public height(): number
    {
        /* An O(1) method that returns the height of this node.

        For example, if a node has three references (numbered 0 through 2),
        the height of that node is 3 (even if some of those references are null). */
        return 0;
    }

    public next( level: number ): SkipListNode<T>
    {
        /* An O(1) method that returns a reference to the next node in the skip list
        at this particular level. Levels are numbered 0 through (height – 1), 
        from bottom to top.
        
        If level is less than 0 or greater than (height – 1), 
        this method should return null */
        return null;
    }

    // Set the next reference at the given level within this node to node
    public setNext( level: number, node: SkipListNode<T>): void
    {
        //TODO
    }

    public grow(): void
    {
        /* Grow this node by exactly one level. 
        (I.e., add a null reference to the top of its tower of nextreferences). 
        This is useful for forcing the skip list’s head node to grow 
        when inserting into the skip list causes the list’s maximum height to increase */
    }

    public maybeGrow(): void
    {
        /* Grow this node by exactly one level with a probability of 50%. 
        (I.e., add a null reference to the top of its tower of next references). 
        This is useful for when inserting into the skip list causes the list’s maximum 
        height to increase. */
    }

    public trim( height: number ): void
    {
        /* Remove references from the top of this node’s tower of next references until 
        this node’s height has been reduced to the value given in the height parameter. 
        This is useful for when deleting from the skip list causes the list’s maximum 
        height to decrease. */
    }
}

public class SkipList<T>
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

    public get( data: T): SkipListNode<T>
    {
        return void;
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
