<template>
    <v-container>
        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="green darken-3"
                dark
        >
            <v-app-bar-nav-icon @click.stop="leftBar =!leftBar" />
            <v-toolbar-title style="width: 500px" class="ml-0 pl-4">
                <span class="hidden-sm-and-down">  {{ $t('title') }}</span>
            </v-toolbar-title>
            <v-spacer />

            <v-btn icon @click="$router.push('/admin/calendar')">
                <v-icon>mdi-calendar-month-outline</v-icon>
            </v-btn>



            <v-btn icon  @click="openCloseProfile">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>


            <v-menu offset-y open-on-hover>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn depressed v-bind="attrs" v-on="on" color="green darken-3">
                        {{ shortLangName }}
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(item, index) in languages" :key="index"   @click="changeLocale(item.code)">
                        <v-list-item-title>{{item.shortName}}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>


            <v-btn icon @click="logout">
                <v-icon>mdi-logout</v-icon>
            </v-btn>


            <v-dialog v-if="profile" v-model="profile" persistent width="500">
                <profile v-on:close-user-card="openCloseProfile"></profile>
            </v-dialog>
        </v-app-bar>
    </v-container>

</template>

<script>
    import Profile from "@/components/shared/Profile";
    import {mapMutations} from "vuex";
    // import user_api from "../../api/user_api";

    export default {
        name: "AdminNavigationBar",
        components:{
            Profile
        },

        data:()=>({
            profile:false,
        }),


        methods:{
            ...mapMutations([
                'logoutMutation'
            ]),

            logout(){
                this.logoutMutation();
                this.$router.push('/login')
            },

            changeLocale (code) {
                this.locale = code;
                sessionStorage.setItem('ias-locale', code);
            },

            openCloseProfile(){
                this.profile=!this.profile
            },
        },



        computed:{
            user:{
                get(){
                    return this.$store.state.user;
                }
            },

            leftBar:{
                get () {
                    return this.$store.state.drawer
                },
                set (val) {
                    return this.$store.state.drawer = val
                }
            },

            shortLangName () {
                for (let lang of this.languages) {
                    if (lang.code === this.locale) {
                        return lang.shortName
                    }
                }
                return '?'
            },

            languages () {
                return this.$store.state.langList
            },

            locale: {
                get () {
                    return this.$i18n.locale
                },
                set (val) {
                    this.$i18n.locale = val
                }
            }
        }





    }
</script>

<style scoped>

</style>
