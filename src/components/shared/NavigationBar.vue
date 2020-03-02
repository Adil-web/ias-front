<template>
    <v-container>
        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="blue darken-3"
                dark
        >
            <v-app-bar-nav-icon @click.stop="leftBar =!leftBar" />
            <v-toolbar-title
                    style="width: 500px"
                    class="ml-0 pl-4"
            >
                <span class="hidden-sm-and-down">Информационно-аналитическая система</span>
            </v-toolbar-title>
            <v-spacer />
            <v-btn icon>
                <v-icon>mdi-apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-btn icon @click="logout">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>
    </v-container>

</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "NavigationBar",
        computed:{
            leftBar:{
                get () {
                    return this.$store.state.drawer
                },
                set (val) {
                    return this.$store.state.drawer = val
                }
            },


        },


        methods:{
            ...mapMutations([
                'logoutMutation'
            ]),


            logout(){
                this.logoutMutation();
                this.$router.push('/login')
            }
        }


    }
</script>

<style scoped>

</style>
