class LinkNode<KeyType, NodeValType> {
  next: LinkNode<KeyType, NodeValType> | null;
  previous: LinkNode<KeyType, NodeValType> | null;
  val: NodeValType;
  id: KeyType;
  constructor(id: KeyType, val: NodeValType, next: LinkNode<KeyType, NodeValType> | null = null, previous: LinkNode<KeyType, NodeValType> | null = null) {
    this.next = next;
    this.val = val;
    this.previous = previous;
    this.id = id;
  }
}

class LinkList<KeyType, NodeValType> {
  private head: LinkNode<KeyType, NodeValType> | null = null;
  private tail: LinkNode<KeyType, NodeValType> | null = null;
   idNodeMap: Map<KeyType, LinkNode<KeyType, NodeValType>> = new Map();
  constructor() { }
  addNode(id: KeyType, newVal: NodeValType) {
    const newNode = new LinkNode(id, newVal, null, this.tail);
    if (this.tail === null || this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.idNodeMap.set(id, newNode);
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
  clear() {
    this.tail === null;
    this.head === null;
    this.idNodeMap.clear();
  }
  getNodeValFromId(id: KeyType): NodeValType | -1 {
    return this.idNodeMap.get(id)?.val ?? -1;
  }
  findLastOneId(fn: (id: KeyType, node: NodeValType) => boolean): KeyType | -1 {
    let node = this.tail;
    while(node) {
      if(fn(node.id, node.val)) {
        return node.id;
      }
      node = node.previous;
    }
    return -1;
  }
  forEach(fn: (id: KeyType, node: NodeValType) => void) {
    let node = this.head;
    while(node) {
      fn(node.id, node.val);
      node = node.next;
    }
  }
}
export default LinkList;