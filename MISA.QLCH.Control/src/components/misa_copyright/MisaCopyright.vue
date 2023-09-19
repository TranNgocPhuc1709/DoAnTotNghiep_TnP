<template>
    <span class="text-copyright"> Copyright © 2017 - {{ nowYear }} MISA JSC&nbsp;&nbsp;
        <a v-if="linkWebsiteMISA" :href="`https://` + linkWebsiteMISA" target="_blank" class="link-misa-href">{{ linkWebsiteMISA }}</a>
    </span>
</template>

<style scoped lang="scss">
.text-copyright {
    color: white
}

.link-misa-href {
    text-decoration: none;
    color: white;
}
</style>

<script lang="ts">
export default {
    props: {
        websiteMISA: {
            type: String,
            require: true
        }
    },
    setup(props) {
        const now = new Date();
        const nowYear = now.getFullYear();
        let linkWebsiteMISA = "www.misa.com.vn";
        if (props.websiteMISA) {
            linkWebsiteMISA = props.websiteMISA;
        }
        return {
            nowYear,
            linkWebsiteMISA
        }
    }
}
</script>