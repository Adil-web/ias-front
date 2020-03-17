<template>
<v-app>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field  prepend-icon="mdi-logout" name="login" placeholder="Login" type="text" v-model="username"></v-text-field>
                            <v-text-field id="password" prepend-icon="mdi-security" name="password" placeholder="Password" type="password" v-model="password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" v-on:click="submit">Login</v-btn>
                    </v-card-actions>
                    <v-alert v-if="errorMessage"  dense type="error">{{errorMessage}}</v-alert>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</v-app>

</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "Login",
        data:()=>({
            username:'',
            password:'',
            errorMessage:null,
            rolesRoutes: {
                'ROLE_USER': '/main/home',
                'ROLE_ADMIN':'/admin/users'
            }
    }),

        methods:{
            submit(){
               this.$store.dispatch('loginAction',{username:this.username, password:this.password})
                   .then(()=>{
                      this.routeTo(this.rolesRoutes[this.user.role.name]);
                }).catch(er=>{
                    this.errorMessage=er.response.data.message;
               })


            },

            routeTo(route){
                this.$router.push(route);

            },

            ...mapMutations([
                'logoutMutation'
            ]),

            logout(){
                this.logoutMutation();
            },
        },


        computed:{
            user:{
                get(){
                    return  this.$store.state.user;
                }
            }
        },
        created() {
            this.logout();

        }
    }
</script>

<style scoped>


</style>
