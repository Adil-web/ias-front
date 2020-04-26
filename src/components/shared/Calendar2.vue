<template>
    <v-row class="fill-height">
        <v-col>
            <v-sheet height="64">
                <v-toolbar flat color="white">
                    <v-btn color="primary" dark @click.stop="dialog = true">
                        New Event
                    </v-btn>
                    <v-btn outlined class="mx-4" @click="setToday">
                        Today
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="prev">
                        <v-icon small>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="next">
                        <v-icon small>mdi-chevron-right</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-menu bottom right>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                    outlined
                                    color="grey darken-2"
                                    v-on="on"
                            >
                                <span>{{ typeToLabel[type] }}</span>
                                <v-icon right>mdi-menu-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="type = 'day'">
                                <v-list-item-title>Day</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'month'">
                                <v-list-item-title>Month</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>
            </v-sheet>

            <v-dialog v-model="dialog" width="1000">
                <v-card height="400">
                    <v-container>
                        <template>
                            <v-row align="stretch">
                                <v-col>
                                    <v-form
                                            @submit.prevent="addEvent"
                                            ref="form"
                                            v-model="valid"
                                            :lazy-validation="lazy"
                                    >
                                        <v-text-field
                                                v-model="name"
                                                :counter="10"
                                                :rules="nameRules"
                                                label="Name"
                                                required
                                        ></v-text-field>

                                        <v-text-field
                                                v-model="details"
                                                label="Описание"
                                                required
                                        ></v-text-field>

                                        <v-menu
                                                ref="menu1"
                                                v-model="menu1"
                                                :close-on-content-click="false"
                                                transition="scale-transition"
                                                offset-y
                                                max-width="290px"
                                                min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                        v-model="dateFormatted"
                                                        label="Date"
                                                        hint="MM/DD/YYYY format"
                                                        persistent-hint
                                                        prepend-icon="mdi-calendar-import"
                                                        @blur="end = parseDate(dateFormatted)"
                                                        v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="end" no-title @input="menu1 = false"></v-date-picker>
                                        </v-menu>

                                        <v-checkbox
                                                v-model="completed"
                                                label="Выполнено?"
                                        ></v-checkbox>


                                        <v-btn
                                                :disabled="!valid"
                                                color="success"
                                                class="mr-4"
                                                type="submit"
                                                @click.stop="dialog = false"

                                        >
                                            добавить
                                        </v-btn>

                                        <v-btn
                                                color="error"
                                                class="mr-4"
                                                @click="reset"
                                        >
                                            Reset Form
                                        </v-btn>

                                        <v-btn
                                                color="warning"
                                                @click.stop="dialog=false"
                                        >
                                            Закрыть
                                        </v-btn>

                                    </v-form>

                                </v-col>
                                <v-col>
                                    <v-file-input
                                            v-model="files"
                                            placeholder="Upload your documents"
                                            label="File input"
                                            multiple
                                            prepend-icon="mdi-paperclip"
                                    >
                                        <template v-slot:selection="{ text }">
                                            <v-chip
                                                    small
                                                    label
                                                    color="primary"
                                            >
                                                {{ text }}
                                            </v-chip>
                                        </template>
                                    </v-file-input>

<!--                                    <v-switch v-model="valid" class="ma-4" label="Valid" readonly></v-switch>-->
<!--                                    <v-switch v-model="lazy" class="ma-4" label="Lazy"></v-switch>-->
                                </v-col>
                            </v-row>
                        </template>
                    </v-container>
                </v-card>
            </v-dialog>
<!--            <v-dialog v-model="dialog" max-width="500">-->
<!--                -->
<!--            </v-dialog>-->

            <v-sheet height="600">
                <v-calendar
                        ref="calendar"
                        v-model="focus"
                        color="primary"
                        :events="events"
                        :event-color="getEventColor"
                        :now="today"
                        :type="type"
                        @click:event="showEvent"
                        @click:more="viewDay"
                        @click:date="viewDay"
                        @change="updateRange"
                        locale="ru"
                ></v-calendar>
<!--                <v-menu-->
<!--                        v-model="selectedOpen"-->
<!--                        :close-on-content-click="false"-->
<!--                        :activator="selectedElement"-->
<!--                        full-width-->
<!--                        offset-x-->
<!--                >-->
<!--                    <v-card color="grey lighten-4" :width="350" flat>-->
<!--                        <v-toolbar :color="selectedEvent.color" dark class="align-items">-->
<!--                            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>-->
<!--                            <v-spacer></v-spacer>-->
<!--                            <v-btn @click="deleteEvent(selectedEvent.id)" icon>-->
<!--                                <v-icon>mdi-pencil</v-icon>-->
<!--                            </v-btn>-->
<!--                            <v-btn @click="deleteEvent(selectedEvent.id)" icon>-->
<!--                                <v-icon>mdi-delete</v-icon>-->
<!--                            </v-btn>-->
<!--&lt;!&ndash;                            <div class="flex-grow-1"></div>&ndash;&gt;-->
<!--                        </v-toolbar>-->

