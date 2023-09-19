<template src="./ELineChart.html"></template>
<style lang="scss" scoped src="./ELineChart.scss"></style>
<script lang="ts">
import ELineChart from './ELineChart';
import { Ref, ref } from 'vue';

export default{

  setup() {
    const thisData: Ref<ELineChart> = ref(new ELineChart());
    return { thisData };
  },
        
}
</script>
