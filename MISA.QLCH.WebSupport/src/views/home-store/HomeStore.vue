<template src="./HomeStore.html"></template>
<style lang="scss" scoped src="./HomeStore.scss"></style>
<script lang="ts">
import Log from '@library-src/utilities/Log';
import { Ref, ref } from 'vue';


export default {

    setup() {
        const displayItemWarehouse: Ref<boolean> = ref(false)
        return {
            displayItemWarehouse
        }
    },
    methods: {
        showChosseWarehouse() {
            try {
                const me = this;
                me.displayItemWarehouse = true
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        }
    }
}
</script>