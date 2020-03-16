<template>
    <v-data-table
                  dense
                  :headers="headers"
                  :items="users"
                  sort-by="calories"
                  class="elevation-1"
                  :search="search"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">

                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                    size=20
                    @click="deleteItem(item)"
            >
                mdi-delete-restore
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import Vue from 'vue'
    import user_api from "../../api/user_api";
    export default {
        data: () => ({
            search:'',
            users:[],
            roles:[ {id: 1,name: 'ROLE_ADMIN',text:'Администратор'}, {id: 2,name: 'ROLE_USER',text:'Пользователь'}],
            user:{},

            dialog: false,
            headers: [
                { text: 'Логин', align: 'start', sortable: false, value: 'username',},
                { text: 'Имя', value: 'name' },
                { text: 'Фамилия', value: 'surname' },
                { text: 'Отчество', value: 'patronymic' },
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
                user_api.getUsersApi(true).then(response=>{ this.users=response.data });
            },


            editItem (userItem) {
                this.user = Object.assign({}, userItem)
                this.dialog = true
            },

            deleteItem (userItem) {
                if (confirm('Вы уверены что хотите удалить пользователя?')){
                    user_api.recoveryUserApi(userItem.id, false).then(()=>{
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
                    console.log(this.user)
                    user_api.createUserApi(this.user).then((response)=>{
                        this.users.push(response.data);
                        this.close();
                    })

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
