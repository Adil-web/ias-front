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

            <v-icon
                    size=20
                    @click="removeItem(item)"
            >
                mdi-delete-forever
            </v-icon>
        </template>
        <template v-slot:no-data>
        </template>
    </v-data-table>

</template>

<script>
    import user_api from "../../api/user_api";

    export default {
        data: () => ({
            search: '',
            users: [],
            roles: [{id: 1, name: 'ROLE_ADMIN', text: 'Администратор'}, {
                id: 2,
                name: 'ROLE_USER',
                text: 'Пользователь'
            }],
            user: {},

            dialog: false,
            headers: [
                {text: 'Логин', align: 'start', sortable: false, value: 'username',},
                {text: 'Имя', value: 'name'},
                {text: 'Фамилия', value: 'surname'},
                {text: 'Отчество', value: 'patronymic'},
                {text: 'Почта', value: 'email'},
                {text: 'Роль', value: 'role.name'},
                // { text: 'Пароль', value: 'password' },
                {text: 'Действия', value: 'actions', sortable: false},
            ],
        }),


        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            this.getUsers();
        },

        methods: {
            getUsers() {
                user_api.getUsersApi(true).then(response => {
                    this.users = response.data
                });
            },

            deleteItem(userItem) {
                if (confirm('Вы уверены что хотите удалить пользователя?')) {
                    user_api.recoveryUserApi(userItem.id, false).then(() => {
                        const index = this.users.indexOf(userItem);
                        this.users.splice(index, 1)
                    })
                } else {
                    console.log("Не удалось удалить пользователя")
                }
            },

            removeItem(userItem) {
                if (confirm('Вы уверены что хотите удалить пользователя?')) {
                    user_api.removeUserApi(userItem.id).then(() => {
                        const index = this.users.indexOf(userItem);
                        this.users.splice(index, 1)
                    })
                } else {
                    console.log("Не удалось удалить пользователя")
                }
            },

            close() {
                this.dialog = false;
                this.user = {};
            },


        },
    }
</script>
