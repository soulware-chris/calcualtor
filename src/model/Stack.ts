export class Stack<T> {
  private data: T[] = [];

  public constructor() {
    this.data = [];
  }

  public log() {
    return this.data;
  }

  public push(item: T) {
    this.data.push(item);
  }

  public pop(): Undefinable<T> {
    return this.data.pop();
  }

  public top(): Undefinable<T> {
    if (this.data.length) {
      return this.data[this.data.length - 1];
    }
    return undefined;
  }

  public isEmpty(): boolean {
    if (this.data.length) {
      return true;
    }
    return false;
  }

  public length(): number {
    return this.data.length;
  }

  public clear() {
    this.data = [];
  }
}
