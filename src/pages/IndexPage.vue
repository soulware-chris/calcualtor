<template>
  <q-page class="row items-center justify-evenly">
    <calculator />
  </q-page>
</template>

<script lang="ts">
import Calculator from 'components/Calculator.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { Calculator },
  setup() {
    return {};
  }
});
</script>
