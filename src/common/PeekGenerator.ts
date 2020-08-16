
export class PeekGenerator<T> {
  static MAX_SIZE = 20;
  protected it: Generator;
  private pushBacksStack: Array<T> = [];
  private queueCache: Array<T> = [];
  private endToken: T | null;
  constructor(it: Generator, endToken: T | null = null) {
    this.it = it;
    this.endToken = endToken;
  }

  peek(): T | null {
    if (this.pushBacksStack.length > 0) {
      const len = this.pushBacksStack.length;
      return this.pushBacksStack[len - 1]; // 拿栈顶
    }
    const ch = this.next();
    this.pushBack();
    return ch;

  }

  pushBack() {
    if (this.queueCache.length > 0) {
      this.pushBacksStack.push(this.queueCache.pop() as T);
    }
  }

  next() {
    let val: T;
    if (this.pushBacksStack.length > 0) {
      val = this.pushBacksStack.pop() as T;
    } else {
      val = this.it.next().value;
      if (val == null) {
        const tmp = this.endToken;
        this.endToken = null;
        val = tmp as T;
      }
    }


    while (this.queueCache.length > PeekGenerator.MAX_SIZE - 1) {
      this.queueCache.shift();
    }

    this.queueCache.push(val);
    return val;
  }

  hasNext() {
    return this.endToken || !!this.peek();
  }

}