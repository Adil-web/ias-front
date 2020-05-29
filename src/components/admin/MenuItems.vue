<template>
    <v-data-table
            dense
            :headers="headers"
            :items="menuItems"
            :single-expand="true"
            show-expand
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <!--                <v-toolbar-title></v-toolbar-title>-->

                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Новая пользователь</v-btn>
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
                                                v-model="menuItem.title"
                                                label="Legal menu item name*"
                                                hint="please insert legal menu item name"
                                                persistent-hint
                                                required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                v-model="menuItem.icon"
                                                label="Legal src*"
                                                persistent-hint
                                                required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                v-model="menuItem.path"
                                                label="path"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                v-model="menuItem.src"
                                                label="src"
                                        ></v-text-field>
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
        <template v-slot:item.data-table-expand="{ item, isExpanded, expand }">
            <span v-if="item.menuItemList.length>0">
                <v-icon small @click="expand(true)" v-if="!isExpanded">{{isExpanded ? 'mdi-arrow-expand-up': 'mdi-arrow-expand-down' }}</v-icon>
                <v-icon small @click="expand(false)" v-if="isExpanded">{{isExpanded ? 'mdi-arrow-expand-up': 'mdi-arrow-expand-down' }}</v-icon>
            </span>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
            <v-data-table
                    dense
                    :headers="headers"
                    :items="item.menuItemList"
                    class="elevation-1"
            >
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
            </v-data-table>
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
            <v-icon
                    small
                    @click="addChildren(item)"
            >
                mdi-plus
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
    import Vue from 'vue'
    import user_api from "../../api/user_api";
    import items_api from "../../api/items_api";


    export default {
        name: 'MenuItems',
        data: () => ({
            search: '',
            users: [],
            menuItems: [],
            roles: [{id: 1, name: 'ROLE_ADMIN', text: 'Администратор'}, {
                id: 2,
                name: 'ROLE_USER',
                text: 'Пользователь'
            }],
            user: {},
            menuItem: {},

            dialog: false,
            headers: [
                {text: 'Наименование', align: 'start', sortable: false, value: 'title',},
                {text: 'url адресс', value: 'src'},
                // { text: 'Фамилия', value: 'surname' },
                // { text: 'Отчество', value: 'patronymic' },
                // { text: 'Почта', value: 'email' },
                // { text: 'Роль', value: 'role.name' },
                // { text: 'Пароль', value: 'password' },
                {text: 'Действия', value: 'actions', sortable: false},
                { text: '', value: 'data-table-expand' },
            ],
        }),


        computed: {
            // formTitle () {
            //     return this.user.id === undefined ? 'New Item' : 'Edit Item'
            // },
            formTitle() {
                return this.menuItem.id === undefined ? 'New Item' : 'Edit Item'
            },
            // sessionUser:{
            //     get(){
            //         return this.$store.state.user;
            //     },
            //     set (val) {
            //         return this.$store.state.user = val
            //     }
            // },
        },


        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            // this.getUsers();
            this.getMenuItemsWithPromise().then(items=>{
                this.menuItems = items;
            });
        },

        methods: {
            getMenuItemsWithPromise() {
                return new Promise((resolve, reject) => {
                    items_api.getMenuItems()
                        .then( rs => {
                            resolve(rs.data);
                        }).catch( er => {
                        reject(er);
                    })
                })
            },

            addChildren(item){
                this.menuItem.parent_id = item.id;
                this.dialog=true;
            },

            // editItem(userItem) {
            //     this.user = Object.assign({}, userItem)
            //     this.dialog = true
            // },

            editItem(menuItem) {
                this.menuItem = Object.assign({}, menuItem)
                this.dialog = true
            },

            // deleteItem(userItem) {
            //     if (this.sessionUser.id === userItem.id) {
            //         alert("Невозможно удалить свою же учетную запись");
            //         return ''
            //     } else if (confirm('Вы уверены что хотите удалить пользователя?')) {
            //         user_api.deleteUserApi(userItem.id, true, userItem.role_id)
            //             .then(() => {
            //                 const index = this.users.indexOf(userItem);
            //                 this.users.splice(index, 1)
            //             }).catch(er => {
            //             alert(er.response.data.message)
            //         })
            //     } else {
            //         console.log("Не удалось удалить пользователя")
            //     }
            // },

            // close() {
            //     this.dialog = false;
            //     this.user = {};
            // },

            close() {
                this.dialog = false;
                this.menuItem = {};
            },

            // save() {
            //     if (this.user.id === undefined) {
            //         user_api.createUserApi(this.user).then((response) => {
            //             this.users.push(response.data);
            //             this.close();
            //         }).catch(er => alert(er.response.data.message))
            //
            //     } else {
            //         user_api.editUserApi(this.user).then((response) => {
            //             Vue.set(this.users, this.users.findIndex(item => item.id === response.data.id), response.data);
            //             this.close();
            //         });
            //     }
            //
            // },

            save() {
                // console.log(this.menuItem)
            //     alert("dsadad")
            //     console.log(this.menuItem)
                if (this.menuItem.id === undefined) {
                    items_api.createMenuItemApi(this.menuItem).then(() => {
                        this.getMenuItemsWithPromise().then(items => {
                            this.menuItems = items;
                            this.close();
                        })
                    }).catch(er => alert(er.response.data.message))

                } else {
                    items_api.editMenuItemApi(this.menuItem).then(() => {
                        this.getMenuItemsWithPromise().then(items => {
                            this.menuItems = items;
                            this.close();
                        })
                    }).catch(er => alert(er.response.data.message))
                }

            }
        },

    }
</script>
