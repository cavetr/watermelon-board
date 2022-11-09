class LinkNode<NodeValType> {
  next: LinkNode<NodeValType> | null;
  previous: LinkNode<NodeValType> | null;
  val: NodeValType;
  constructor(val: NodeValType, next: LinkNode<NodeValType> | null = null, previous: LinkNode<NodeValType> | null = null) {
    this.next = next;
    this.val = val;
    this.previous = previous;
  }
}

class LinkList<NodeValType, KeyType> {
  head: LinkNode<NodeValType> | null = null;
  tail: LinkNode<NodeValType> | null = null;
  private idNodeMap: Map<KeyType, LinkNode<NodeValType>> = new Map();
  constructor() { }
  addNode(newVal: NodeValType, id: KeyType) {
    const newNode = new LinkNode(newVal, null, this.tail);
    if (this.tail === null || this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
      this.idNodeMap.set(id, newNode);
    }
  }
  deleteNode(id: KeyType) {
    const needDeleteNode = this.idNodeMap.get(id);
    if (!needDeleteNode) return;
    if (needDeleteNode.previous) {
      needDeleteNode.previous.next = needDeleteNode.next;
    }
    if (needDeleteNode.next) {
      needDeleteNode.next.previous = needDeleteNode.previous;
    }
    if (needDeleteNode === this.head) {
      this.head = this.head.next;
    }
    if (needDeleteNode === this.tail) {
      this.tail = this.tail.previous;
    }
    this.idNodeMap.delete(id);
  }
  forEach(fn: (id: KeyType, node: LinkNode<NodeValType>) => void) { 
    for(const [id, node] of this.idNodeMap) {
      fn(id, node);
    }
  }
}
export default LinkList;