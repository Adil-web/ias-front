<template>
    <div>
    <v-select v-model="roleType" :items="roles" label="Slot" clearable></v-select>
    <v-data-table
            :headers="headers"
            :items="filteredUsers"
            sort-by="calories"
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">

                <v-toolbar-title>Пользователи</v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
<!--                <v-dialog v-model="dialog" max-width="500px">-->
<!--                    <template v-slot:activator="{ on }">-->
<!--                        <v-btn color="green darken-3" dark class="mb-2" v-on="on">создать пользователя</v-btn>-->
<!--                    </template>-->
<!--                    <v-card>-->
<!--                        <v-card-title>-->
<!--                            <span class="headline">{{ formTitle }}</span>-->
<!--                        </v-card-title>-->

<!--                        <v-card-text>-->
<!--                            <v-container>-->
<!--                                <v-row>-->
<!--                                    <v-col cols="12" sm="6" md="4">-->
<!--                                        <v-text-field v-model="editedItem.id" label="ID"></v-text-field>-->
<!--                                    </v-col>-->
<!--                                    <v-col cols="12" sm="6" md="4">-->
<!--                                        <v-text-field v-model="editedItem.name" label="Имя"></v-text-field>-->
<!--                                    </v-col>-->
<!--                                    <v-col cols="12" sm="6" md="4">-->
<!--                                        <v-text-field v-model="editedItem.surname" label="Фамилия"></v-text-field>-->
<!--                                    </v-col>-->
<!--                                    <v-col cols="12" sm="6" md="4">-->
<!--                                        <v-text-field v-model="editedItem.patronymic" label="Отчество"></v-text-field>-->
<!--                                    </v-col>-->
<!--                                    <v-col cols="12" sm="6" md="4">-->
<!--                                        <v-text-field v-model="editedItem.password" label="Пароль"></v-text-field>-->
<!--                                    </v-col>-->
<!--                                    <v-col cols="12" sm="6" md="4">-->
<!--                                        <v-text-field v-model="editedItem.organization" label="Организация"></v-text-field>-->
<!--                                    </v-col>-->
<!--                                    <v-col cols="12" sm="6" md="4">-->
<!--                                        <v-text-field v-model="editedItem.email" label="Э-Почта"></v-text-field>-->
<!--                                    </v-col>-->
<!--                                    <v-col cols="12" sm="6" md="4">-->
<!--                                        <v-text-field v-model="editedItem.gender" label="Пол"></v-text-field>-->
<!--                                    </v-col>-->
<!--                                    <v-col cols="12" sm="6" md="4">-->
<!--                                        <v-text-field v-model="editedItem.position" label="Должность"></v-text-field>-->
<!--                                    </v-col>-->
<!--                                </v-row>-->
<!--                            </v-container>-->
<!--                        </v-card-text>-->

<!--                        <v-card-actions>-->
<!--                            <v-spacer></v-spacer>-->
<!--                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>-->
<!--                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>-->
<!--                        </v-card-actions>-->
<!--                    </v-card>-->
<!--                </v-dialog>-->
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                    small
                    @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
    </div>
</template>

<script>
    import user_api from "../../api/user_api";

    export default {
        name: 'Users',

        data: () => ({
            roles:['ROLE_USER','ROLE_ADMIN','ALL'],
            roleType:'ALL',

            dialog: false,
            headers: [
                // { text: 'ID', value: 'id' },
                // {
                //     text: 'Имя',
                //     align: 'start',
                //     sortable: false,
                //     value: 'name',
                // },
                // { text: 'Фамилия', value: 'surname' },
                // { text: 'Отчество', value: 'patronymic' },
                // { text: 'Пароль', value: 'password' },
                // { text: 'Организация', value: 'organization' },
                // { text: 'Email', value: 'email' },
                { text: 'Пол', value: 'id' },
                { text: 'Должность', value: 'username' },
                { text: 'Email', value: 'email' },
                // { text: 'Password', value: 'password' },
                // { text: 'Actions', value: 'action', sortable: false },
            ],
            users: [],
            editedIndex: -1,
            editedItem: {
                id: null,
                name: '',
                surname: '',
                patronymic: '',
                password: '',
                organization: '',
                email: '',
                gender: '',
                position: '',
            },
            defaultItem: {
                id: null,
                name: '',
                surname: '',
                patronymic: '',
                password: '',
                organization: '',
                email: '',
                gender: '',
                position: '',
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },

            filteredUsers(){
                if(this.roleType==='ALL'){
                    return this.users
                }
                else {
                    return this.users.filter((user)=>user.roles[0].name===this.roleType)
                }
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
            enabled(){
                console.log(this.enabled)
                this.desserts.filter((item)=>item.gender===this.enabled)
            }
        },

        created () {
            this.getUsers().then((response)=>{
                    this.users=response.data
                }
            );

        },

        methods: {
            getUsers(){
               return user_api.getUsers();
            },

            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close () {
                this.dialog = false
            },

            save () {
                this.close()
            },
        },
    }
</script>
