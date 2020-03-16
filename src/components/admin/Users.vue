<template>
    <v-data-table v-if ="users.length!==0"
            dense
            :headers="headers"
            :items="users"
            sort-by="calories"
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>My CRUD</v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                v-model="user.username"
                                                label="Legal username*"
                                                hint="please insert legal username"
                                                persistent-hint
                                                required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="user.email" label="Email*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="user.password" label="Password*" type="password" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select
                                                v-model="user.role_id"
                                                hint="Роль"
                                                :items="roles"
                                                item-text="text"
                                                item-value="id"
                                                label="Выбор роли"
                                                persistent-hint
                                                single-line
                                                required
                                        ></v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
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
    <div v-else> Ожидайте загрузка</div>
</template>

<script>
    import Vue from 'vue'
    import user_api from "../../api/user_api";
    export default {
        data: () => ({
            users:[],
            roles:[ {id: 1,name: 'ROLE_ADMIN',text:'Администратор'}, {id: 2,name: 'ROLE_USER',text:'Пользователь'}],
            user:{},

            dialog: false,
            headers: [
                { text: 'Логин', align: 'start', sortable: false, value: 'username',},
                { text: 'Почта', value: 'email' },
                { text: 'Роль', value: 'role.name' },
                // { text: 'Пароль', value: 'password' },
                { text: 'Действия', value: 'actions', sortable: false },
            ],
        }),

        computed: {
            formTitle () {
                return this.user.id === undefined ? 'New Item' : 'Edit Item'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            this.getUsers();
        },

        methods: {
            getUsers(){
              user_api.getUsersApi().then(response=>{ this.users=response.data });
            },


            editItem (userItem) {
                this.user = Object.assign({}, userItem)
                this.dialog = true
            },

            deleteItem (userItem) {
                if (confirm('Вы уверены что хотите удалить пользователя?')){
                    user_api.deleteUserApi(userItem.id).then(()=>{
                        const index = this.users.indexOf(userItem);
                        this.users.splice(index,1)
                    })
                } else {
                    console.log("Не удалось удалить пользователя")
                }
            },

            close () {
                this.dialog = false;
                this.user={};
            },

            save () {
                if (this.user.id === undefined) {
                    user_api.createUserApi(this.user)
                        .then((response)=>{
                        this.users.push(response.data);
                        this.close();
                        }).catch(er=>alert(er.response.data.message))

                } else {
                    user_api.editUserApi(this.user).then((response)=>{
                        Vue.set(this.users, this.users.findIndex(item=>item.id === response.data.id), response.data );
                        this.close();
                    });
                }

            },
        },
    }
</script>
