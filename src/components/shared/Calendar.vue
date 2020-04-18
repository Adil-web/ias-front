<template>
    <div id="app">
        <year-calendar
                v-model="year"
                :activeDates.sync="activeDates"
                @toggleDate="toggleDate"
                :lang="lang"
                prefixClass="your_customized_wrapper_class"
                :activeClass="activeClass"
        ></year-calendar>
    </div>
</template>

<script>
    import YearCalendar from './YearCalendar.vue'

    export default {
        name: 'app',
        components: {
            YearCalendar
        },
        data () {
            return {
                lang: 'en', // 'en', 'tw', 'pt'
                year: 2020,
                activeDates: [],
                activeClass: '',
            }
        },
        methods: {
            toggleDate (dateInfo) {
                console.log(dateInfo)
            },
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #app {
        padding: 60px;
        background-color: red;
    }

</style>
