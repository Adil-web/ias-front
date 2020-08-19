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
                        isPowerBI: true,
                        icon: ' mdi-av-timer',
                        text: 'Стратегическое управление',
                        path: 'bi',
                        src: 'https://app.powerbi.com/view?r=eyJrIjoiNzcxNWJjNzUtOTUyMS00ZTg2LTllMzYtNDdjN2ZkNzQ4ZjBlIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
                    },
                    {
                        isPowerBI: true,
                        icon: 'mdi-chart-areaspline',
                        text: 'Мониторинг социально-экономического развития',
                        path: 'bi',
                        src: 'https://app.powerbi.com/view?r=eyJrIjoiNTdjODUyMDItOTczNi00N2ZmLTk1YzktNDg0Nzk5MDQxYTUxIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
                    },
                    {
                        isPowerBI: true,
                        icon: 'mdi-currency-kzt',
                        text: 'Бюджет',
                        path: 'bi',
                        src: 'https://app.powerbi.com/view?r=eyJrIjoiMDI4MjAzMWMtNTJlYy00NzI3LTlkZmUtZjc2NDIwNTdkNWI0IiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
                    },
                    {
                        isPowerBI: true,
                        icon: 'mdi-wan',
                        text: 'Прогноз ВРП',
                        path: 'bi',
                        src: 'https://app.powerbi.com/view?r=eyJrIjoiZGNkNDA4MDUtNDRkNC00YmYzLTg0NGQtOGYxNGI4NmU3YWE5IiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
                    },
                    {
                        isPowerBI: true,
                        icon: 'mdi-offer',
                        text: 'Бюджетные инвестиционные проекты',
                        path: 'bi',
                        src: 'https://app.powerbi.com/view?r=eyJrIjoiYTkyY2E5NjktODJiZi00YmRmLWEwMzUtMTMzY2Q2MzFjZjY0IiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
                    },
                    {
                        isPowerBI: true,
                        icon: 'mdi-school-outline',
                        text: 'С дипломом в село',
                        path: 'bi',
                        src: 'https://app.powerbi.com/view?r=eyJrIjoiNWM3OTg3NTMtZTYzMS00NmQwLWI1OWQtN2FkOThlYzA3YzcyIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
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
                        isPowerBI: true,
                        icon: 'mdi-apps',
                        text: 'Цифровые социальные объекты',
                        path: 'bi',
                        src: 'https://app.powerbi.com/view?r=eyJrIjoiYzZiZWMzM2MtOGQ5ZS00M2EzLWExZTQtNjkwNTczYmYyNGExIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'

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
                        isPowerBI: true,
                        src: 'https://app.powerbi.com/view?r=eyJrIjoiMGQyZjczOGMtMmZkMi00MjA0LTkzZjktMDFiZTQwMGQ1YjdhIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
                    },
                    {
                        icon: 'mdi-school',
                        text: 'Образование',
                        path: '',
                        isPowerBI: false,
                        src: '',
                        children: [
                            {
                                icon: 'mdi-cast-education',
                                text: 'Образование',
                                path: 'bi',
                                isPowerBI: true,
                                src: 'https://app.powerbi.com/view?r=eyJrIjoiY2I5NWZiZDYtYTNlMS00ZWFmLTkwYjktODdjYmE1ZDY5YzEzIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
                            },
                            {
                                icon: 'mdi-chart-bar',
                                text: 'Оценка состояния образования',
                                path: 'bi',
                                isPowerBI: true,
                                src: 'https://app.powerbi.com/view?r=eyJrIjoiMTMxOWI5NzktZTNhMi00MWQwLWEzMjAtNjNmODRjZjZkZGEyIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
                            },
                        ]
                    },
                    {
                        isPowerBI: true,
                        icon: 'mdi-message-processing',
                        text: 'Координация занятости и социальная защита',
                        path: 'bi',
                        src: 'https://app.powerbi.com/view?r=eyJrIjoiYjMyM2UzMmYtODExOS00MjA1LTlhOTQtZGNhYjc0YzIxMmRkIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
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
            })
        }

    }
</script>

<style scoped>

</style>
