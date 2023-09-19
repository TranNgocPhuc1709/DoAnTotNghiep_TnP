<template src="./Errors.html"></template>
<style scoped src="./Errors.scss"></style>
<script lang="ts">
import MisaCopyright from 'qlch_control/MisaCopyright';
export default {
    components: {
        MisaCopyright
    },

    setup() {
        const websiteMISA = import.meta.env.QLCH_WebsiteMISA;
        return {
            websiteMISA
        }
    }
}
</script>