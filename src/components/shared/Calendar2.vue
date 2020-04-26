<template>
    <v-row class="fill-height">
        <v-col>
            <v-sheet height="64">
                <v-toolbar flat color="white">
                    <v-btn color="primary" dark @click.stop="dialog=true">
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
                                            @submit.prevent="saveEvent"
                                            ref="form"
                                            v-model="valid"
                                            :lazy-validation="lazy"
                                    >
                                        <v-text-field
                                                v-model="event.name"
                                                :rules="rules"
                                                label="Name"
                                                required
                                                :readonly="event.id"
                                        ></v-text-field>

                                        <v-text-field
                                                v-model="event.description"
                                                label="Описание"
                                                :rules="rules"
                                                required
                                        ></v-text-field>

                                        <v-menu
                                                ref="menu1"
                                                v-model="menu1"
                                                :close-on-content-click="false"
                                                :return-value.sync="event.end"
                                                transition="scale-transition"
                                                offset-y
                                                max-width="290px"
                                                min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                        v-model="event.end"
                                                        label="Date"
                                                        hint="MM/DD/YYYY format"
                                                        persistent-hint
                                                        prepend-icon="mdi-calendar-import"
                                                        readonly
                                                        required
                                                        :rules="rules"
                                                        v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="event.end" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="$refs.menu1.save(event.end)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>

                                        <v-checkbox
                                                v-model="event.completed"
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
                                            Сбросить форму
                                        </v-btn>

                                        <v-btn
                                                color="warning"
                                                @click.stop="closeEventDialog"
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
    import Vue from 'vue'
    import dayjs from 'dayjs'
    import user_api from "../../api/user_api";

    export default {
        data: () => ({
            start: null,
            end: null,
            focus: '',
            type: 'month',
            typeToLabel: {
                month: 'Month',
                day: 'Day'
            },


            redColor: '#F44336',
            greenColor: '#4CAF50',
            event: {},
            events: [],


            dialog: false,
            valid: true,
            lazy:false,
            rules: [ v => !!v || 'Field is required'],
            menu1: false



        }),
        computed: {
            title () {
                const { start, end } = this;
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
        created () {
            this.getEvents();
        },
        mounted () {
            this.$refs.calendar.checkChange();
        },


        methods: {
            closeEventDialog(){
              this.dialog =false;
              this.eventDataReset();
            },

            eventDataReset(){
                this.event = {};
            },

            saveEvent () {
                if(this.event.id){
                    user_api.editEventApi(this.event)
                        .then((rs)=>{
                            Vue.set(this.events, this.events.findIndex(item=>item.id === rs.data.id), rs.data );
                            this.setFocus(rs.data.end);
                            this.eventDataReset();
                        });
                }
                else{
                    user_api.addEventApi(this.event)
                        .then((rs)=>{
                            this.events.push(rs.data);
                            this.setFocus(rs.data.end);
                            this.eventDataReset();
                        });
                }
            },



            reset () {
                this.$refs.form.reset()
            },

            getEvents () {
                 user_api.get_eventsApi().then((res)=>{
                    this.events = res.data;
                });
            },


            viewDay ({ date }) {
                this.setFocus(date);
                this.type = 'day'
            },
            getEventColor (event) {
                return event.completed? event.color = this.greenColor:event.color = this.redColor
            },
            setToday () {
                this.focus = new Date().toISOString().substr(0,10)
            },
            setFocus(date){
                this.focus = date;
            },
            prev () {
                this.$refs.calendar.prev()
            },
            next () {
                this.$refs.calendar.next()
            },

            showEvent ({ event }) {
                this.event = Object.assign({}, event)
                this.dialog=true;
            },

            updateRange ({ start, end }) {
                this.start = start;
                this.end = end;
            },

            nth (d) {
                return d > 3 && d < 21
                    ? 'th'
                    : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
            },
            rnd (a, b) {
                return Math.floor((b - a + 1) * Math.random()) + a
            },

        },
    }
</script>
