<template>
    <v-container>
        <v-navigation-drawer
                v-model="leftBar"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
        >
            <v-list dense>
                <v-list-item-group color="primary">
                    <div v-for="item in items" v-bind:key="item.title">
                        <template  v-if="item.menuItemList.length === 0">

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
                                        v-for="(child, i) in item.menuItemList"
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
        </v-navigation-drawer>

    </v-container>
</template>

<script>
    import items_api from "../../api/items_api";
    export default {
        name: "LeftSideMenu",

        data: () =>({

            miniVariant: false,
            expandOnHover: false,
            items:[]
            // items: [
            //     {
            //         isPowerBI:false,
            //         icon: 'mdi-alarm-light-outline',
            //         title: 'Оперативный мониторинг',
            //         path:'',
            //         src:''
            //     },
            //     {
            //         isPowerBI:true,
            //         icon: ' mdi-av-timer',
            //         title: 'Стратегическое управление',
            //         path: 'bi',
            //         src:'https://app.powerbi.com/view?r=eyJrIjoiNzcxNWJjNzUtOTUyMS00ZTg2LTllMzYtNDdjN2ZkNzQ4ZjBlIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
            //     },
            //     {
            //         isPowerBI:true,
            //         icon: 'mdi-chart-areaspline',
            //         title: 'Мониторинг социально-экономического развития',
            //         path:'bi',
            //         src:'https://app.powerbi.com/view?r=eyJrIjoiNTdjODUyMDItOTczNi00N2ZmLTk1YzktNDg0Nzk5MDQxYTUxIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
            //     },
            //     {
            //         isPowerBI:true,
            //         icon: 'mdi-currency-kzt',
            //         title: 'Бюджет',
            //         path:'bi',
            //         src: 'https://app.powerbi.com/view?r=eyJrIjoiMDI4MjAzMWMtNTJlYy00NzI3LTlkZmUtZjc2NDIwNTdkNWI0IiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
            //     },
            //     {
            //         isPowerBI:true,
            //         icon: 'mdi-wan',
            //         title: 'Прогноз ВРП',
            //         path:'bi',
            //         src:'https://app.powerbi.com/view?r=eyJrIjoiZGNkNDA4MDUtNDRkNC00YmYzLTg0NGQtOGYxNGI4NmU3YWE5IiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
            //     },
            //     {
            //         isPowerBI:true,
            //         icon: 'mdi-offer',
            //         title: 'Бюджетные инвестиционные проекты',
            //         path:'bi',
            //         src:'https://app.powerbi.com/view?r=eyJrIjoiYTkyY2E5NjktODJiZi00YmRmLWEwMzUtMTMzY2Q2MzFjZjY0IiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
            //     },
            //     {
            //         isPowerBI:true,
            //         icon: 'mdi-school-outline',
            //         title: 'С дипломом в село',
            //         path:'bi',
            //         src:'https://app.powerbi.com/view?r=eyJrIjoiNWM3OTg3NTMtZTYzMS00NmQwLWI1OWQtN2FkOThlYzA3YzcyIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
            //     },
            //     {
            //         isPowerBI:false,
            //         icon: 'mdi-home-map-marker ',
            //         title: 'Моинторинг СНП',
            //         src:''
            //     },
            //     {
            //
            //         isPowerBI: false,
            //         icon: 'mdi-handshake',
            //         title: 'Государственно-частное партнерство',
            //         path:'calendar',
            //         src:''
            //
            //     },
            //     {
            //         isPowerBI:true,
            //         icon: 'mdi-apps',
            //         title: 'Цифровые социальные объекты',
            //         path:'bi',
            //         src:'https://app.powerbi.com/view?r=eyJrIjoiYzZiZWMzM2MtOGQ5ZS00M2EzLWExZTQtNjkwNTczYmYyNGExIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
            //
            //     },
            //     {
            //         isPowerBI: false,
            //         icon: 'mdi-apps',
            //         title: 'Строящиеся социальные объекты',
            //         path:'gmap',
            //         src:''
            //
            //     },
            //     {
            //         icon: 'mdi-heart-pulse',
            //         title: 'Здравоохранение',
            //         path:'bi',
            //         isPowerBI:true,
            //         src:'https://app.powerbi.com/view?r=eyJrIjoiMGQyZjczOGMtMmZkMi00MjA0LTkzZjktMDFiZTQwMGQ1YjdhIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
            //     },
            //     {
            //         icon: 'mdi-school',
            //         title: 'Образование',
            //         path:'',
            //         isPowerBI:false,
            //         src:'',
            //         children:[
            //             {
            //                 icon: 'mdi-cast-education',
            //                 title: 'Образование',
            //                 path:'bi',
            //                 isPowerBI:true,
            //                 src:'https://app.powerbi.com/view?r=eyJrIjoiY2I5NWZiZDYtYTNlMS00ZWFmLTkwYjktODdjYmE1ZDY5YzEzIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
            //             },
            //             {
            //                 icon: 'mdi-chart-bar',
            //                 title: 'Оценка состояния образования',
            //                 path:'bi',
            //                 isPowerBI:true,
            //                 src:'https://app.powerbi.com/view?r=eyJrIjoiMTMxOWI5NzktZTNhMi00MWQwLWEzMjAtNjNmODRjZjZkZGEyIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
            //             },
            //         ]
            //     },
            //     {
            //         isPowerBI:true,
            //         icon: 'mdi-message-processing',
            //         title: 'Координация занятости и социальная защита',
            //         path:'bi',
            //         src:'https://app.powerbi.com/view?r=eyJrIjoiYjMyM2UzMmYtODExOS00MjA1LTlhOTQtZGNhYjc0YzIxMmRkIiwidCI6IjU1MDhkZmUzLWYwYWYtNGEyOS1hMjljLTY5N2JhYjIzNDRjNiIsImMiOjl9'
            //     },
            //     {
            //         isPowerBI:false,
            //         icon: 'mdi-tractor',
            //         title: 'Сельское хозяйство',
            //         src:''
            //     },
            //     {
            //         isPowerBI:false,
            //         icon: 'mdi-file-table-box-multiple-outline ',
            //         title: 'Государственноые программы',
            //         src:''
            //     },
            //     {
            //         isPowerBI:false,
            //         icon: '',
            //         title: 'Задачи группы',
            //         src:''
            //     },
            // ],
        }),
        methods:{
            nr(){
              console.log("daa")
            },
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
                // console.log(rs.data)
            })
        }

    }
</script>

<style scoped>

</style>
