<template>
    <div>
    <v-select v-model="roleType" :items="roles" label="Slot" clearable></v-select>

    <v-data-table
            :headers="headers"
            :items="filteredUsers"
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>My CRUD</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <user-card :prop-user="selectedUser"></user-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
    </div>
</template>

<script>
    import UserCard from "./UserCard";


    export default {
        name: 'Users',
        components:{ UserCard },
        data: () => ({
            selectedUser:null,
            roles:['ROLE_USER','ROLE_ADMIN','ALL'],
            roleType:'ALL',
            dialog: false,
            headers: [
                { text: 'Login', value: 'username' },
                { text: 'Email', value: 'email' },
                { text: 'Actions', value: 'actions', sortable: false },
            ]
        }),

        methods: {
            //
            editItem (item) {
                this.selectedUser= item;
                this.dialog=true;
            },

            deleteItem (item) {
                console.log(item)
                // confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close () {

            },

            save () {

            },
        },


        computed: {
            filteredUsers(){
                if(this.roleType==='ALL'){
                    return this.users
                }
                else {
                    return this.users.filter((user)=>user.role.name===this.roleType)
                }
            },

            users:{
                get () {
                    return this.$store.state.usersModule.users
                },
                set (val) {
                    this.$store.usersModule.state.users = val
                }
            }

        },

        created () {
            this.$store.dispatch('usersModule/getUsersAction')
                .catch(error=>{
                    alert("Невозможно подгрузить юзеров"+error)
                });
        },
    }
</script>
