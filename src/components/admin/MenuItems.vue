<template>
            <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="treats"
                    :pagination.sync="pagination"
                    expand="true"
                    select-all
                    item-key="category"
                    class="elevation-1"
                    hide-actions
            >

                <template v-slot:items="props">
                    <tr @click="props.expanded = !props.expanded">
                        <td>
                            <!-- This one should select every items under the expand slot -->
                            <v-checkbox
                                    @click.stop="props.selected = !props.selected"
                                    :input-value="props.selected"
                                    primary
                                    hide-details
                            ></v-checkbox>
                        </td>
                        <td class="text-xs-right">{{ props.item.category }}</td>
                    </tr>
                </template>

                <template v-slot:expand="props">
                    <v-data-table
                            v-model="selected"
                            :headers="headers"
                            :items="props.item.food"
                            :pagination.sync="pagination"
                            expand="true"
                            select-all
                            item-key="category"
                            class="elevation-1"
                            hide-actions
                    >
                        <!-- I should be able to hide headers and have the parent row checkbox act like the select all headers' checkbox -->
                        <template v-slot:items="props">
                            <tr @click="props.expanded = !props.expanded">
                                <td>
                                    <v-checkbox
                                            :input-value="props.selected"
                                            primary
                                            hide-details
                                    ></v-checkbox>
                                </td>
                                <td>{{ props.item.name }}</td>
                                <td class="text-xs-right">{{ props.item.calories }}</td>
                                <td class="text-xs-right">{{ props.item.fat }}</td>
                                <td class="text-xs-right">{{ props.item.carbs }}</td>
                                <td class="text-xs-right">{{ props.item.protein }}</td>
                                <td class="text-xs-right">{{ props.item.iron }}</td>
                            </tr>
                        </template>
                    </v-data-table>
                </template>
            </v-data-table>
</template>

<script>
    import Vue from 'vue'
    import user_api from "../../api/user_api";
    import items_api from "../../api/items_api";
    export default {
        name: 'MenuItems',
        // data: () => ({
        //     search:'',
        //     users:[],
        //     bis:[],
        //     roles:[ {id: 1,name: 'ROLE_ADMIN',text:'Администратор'}, {id: 2,name: 'ROLE_USER',text:'Пользователь'}],
        //     user:{},
        //     bi:{},
        //
        //     dialog: false,
        //     headers: [
        //         { text: 'Наименование', align: 'start', sortable: false, value: 'title',},
        //         { text: 'url адресс', value: 'src'},
        //         // { text: 'Фамилия', value: 'surname' },
        //         // { text: 'Отчество', value: 'patronymic' },
        //         // { text: 'Почта', value: 'email' },
        //         // { text: 'Роль', value: 'role.name' },
        //         // { text: 'Пароль', value: 'password' },
        //         { text: 'Действия', value: 'actions', sortable: false },
        //     ],
        // }),
        //
        //
        //
        //
        // computed: {
        //     // formTitle () {
        //     //     return this.user.id === undefined ? 'New Item' : 'Edit Item'
        //     // },
        //     formTitle () {
        //         return this.bi.id === undefined ? 'New Item' : 'Edit Item'
        //     },
        //     // sessionUser:{
        //     //     get(){
        //     //         return this.$store.state.user;
        //     //     },
        //     //     set (val) {
        //     //         return this.$store.state.user = val
        //     //     }
        //     // },
        // },
        //
        //
        //
        // watch: {
        //     dialog (val) {
        //         val || this.close()
        //     },
        // },
        //
        // created () {
        //     // this.getUsers();
        //     this.getBis();
        // },
        //
        // methods: {
        //     // getUsers(){
        //     //     user_api.getUsersApi(false).then(response=>{ this.users=response.data });
        //     // },
        //     getBis(){
        //         items_api.getMenuItems().then(rs=>{
        //             this.bis = rs.data;
        //             console.log(this.bis)
        //         })
        //     },
        //
        //
        //
        //     editItem (userItem) {
        //         this.user = Object.assign({}, userItem)
        //         this.dialog = true
        //     },
        //
        //     deleteItem (userItem) {
        //         if(this.sessionUser.id===userItem.id){
        //             alert("Невозможно удалить свою же учетную запись"); return ''
        //         }
        //         else if  (confirm('Вы уверены что хотите удалить пользователя?')){
        //             user_api.deleteUserApi(userItem.id, true, userItem.role_id)
        //                 .then(()=>{
        //                     const index = this.users.indexOf(userItem);
        //                     this.users.splice(index,1)
        //                 }).catch(er=>{
        //                 alert(er.response.data.message)
        //             })
        //         } else {
        //             console.log("Не удалось удалить пользователя")
        //         }
        //     },
        //
        //     close () {
        //         this.dialog = false;
        //         this.user={};
        //     },
        //
        //     save () {
        //         if (this.user.id === undefined) {
        //             console.log(this.user)
        //             user_api.createUserApi(this.user).then((response)=>{
        //                 this.users.push(response.data);
        //                 this.close();
        //             }).catch(er=>alert(er.response.data.message))
        //
        //         } else {
        //             user_api.editUserApi(this.user).then((response)=>{
        //                 Vue.set(this.users, this.users.findIndex(item=>item.id === response.data.id), response.data );
        //                 this.close();
        //             });
        //         }
        //
        //     },
        // },

        data: () => ({
            pagination: {
                sortBy: 'name'
            },
            selected: [],
            headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'left',
                    value: 'name'
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' }
            ],
            treats: [
                {
                    category: 'Desserts',
                    food: [
                        {
                            name: 'Frozen Yogurt',
                            calories: 159,
                            fat: 6.0,
                            carbs: 24,
                            protein: 4.0,
                            iron: '1%'
                        },
                        {
                            name: 'Ice cream sandwich',
                            calories: 237,
                            fat: 9.0,
                            carbs: 37,
                            protein: 4.3,
                            iron: '1%'
                        },
                        {
                            name: 'Cupcake',
                            calories: 305,
                            fat: 3.7,
                            carbs: 67,
                            protein: 4.3,
                            iron: '8%'
                        }
                    ]
                },
                {
                    category: 'Entries',
                    food: [
                        {
                            name: 'Melon',
                            calories: 159,
                            fat: 6.0,
                            carbs: 24,
                            protein: 4.0,
                            iron: '1%'
                        },
                        {
                            name: 'Hummus',
                            calories: 237,
                            fat: 9.0,
                            carbs: 37,
                            protein: 4.3,
                            iron: '1%'
                        }
                    ]
                }
            ]
        })
    }
</script>
