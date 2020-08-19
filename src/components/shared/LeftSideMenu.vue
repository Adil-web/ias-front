<template>
    <v-container>
        <v-navigation-drawer
                v-model="leftBar"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
                absolute
        >
            <v-list shaped dense>
                <v-list-item-group color="primary">
                    <div v-for="item in items" v-bind:key="item.title">
                        <template  v-if="item.children.length === 0">

                                <v-list-item
                                         @click="routing(item)"
                                        link
                                >
                                    <v-list-item-action>
                                        <v-icon>{{ item.icon }}</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-action-text>
                                            {{ item.title }}
                                        </v-list-item-action-text>
                                    </v-list-item-content>
                                </v-list-item>

                        </template>
                        <v-list-group v-else  :prepend-icon="item.icon">
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-action-text>
                                        {{ item.title }}
                                    </v-list-item-action-text>
                                </v-list-item-content>
                            </template>
                                <v-list-item
                                        @click="routing(child)"
                                        v-for="(child, i) in item.children"
                                        :key="i"
                                        link
                                >

                                    <v-list-item-action>
                                        <v-icon>{{ child.icon }}</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-action-text>
                                            {{ child.title }}
                                        </v-list-item-action-text>
                                    </v-list-item-content>
                                </v-list-item>
                        </v-list-group>
                    </div>
                </v-list-item-group>
            </v-list>
<!--            <template>-->
<!--                <v-list shaped dense>-->
<!--                    <v-list-item-group v-model="item" color="primary">-->
<!--                        <v-list-item-->
<!--                                v-for="(item) in items"-->
<!--                                :key="item.text"-->
<!--                                @click="routing(item)"-->
<!--                                link-->
<!--                        >-->
<!--                            <v-list-item-action>-->
<!--                                <v-icon>{{ item.icon }}</v-icon>-->
<!--                            </v-list-item-action>-->
<!--                            <v-list-item-content>-->
<!--                                <v-list-item-action-text>-->
<!--                                    {{ item.text }}-->
<!--                                </v-list-item-action-text>-->
<!--                            </v-list-item-content>-->
<!--                        </v-list-item>-->
<!--                    </v-list-item-group>-->
<!--                </v-list>-->
<!--            </template>-->
        </v-navigation-drawer>

    </v-container>
</template>

<script>
    import items_api from "../../api/items_api";
    export default {
        name: "LeftSideMenu",

        data: () => {
            return ({

                miniVariant: false,
                expandOnHover: false,
                // items: [],
                item: 19,
                items: [
                    {
                        isPowerBI: false,
                        icon: 'mdi-alarm-light-outline',
                        text: 'Оперативный мониторинг',
                        path: '',
                        src: ''
                    },
                    {
                        isPowerBI: false,
                        icon: ' mdi-av-timer',
                        text: 'Стратегическое управление',
                        path: 'bi',
                        src: ''
                    },
                    {
                        isPowerBI: false,
                        icon: 'mdi-chart-areaspline',
                        text: 'Мониторинг социально-экономического развития',
                        path: 'bi',
                        src: ''
                    },
                    {
                        isPowerBI: false,
                        icon: 'mdi-currency-kzt',
                        text: 'Бюджет',
                        path: 'bi',
                        src: ''
                    },
                    {
                        isPowerBI: false,
                        icon: 'mdi-wan',
                        text: 'Прогноз ВРП',
                        path: 'bi',
                        src: ''
                    },
                    {
                        isPowerBI: false,
                        icon: 'mdi-offer',
                        text: 'Бюджетные инвестиционные проекты',
                        path: 'bi',
                        src: ''
                    },
                    {
                        isPowerBI: false,
                        icon: 'mdi-school-outline',
                        text: 'С дипломом в село',
                        path: 'bi',
                        src: ''
                    },
                    {
                        isPowerBI: false,
                        icon: 'mdi-home-map-marker ',
                        text: 'Моинторинг СНП',
                        src: ''
                    },
                    {

                        isPowerBI: false,
                        icon: 'mdi-handshake',
                        text: 'Государственно-частное партнерство',
                        path: 'calendar',
                        src: ''

                    },
                    {
                        isPowerBI: false,
                        icon: 'mdi-apps',
                        text: 'Цифровые социальные объекты',
                        path: 'bi',
                        src: ''

                    },
                    {
                        isPowerBI: false,
                        icon: 'mdi-apps',
                        text: 'Строящиеся социальные объекты',
                        path: 'gmap',
                        src: ''

                    },
                    {
                        icon: 'mdi-heart-pulse',
                        text: 'Здравоохранение',
                        path: 'bi',
                        isPowerBI: false,
                        src: ''
                    },
                    {
                        icon: 'mdi-school',
                        text: 'Образованиееееее',
                        path: '',
                        isPowerBI: false,
                        src: '',
                        children: [
                            {
                                icon: 'mdi-cast-education',
                                text: 'Образование',
                                path: 'bi',
                                isPowerBI: false,
                                src: ''
                            },
                            {
                                icon: 'mdi-chart-bar',
                                text: 'Оценка состояния образования',
                                path: 'bi',
                                isPowerBI: false,
                                src: ''
                            },
                        ]
                    },
                    {
                        isPowerBI: false,
                        icon: 'mdi-message-processing',
                        text: 'Координация занятости и социальная защита',
                        path: 'bi',
                        src: ''
                    },
                    {
                        isPowerBI: false,
                        icon: 'mdi-tractor',
                        text: 'Сельское хозяйство',
                        src: ''
                    },
                    {
                        isPowerBI: false,
                        icon: 'mdi-file-table-box-multiple-outline ',
                        text: 'Государственноые программы',
                        src: ''
                    },
                    {
                        isPowerBI: false,
                        icon: '',
                        text: 'Задачи группы',
                        src: ''
                    },
                ],
            });
        },
        methods:{
          routing(item){
                  this.$router.push({ name: item.path, params: { id: item.src } });
          },
        },
        computed:{
            leftBar:{
                get() {
                    return this.$store.state.drawer
                },
                set (val) {
                    return this.$store.state.drawer = val
                }
            },

        },

        created() {
            items_api.getMenuItems().then(rs=>{
                this.items = rs.data;
                this.items.map((e, i) => console.log(e))
            })
        }

    }
</script>

<style scoped>

</style>
