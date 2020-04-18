<template>
    <div id="calendar">
        <year-calendar
                v-model="year"
                :activeDates.sync="activeDates"
                @toggleDate="toggleDate"
                :lang="locale"
                prefixClass="your_customized_wrapper_class"
        ></year-calendar>
    </div>
</template>

<script>
    import dayjs from 'dayjs'

    import YearCalendar from './YearCalendar.vue'

    export default {
        name: 'app',
        components: {
            YearCalendar
        },
        data () {
            return {
                year: dayjs().year(),
                activeDates: []
            }
        },
        methods: {
            toggleDate (dateInfo) {
                console.log(dateInfo)
            },
        },

        computed:{
            locale: {
                get () {
                    return this.$i18n.locale
                },
                set (val) {
                    this.$i18n.locale = val
                }
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #calendar {
        padding: 60px;
        background-color: red;
    }

</style>
