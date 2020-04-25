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

            <v-dialog v-model="dialog" max-width="500">
                <v-card>
                    <v-container>
                        <v-form @submit.prevent="addEvent">
                            <v-text-field v-model="name" type="text" label="event name (required)"></v-text-field>
                            <v-text-field v-model="details" type="text" label="detail"></v-text-field>
<!--                            <v-text-field v-model="start" type="date" label="start (required)"></v-text-field>-->
                            <v-text-field v-model="end" type="date" label="end (required)"></v-text-field>
                            <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                                create event
                            </v-btn>
                        </v-form>
                    </v-container>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDate" max-width="500">
                <v-card>
                    <v-container>
                        <v-form @submit.prevent="addEvent">
                            <v-text-field v-model="name" type="text" label="event name (required)"></v-text-field>
                            <v-text-field v-model="details" type="text" label="detail"></v-text-field>
<!--                            <v-text-field v-model="start" type="date" label="start (required)"></v-text-field>-->
                            <v-text-field v-model="end" type="date" label="end (required)"></v-text-field>
                            <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                                create event
                            </v-btn>
                        </v-form>
                    </v-container>
                </v-card>
            </v-dialog>

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
                <v-menu
                        v-model="selectedOpen"
                        :close-on-content-click="false"
                        :activator="selectedElement"
                        full-width
                        offset-x
                >
                    <v-card color="grey lighten-4" :width="350" flat>
                        <v-toolbar :color="selectedEvent.color" dark>
                            <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                            <div class="flex-grow-1"></div>
                        </v-toolbar>

                        <v-card-text>
                            <form v-if="currentlyEditing !== selectedEvent.id">
                                {{ selectedEvent.details }}
                            </form>
                            <form v-else>
                                <textarea-autosize
                                        v-model="selectedEvent.details"
                                        type="text"
                                        style="width: 100%"
                                        :min-height="100"
                                        placeholder="add note">
                                </textarea-autosize>
                            </form>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn text color="secondary" @click="selectedOpen = false">
                                close
                            </v-btn>
                            <v-btn v-if="currentlyEditing !== selectedEvent.id" text @click.prevent="editEvent(selectedEvent)">
                                edit
                            </v-btn>
                            <v-btn text v-else type="submit" @click.prevent="updateEvent(selectedEvent)">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
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


            name: null,
            details: null,
            start: null,
            end: null,
            color: '#1976D2', // default event color
            currentlyEditing: null,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: [],
            dialog: false,
            dialogDate: false

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

            getEvents () {
                let snapshot = user_api.get_eventsApi().then(res=>{
                    this.events = res.data;
                    console.log(this.events[0])
                    console.log(this.events[0])
                    console.log(this.events[0])
                    console.log(this.events[0])

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
                return event.color
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

                    console.log(this.end)
                    console.log(dayjs(this.end))
                    console.log(dayjs(this.end).format('YYYY-MM-DD'))
                    console.log(new Date(this.end))

                     user_api.addEventApi(
                         {
                             name: this.name,
                             details: this.details,
                             start: dayjs(this.end).format('YYYY-MM-DD') ,
                             expire_date: this.end
                        }
                     );
                    this.name = '';
                    this.details = '';
                    this.end = '';
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
            formatDate (a, withTime) {
                return withTime
                    ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
                    : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
            },
        },
    }
</script>
