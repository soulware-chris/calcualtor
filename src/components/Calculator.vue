<template>
  <div class="calculator">
    <div class="display column-4">
      {{ calculator.display() }}
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
import { Calculator } from 'src/model/Calculator'

export default defineComponent({
  name: 'ExampleComponent',
  setup() {
    const calculator = reactive(new Calculator())

    return {
      calculator
    }
  }
})



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
