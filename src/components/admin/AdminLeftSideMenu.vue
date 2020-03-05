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
                            :to='item.path'
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
        name: "AdminLeftSideMenu",

        data: () =>({

            miniVariant: false,
            expandOnHover: false,

            items: [

                { icon: 'mdi-account', text: 'Пользователи', path:'/users' },


                { icon: 'mdi-bag-checked', text: 'Органицазии' ,path:'/organizations'},

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
