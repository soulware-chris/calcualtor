<template>
  <div class="calculator">
    <div class="display column-4">
      {{ calculator.getDisplay() }}
    </div>
    <q-btn @click="calculator.input('AC')" class="btn">AC</q-btn>
    <q-btn @click="calculator.input('+/-')" class="btn">+/-</q-btn>
    <q-btn @click="calculator.input('%')" class="btn">%</q-btn>
    <q-btn @click="calculator.input('/')" class="btn">/</q-btn>
    <q-btn @click="calculator.input('7')" class="btn">7</q-btn>
    <q-btn @click="calculator.input('8')" class="btn">8</q-btn>
    <q-btn @click="calculator.input('9')" class="btn">9</q-btn>
    <q-btn @click="calculator.input('*')" class="btn">*</q-btn>
    <q-btn @click="calculator.input('4')" class="btn">4</q-btn>
    <q-btn @click="calculator.input('5')" class="btn">5</q-btn>
    <q-btn @click="calculator.input('6')" class="btn">6</q-btn>
    <q-btn @click="calculator.input('-')" class="btn">-</q-btn>
    <q-btn @click="calculator.input('1')" class="btn">1</q-btn>
    <q-btn @click="calculator.input('2')" class="btn">2</q-btn>
    <q-btn @click="calculator.input('3')" class="btn">3</q-btn>
    <q-btn @click="calculator.input('+')" class="btn">+</q-btn>
    <q-btn @click="calculator.input('0')" class="column-2 btn">0</q-btn>
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

class Calculator {
  private opt1: '+' | '-' | '*' | '/' | null;
  private opt2: '+' | '-' | '*' | '/' | null = null
  private opr1: number | null = null
  private opr2: number | null = null
  private opr3: number | null = null
  private display: string | number = 0

  public constructor() {
    this.opt1 = null
    this.opt2 = null

    this.opr1 = null
    this.opr2 = null
    this.opr3 = null
    this.display = 0
  }

  public getDisplay() {
    return this.display
  }

  public clear() {
    this.opt1 = null
    this.opt2 = null

    this.opr1 = null
    this.opr2 = null
    this.opr3 = null
    this.display = 0
  }

  private calculate(opr1: number, opr2: number, opt: '+' | '-' | '*' | '/'): number {
    console.log('calculate', opr1, opr2, opt)
    switch (opt) {
      case '+':
        return opr1 + opr2
      case '-':
        return opr1 - opr2
      case '*':
        return opr1 * opr2
      case '/':
        console.log('나누기', opr2)
        if (opr2 === 0) {

          throw new Error('0으로 못 나눔')

        }
        else {
          return opr1 / opr2
        }
    }
  }

  private calculate2(opr1: number, opr2: number, opr3: number | null, opt1: '+' | '-' | '*' | '/', opt2: '+' | '-' | '*' | '/' | null) {
    if (opt1 && opt2 && opr3) {
      if (opt2 === '*' || opt2 === '/') {
        const tmp = this.calculate(opr2, opr3, opt2)
        return this.calculate(opr1, tmp, opt1)
      } else {
        const tmp = this.calculate(opr1, opr2, opt1)
        return this.calculate(tmp, opr3, opt2)
      }
    }
    else {
      return this.calculate(opr1, opr2, opt1)
    }
  }

  public input(val: string) {
    try {
      switch (val) {
        case 'AC':
          this.clear()
          break
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          if (this.opt2) {
            const stringVal = String(this.opr3 || 0) + val
            this.opr3 = Number(stringVal)
            this.display = this.opr3
          } else if (this.opt1) {
            const stringVal = String(this.opr2 || 0) + val
            this.opr2 = Number(stringVal)
            this.display = this.opr2
          } else {
            const stringVal = String(this.opr1 || 0) + val
            this.opr1 = Number(stringVal)
            this.display = this.opr1
          }
          break
        case '+':
        case '-':
        case '*':
        case '/':
          if (this.opr1 && this.opr2 && this.opr3 && this.opt1 && this.opt2) {
            this.opr1 = this.calculate2(this.opr1, this.opr2, this.opr3, this.opt1, this.opt2)
            this.opr2 = null
            this.opr3 = null

            this.opt1 = val
            this.opt2 = null

            this.display = this.opr1
          } else if (this.opr1 && this.opr2 && this.opt1) {
            if (val === '+' || val === '-') {
              this.opr1 = this.calculate2(this.opr1, this.opr2, this.opr3, this.opt1, this.opt2)
              this.opr2 = null

              this.opt1 = val

              this.display = this.opr1
            }
            else if (val === '*' || val === '/') {
              this.opt2 = val
            }

          } else {
            this.opt1 = val
          }
          break
        case '=':
          if (typeof this.opr1 === 'number' && typeof this.opr2 === 'number' && this.opt1) {
            this.opr1 = this.calculate2(this.opr1, this.opr2, this.opr3, this.opt1, this.opt2)
            this.opr2 = null
            this.opr3 = null

            this.opt1 = null
            this.opt2 = null

            this.display = this.opr1
          }
          break

      }
      console.log(this.opr1, this.opr2, this.opr3)
      console.log(this.opt1, this.opt2)

    } catch (e: any) {
      console.error(e.message)
      if (e.message === '0으로 못 나눔') {
        this.display = '숫자 아님'
      }
      else {
        alert('알 수 없는 에러')
      }
    }
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
