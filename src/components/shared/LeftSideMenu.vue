<template>
    <v-container>
        <v-navigation-drawer
                v-model="leftBar"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
        >
            <v-list dense>
                <template v-for="item in items">
                    <v-row
                            v-if="item.heading"
                            :key="item.heading"
                            align="center"
                    >
                        <v-col cols="6">
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-col>
                        <v-col
                                cols="6"
                                class="text-center"
                        >
                            <a
                                    href="#!"
                                    class="body-2 black--text"
                            >EDIT</a>
                        </v-col>
                    </v-row>
                    <v-list-group
                            v-else-if="item.children"
                            :key="item.text"
                            v-model="item.model"
                            :prepend-icon="item.model ? item.icon : item['icon-alt']"
                            append-icon=""
                    >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ item.text }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item
                                v-for="(child, i) in item.children"
                                :key="i"
                                link
                        >
                            <v-list-item-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ child.text }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item
                            v-else
                            :key="item.text"
                            link
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                               {{ item.text }}
                            </v-list-item-title>
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
                { icon: 'si-glyph:money-coin', text: 'Бюджет' },
                { icon: 'mdi-settings', text: 'Прогноз ВРП' },
                { icon: 'mdi-settings', text: 'Бюджетные инвестиционные проекты>' },
                { icon: 'mdi-settings', text: 'С дипломом в село' },
                { icon: 'mdi-settings', text: 'Моинторинг СНП' },
                // {
                //     icon: 'mdi-chevron-up',
                //     'icon-alt': 'mdi-chevron-down',
                //     text: 'Labels',
                //     model: true,
                //     children: [
                //         { icon: 'mdi-plus', text: 'Create label' },
                //     ],
                // },
                // {
                //     icon: 'mdi-chevron-up',
                //     'icon-alt': 'mdi-chevron-down',
                //     text: 'More',
                //     model: false,
                //     children: [
                //         { text: 'Import' },
                //         { text: 'Export' },
                //         { text: 'Print' },
                //         { text: 'Undo changes' },
                //         { text: 'Other contacts' },
                //     ],
                // },
                { icon: 'mdi-settings', text: 'Государственно-частное партнерство' },
                { icon: 'mdi-message', text: 'Цифровые социальные объекты' },
                { icon: 'mdi-help-circle', text: 'Строящиеся социальные объекты' },
                { icon: 'mdi-cellphone-link', text: 'Здравоохранение' },
                { icon: 'mdi-keyboard', text: 'Координация занятости и социальная защита' },
                { icon: 'mdi-keyboard', text: 'Сельское хозяйство' },
                { icon: 'mdi-keyboard', text: 'Государственноые программы' },
                { icon: 'mdi-keyboard', text: 'Задачи группы' },
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