<!--                        <v-card-text>-->
<!--                            <form v-if="currentlyEditing !== selectedEvent.id">-->
<!--                                {{ selectedEvent.details }}-->
<!--                            </form>-->
<!--                            <form v-else>-->

<!--                                <v-textarea-->
<!--                                        v-model="selectedEvent.details"-->
<!--                                        type="text"-->
<!--                                        style="width: 100%"-->
<!--                                        :min-height="100"-->
<!--                                        placeholder="add note">-->
<!--                                </v-textarea>-->
<!--                            </form>-->
<!--                        </v-card-text>-->

<!--                        <v-card-actions>-->
<!--                            <v-btn text color="secondary" @click="selectedOpen = false">-->
<!--                                close-->
<!--                            </v-btn>-->
<!--                            <v-btn v-if="currentlyEditing !== selectedEvent.id" text @click.prevent="editEvent(selectedEvent)">-->
<!--                                edit-->
<!--                            </v-btn>-->
<!--                            <v-btn text v-else type="submit" @click.prevent="updateEvent(selectedEvent)">-->
<!--                                Save-->
<!--                            </v-btn>-->
<!--                        </v-card-actions>-->
<!--                    </v-card>-->



<!--                </v-menu>-->
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
    import dayjs from 'dayjs'
    import user_api from "../../api/user_api";

    export default {
        data: () => ({
            focus: '',
            type: 'month',
            typeToLabel: {
                month: 'Month',
                day: 'Day'
            },

            valid: true,
            lazy:false,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            name: null,
            details: null,
            start: null,
            end: null,
            completed:false,

            redColor: '#F44336',
            greenColor: '#4CAF50',
            currentlyEditing: null,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: [],

            menu1:false,
            dialog: false,
            dateFormatted:null

        }),
        computed: {
            title () {
                const { start, end } = this
                if (!start || !end) {
                    return ''
                }
                const startMonth = this.monthFormatter(start)
                const startYear = start.year;
                const startDay = start.day + this.nth(start.day)

                switch (this.type) {
                    case 'month':
                        return `${startMonth} ${startYear}`
                    case 'day':
                        return `${startMonth} ${startDay} ${startYear}`
                }
                return ''
            },
            monthFormatter () {
                return this.$refs.calendar.getFormatter({
                    timeZone: 'UTC', month: 'long',
                })
            },
        },
        mounted () {
            this.getEvents();
            // this.$refs.calendar.checkChange()
        },


        methods: {

            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
            },

            getEvents () {
                 user_api.get_eventsApi().then( (res)=>{
                    this.events = res.data;
                });

            },
            setDialogDate( { date }) {
                this.dialogDate = true
                this.focus = date
            },

            viewDay ({ date }) {
                this.focus = date;
                this.type = 'day'
            },
            getEventColor (event) {
                return event.completed? event.color = this.greenColor:event.color = this.redColor
            },
            setToday () {
                this.focus = this.today
            },
            prev () {
                this.$refs.calendar.prev()
            },
            next () {
                this.$refs.calendar.next()
            },


            addEvent () {
                if (this.name && this.end) {
                     user_api.addEventApi(
                         {
                             name: this.name,
                             details: this.details,
                             end: this.end,
                             completed: this.completed
                         }
                     );
                    this.name = '';
                    this.details = '';
                    this.end = '';
                    this.completed = false
                } else {
                    alert('You must enter event name, start, and end time')
                }
            },
            editEvent (ev) {
                this.currentlyEditing = ev.id
            },
            async updateEvent (ev) {
                await db.collection('calEvent').doc(this.currentlyEditing).update({
                    details: ev.details
                })
                this.selectedOpen = false,
                    this.currentlyEditing = null
            },
            async deleteEvent (ev) {
                await db.collection("calEvent").doc(ev).delete()
                this.selectedOpen = false,
                    this.getEvents()
            },


            showEvent ({ nativeEvent, event }) {
                const open = () => {
                    this.selectedEvent = event
                    this.selectedElement = nativeEvent.target
                    setTimeout(() => this.selectedOpen = true, 10)
                };

                if (this.selectedOpen) {
                    this.selectedOpen = false
                    setTimeout(open, 10)
                } else {
                    open()
                }
                nativeEvent.stopPropagation()
            },

            updateRange ({ start, end }) {
                this.start = start
                this.end = end
            },
            nth (d) {
                return d > 3 && d < 21
                    ? 'th'
                    : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
            },
            rnd (a, b) {
                return Math.floor((b - a + 1) * Math.random()) + a
            },


            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
        },
        watch: {
            end (val) {
                this.dateFormatted = this.formatDate(this.end)
            },
        },
    }
</script>
