import { Stack } from 'src/model/Stack';
type Operator = '+' | '-' | '*' | '/';
type Tool = 'AC' | '+/-' | '%' | '.' | '=';

export class Calculator {
  private numStack: Stack<number>;
  private opStack: Stack<Operator>;
  private opPriority: { [op in Operator]: number };
  private curNumInput: Nullable<string>;
  private errorMessage: Nullable<string>;
  private lastOperator: Nullable<Operator>;
  private lastNumber: Nullable<number>;

  constructor() {
    this.numStack = new Stack<number>();
    this.opStack = new Stack<Operator>();
    this.opPriority = { '*': 2, '/': 2, '+': 1, '-': 1 };
    this.curNumInput = null;
    this.errorMessage = null;
    this.lastOperator = null;
    this.lastNumber = null;
  }

  public display() {
    const result = (() => {
      if (this.errorMessage) {
        return this.errorMessage;
      } else if (this.curNumInput !== null) {
        return Number(this.curNumInput);
      } else if (this.numTop() !== null) {
        return this.numTop();
      } else {
        return 0;
      }
    })();

    return result;
  }

  private numPush(val: number): void {
    this.numStack.push(val);
  }

  private numTop(): Nullable<number> {
    return this.numStack.top();
  }

  private numPop(): Nullable<number> {
    return this.numStack.pop();
  }

  private numLength(): number {
    return this.numStack.length();
  }

  private opPush(val: Operator): void {
    this.lastOperator = val;
    this.opStack.push(val);
  }

  private opTop(): Nullable<Operator> {
    return this.opStack.top();
  }

  private opPop(): Nullable<Operator> {
    return this.opStack.pop();
  }

  private opLength(): number {
    return this.opStack.length();
  }

  private clear(): void {
    this.numStack.clear();
    this.opStack.clear();
    this.curNumInput = null;
    this.errorMessage = null;
  }

  private consume(): void {
    const op1 = (() => {
      if (this.numTop() !== null) {
        return this.numPop();
      } else {
        if (this.curNumInput !== null) {
          return Number(this.curNumInput);
        } else {
          return null;
        }
      }
    })();

    const op2 = (() => {
      if (this.curNumInput === null) {
        if (this.numTop() !== null) {
          return this.numPop();
        } else {
          if (this.lastNumber !== null) {
            return this.lastNumber;
          } else {
            return null;
          }
        }
      } else {
        if (this.curNumInput !== null) {
          return Number(this.curNumInput);
        } else {
          return null;
        }
      }
    })();
    const op = (() => {
      if (this.opTop() !== null) {
        return this.opPop();
      } else {
        if (this.lastOperator !== null) {
          return this.lastOperator;
        } else {
          return null;
        }
      }
    })();

    if (op1 === null || op2 === null || op === null) {
      throw new Error('op1 op2 op type error');
    }

    this.numPush(this.calculate(op1, op2, op));
    this.curNumInput = null;
  }

  private calculate(op1: number, op2: number, operator: Operator) {
    console.log('calculate', op1, op2, operator);
    switch (operator) {
      case '+':
        return op1 + op2;
      case '-':
        return op1 - op2;
      case '*':
        return op1 * op2;
      case '/':
        if (op2 === 0) {
          throw new Error('숫자 아님');
        }
        return op1 / op2;
    }
  }

  public input(val: number | Operator | Tool) {
    try {
      switch (val) {
        case 'AC':
          this.clear();
          break;
        case '+/-':
          if (this.curNumInput !== null) {
            const tmp = Number(this.curNumInput);
            this.curNumInput = String(tmp * -1);
          } else if (this.numTop() !== null) {
            const tmp = this.numPop();
            if (tmp !== null) {
              this.numPush(tmp * -1);
            }
          }
          break;
        case '%':
          if (this.curNumInput !== null) {
            const tmp = this.calculate(Number(this.curNumInput), 100, '/');
            this.curNumInput = String(tmp);
          } else if (this.numTop() !== null) {
            const tmp = this.numPop();
            if (tmp !== null) {
              this.numPush(this.calculate(tmp, 100, '/'));
            }
          }
          break;
        case '=':
          if (this.curNumInput !== null) {
            this.lastNumber = Number(this.curNumInput);
          }
          console.log('lastNumber', this.lastNumber);
          if (this.numLength() === 0) {
            break;
          } else {
            while (true) {
              this.consume();
              if (this.numLength() <= 1) {
                break;
              }
            }
          }
          break;
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
          this.lastNumber = Number(this.curNumInput);
          const nextNumLength =
            this.numLength() + (this.curNumInput !== null ? 1 : 0);
          const nextOpLength = this.opLength() + 1;
          if (nextNumLength === 0) {
            break;
          }
          if (nextNumLength < nextOpLength) {
            this.opPop();
          }

          while (true) {
            const opTop = this.opTop();
            if (
              opTop === null ||
              this.opPriority[opTop] < this.opPriority[val]
            ) {
              if (this.curNumInput !== null) {
                this.numPush(Number(this.curNumInput));
                this.curNumInput = null;
              }
              this.opPush(val);
              break;
            }

            this.consume();
          }
          break;
      }
    } catch (e: any) {
      console.log('catch', e);
      if (e.message) {
        this.errorMessage = e.message.toString();
      } else {
        this.errorMessage = e.toString();
      }
      console.log('errorMessage', this.errorMessage);
    }
    console.log(this.numStack.log());
    console.log(this.opStack.log());
  }
}
