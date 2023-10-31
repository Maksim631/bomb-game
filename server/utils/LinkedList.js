export class LinkedList {
  constructor() {
    this.size = 0;
    this.current = null;
  }

  insert(node) {
    if (!this.head) {
      this.head = node;
      this.current = node;
      return;
    }
    let current = this.head;
    let currentIndex = 0;
    while (currentIndex < this.size) {
      current = current.next;
      currentIndex++;
    }
    current.next = node;
    node.next = this.head;
  }

  getCurrent() {
    return this.current.value;
  }

  next() {
    if (this.current === null) {
      this.current = this.head;
      return;
    }
    this.current = this.current.next;
  }
}
