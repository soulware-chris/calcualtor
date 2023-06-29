import { Stack } from 'src/model/Stack';

type Operator = '+' | '-' | '*' | '/';
type Tool = 'AC' | '+/-' | '%' | '.' | '=';

export class Calculator {
  private numStack: Stack<number>;
  private opStack: Stack<Operator>;
  private opPriority: { [op in Operator]: number };
  private _curNumInput: Nullable<string>;

  constructor() {
    this.numStack = new Stack<number>();
    this.opStack = new Stack<Operator>();
    this.opPriority = { '*': 2, '/': 2, '+': 1, '-': 1 };
    this._curNumInput = null;
  }

  get curNumInput() {
    return this._curNumInput;
  }

  set curNumInput(val) {
    this._curNumInput = val;
  }

  public display() {
    if (this.curNumInput !== null) {
      return Number(this.curNumInput);
    } else if (this.numTop()) {
      return this.numTop();
    } else {
      return 0;
    }
  }

  public numPush(val: number) {
    this.numStack.push(val);
  }

  public numTop() {
    return this.numStack.top();
  }

  public numPop() {
    return this.numStack.pop();
  }

  public numLength() {
    return this.numStack.length();
  }

  public isNumEmpty() {
    return this.numStack.isEmpty();
  }

  public opPush(val: Operator) {
    this.opStack.push(val);
  }

  public opTop() {
    return this.opStack.top();
  }

  public opPop() {
    return this.opStack.pop();
  }

  public opLength() {
    return this.opStack.length();
  }

  public isOpEmpty() {
    return this.opStack.isEmpty();
  }

  public clear() {
    this.numStack.clear();
    this.opStack.clear();
  }

  public calculate(op1: number, op2: number, operator: Operator) {
    console.log('calculate', op1, op2, operator);
    switch (operator) {
      case '+':
        return op1 + op2;
      case '-':
        return op1 - op2;
      case '*':
        return op1 * op2;
      case '/':
        return op1 / op2;
    }
  }

  public input(val: number | Operator | Tool) {
    switch (val) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case '.':
        if (this.curNumInput) {
          this.curNumInput += String(val);
        } else {
          this.curNumInput = String(val);
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const nextNumLength =
          this.numLength() + (this.curNumInput !== null ? 1 : 0);
        const nextOpLength = this.opLength() + 1;
        if (nextNumLength === 0) {
          console.log('nextNumLength === 0');
          break;
        }
        if (nextNumLength < nextOpLength) {
          console.log('nextNumLength < nextOpLength');
          this.opPop();
        }

        let opTop = this.opTop();
        if (opTop === undefined) {
          // 1. 들어있던 연산자가 없는 경우
          if (this.curNumInput === null) {
            // 1.1 버퍼에 숫자가 없는 경우
            console.log('1.1');
            this.opPush(val);
          } else {
            // 1.2 버퍼에 숫자가 있는 경우
            console.log('1.2');
            this.numPush(Number(this.curNumInput));
            this.curNumInput = null;
            this.opPush(val);
          }
          break;
        } else {
          // 2. 들어있던 연산자가 있는 경우
          while (true) {
            opTop = this.opTop();
            if (opTop === undefined) {
              this.opPush(val);
              break;
            }
            if (this.opPriority[opTop] < this.opPriority[val]) {
              // 2.2 들어있던 연산자의 우선순위가 낮은 경우
              if (this.curNumInput) {
                // 2.2.1 버퍼에 숫자가 있는 경우
                console.log('2.2.1');
                this.numPush(Number(this.curNumInput));
                this.curNumInput = null;
              } else {
                // 2.2.2 버퍼에 숫자가 없는 경우
                console.log('2.2.2');
              }
              this.opPush(val);
              break;
            }

            // 2.1 들어있던 연산자의 우선순위가 높거나 같은 경우
            if (this.curNumInput === null) {
              console.log('2.1.1');
              // 2.1.1 버퍼에 숫자가 없는 경우
              const op1 = this.numPop();
              const op2 = this.numPop();
              this.curNumInput = null;
              const op = this.opPop();
              if (op1 === undefined || op2 === undefined || op === undefined) {
                throw new Error('');
              }
              this.numPush(this.calculate(op2, op1, op));
            } else {
              console.log('2.1.2');
              // 2.1.2 버퍼에 숫자가 있는 경우
              const op1 = this.numPop();
              const op2 = Number(this.curNumInput);
              this.curNumInput = null;
              const op = this.opPop();
              if (op1 === undefined || op2 === null || op === undefined) {
                throw new Error('');
              }
              this.numPush(this.calculate(op1, op2, op));
            }
          }
        }

        break;
    }
    console.log(this.numStack.log());
    console.log(this.opStack.log());
  }
}
