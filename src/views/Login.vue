<template>
<v-app>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field  prepend-icon="mdi-logout" name="login" label="Login" type="text" v-model="username"></v-text-field>
                            <v-text-field id="password" prepend-icon="mdi-bell" name="password" label="Password" type="password" v-model="password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" v-on:click="submit">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</v-app>

</template>

<script>
    export default {
        name: "Login",
        data:()=>({
            username:'',
            password:''
    }),

        methods:{
            submit(){
               this.$store.dispatch('loginAction',{username:this.username, password:this.password})
                   .then(response=>{
                   console.log(response)
                   this.$router.push('home')
               }).catch(error=>{
                   console.log(error)
               })


            }
        }
    }
</script>

<style scoped>


</style>
