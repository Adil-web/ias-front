<template>
    <v-container>
        <v-navigation-drawer
                v-model="leftBar"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
        >
            <v-list dense>
                <template v-for="item in items">
                    <v-list-item
                            :key="item.text"
                            link
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-action-text>
                                {{ item.text }}
                            </v-list-item-action-text>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

    </v-container>
</template>

<script>
    export default {
        name: "LeftSideMenu",

        data: () =>({

            miniVariant: false,
            expandOnHover: false,

            items: [
                { icon: 'mdi-alarm-light-outline', text: 'Оперативный мониторинг' },
                { icon: ' mdi-av-timer', text: 'Стратегическое управление' },
                { icon: 'mdi-chart-areaspline', text: 'Мониторинг социально-экономического развития' },
                { icon: 'mdi-currency-eur', text: 'Бюджет' },
                { icon: 'mdi-wan', text: 'Прогноз ВРП' },
                { icon: 'mdi-offer', text: 'Бюджетные инвестиционные проекты' },
                { icon: 'mdi-school-outline', text: 'С дипломом в село' },
                { icon: 'mdi-home-map-marker ', text: 'Моинторинг СНП' },
                { icon: 'mdi-handshake', text: 'Государственно-частное партнерство' },
                { icon: 'mdi-apps', text: 'Цифровые социальные объекты' },
                { icon: 'mdi-apps', text: 'Строящиеся социальные объекты' },
                { icon: 'mdi-heart-pulse', text: 'Здравоохранение' },
                { icon: 'mdi-school', text: 'Образование' },
                { icon: 'mdi-message-processing', text: 'Координация занятости и социальная защита' },
                { icon: 'mdi-tractor', text: 'Сельское хозяйство' },
                { icon: 'mdi-file-table-box-multiple-outline ', text: 'Государственноые программы' },
                { icon: '', text: 'Задачи группы' },
            ],
        }),
        computed:{
            leftBar:{
                get() {
                    return this.$store.state.drawer
                },
                set (val) {
                    return this.$store.state.drawer = val
                }
            },

        }

    }
</script>

<style scoped>

</style>
