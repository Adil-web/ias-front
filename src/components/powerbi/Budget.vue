<template>
        <iframe
                width="100%"
                height="100%"
                :src="biSrc"
                frameborder="0"
                allowFullScreen="true"
        >

        </iframe>


</template>

<script>
    export default {
        name: "SocialProtection",
        props:{
                biSrc:{
                        type: String,
                        default: () => ''
                }
        },
    }
</script>

<style scoped>

</style>
