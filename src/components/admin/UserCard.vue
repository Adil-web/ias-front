<template>
    <div>
        <v-card>


            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="user.username" label="username"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="user.email" label="email"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="user.password" label="password (g)"></v-text-field>
                        </v-col>

                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </div>

</template>

<script>
    export default {
        name: "UserCard",


        data:()=>({
            user:null
        }),

        methods:{
            save(){

            },
            close(){

            }

        },

        computed:{
            // users:{
            //     get () {
            //         return this.$store.state.usersModule.users
            //     },
            //     set (val) {
            //         this.$store.usersModule.state.users = val
            //     }
            // },
        },

        created () {


        },
    }
</script>

<style scoped>

</style>
