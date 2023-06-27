<template>
  <div class="calculator">
    <div class="display column-4">
      {{ calculator.numTop() }}
    </div>
    <q-btn @click="calculator.input('AC')" class="btn">AC</q-btn>
    <q-btn @click="calculator.input('+/-')" class="btn">+/-</q-btn>
    <q-btn @click="calculator.input('%')" class="btn">%</q-btn>
    <q-btn @click="calculator.input('/')" class="btn">/</q-btn>
    <q-btn @click="calculator.input(7)" class="btn">7</q-btn>
    <q-btn @click="calculator.input(8)" class="btn">8</q-btn>
    <q-btn @click="calculator.input(9)" class="btn">9</q-btn>
    <q-btn @click="calculator.input('*')" class="btn">*</q-btn>
    <q-btn @click="calculator.input(4)" class="btn">4</q-btn>
    <q-btn @click="calculator.input(5)" class="btn">5</q-btn>
    <q-btn @click="calculator.input(6)" class="btn">6</q-btn>
    <q-btn @click="calculator.input('-')" class="btn">-</q-btn>
    <q-btn @click="calculator.input(1)" class="btn">1</q-btn>
    <q-btn @click="calculator.input(2)" class="btn">2</q-btn>
    <q-btn @click="calculator.input(3)" class="btn">3</q-btn>
    <q-btn @click="calculator.input('+')" class="btn">+</q-btn>
    <q-btn @click="calculator.input(0)" class="column-2 btn">0</q-btn>
    <q-btn @click="calculator.input('.')" class="btn">.</q-btn>
    <q-btn @click="calculator.input('=')" class="btn">=</q-btn>
  </div>
</template>

<script lang="ts">

import {
  defineComponent,
  reactive
} from 'vue';


export default defineComponent({
  name: 'ExampleComponent',
  setup() {
    const calculator = reactive(new Calculator())

    return {
      calculator
    }
  }
})
type Undefinable<T> = T | undefined;
type Nullable<T> = T | null;
type Operator = '+' | '-' | '*' | '/'
type Tool = 'AC' | '+/-' | '%' | '.' | '='


class Stack<T> {
  private data: T[] = [];

  public constructor() {
    this.data = []
  }

  public push(item: T) {
    this.data.push(item)
  }

  public pop(): Undefinable<T> {
    return this.data.pop()
  }

  public top(): Undefinable<T> {
    if (this.data.length) {
      return this.data[this.data.length - 1]
    }
    return undefined
  }

  public isEmpty(): boolean {
    if (this.data.length) {
      return true
    }
    return false
  }

  public clear() {
    this.data = []
  }
}

class Calculator {
  private numStack: Stack<number>
  private opStack: Stack<Operator>
  private opPriority: { [op in Operator]: number }

  constructor() {
    this.numStack = new Stack<number>
    this.opStack = new Stack<Operator>
    this.opPriority = { '*': 1, '/': 1, '+': 2, '-': 2 }
  }

  public numPush(val: number) {
    this.numStack.push(val)
  }

  public numTop() {
    return this.numStack.top()
  }

  public numPop() {
    return this.numStack.pop()
  }

  public isNumEmpty() {
    return this.numStack.isEmpty()
  }

  public opPush(val: Operator) {
    this.opStack.push(val)
  }

  public opTop() {
    return this.opStack.top()
  }

  public opPop() {
    return this.opStack.pop()
  }

  public isOpEmpty() {
    return this.opStack.isEmpty()
  }

  public clear() {
    this.numStack.clear()
    this.opStack.clear()
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
        if (this.isNumEmpty()) {
          this.numPush(val)
        }
        else {
          const stringVal = `${this.numPop()}${val}`
          const numVal = Number(stringVal)
          this.numPush(numVal)
        }
        break
      case '+':
      case '-':
      case '*':
      case '/':
        if (this.isOpEmpty()) {

        }
        else {

        }
        break
    }
    console.log(this.numStack)
  }
}

</script>

<style lang="scss">
.calculator {
  width: 300px;
  height: 400px;
  display: grid;
  background-color: #efefef;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(4, 1fr);
  padding: 2px;

  .display {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-inline: 2px;
    background-color: red;
    font-size: 30px
  }

  .btn {
    font-size: 22px;
  }

  .column-2 {
    grid-column: span 2;
  }

  .column-4 {
    grid-column: span 4;
  }
}
</style>
