<template>
    <v-card width="500" v-if="socialObject">
        <v-toolbar flat :color="user.role.id===1?'green darken-3 white--text':'blue darken-3 white--text'">
            <v-icon class="pa-2">mdi-account</v-icon>
            <v-toolbar-title class="font-weight-light ">Карточка объекта</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn dark icon @click="closeCard">
                <v-icon  class="mr-1">mdi-location-exit</v-icon>
            </v-btn>
        </v-toolbar>

        <v-list two-line>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="green darken-3"> </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{socialObject.name}}</v-list-item-title>
                    <v-list-item-subtitle>Имя</v-list-item-subtitle>
                </v-list-item-content>

            </v-list-item>


            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="blue darken-3"> </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{socialObject.latitude}}</v-list-item-title>
                    <v-list-item-subtitle>Фамилия</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-action></v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{socialObject.longitude}}</v-list-item-title>
                    <v-list-item-subtitle>Отчество</v-list-item-subtitle>
                </v-list-item-content>

            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="blue darken-3">mdi-email</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>aliconnors@example.com</v-list-item-title>
                    <v-list-item-subtitle>Электронная почта</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="blue darken-3">mdi-email-sync</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>ali_connors@example.com</v-list-item-title>
                    <v-list-item-subtitle>Корпоративная почта</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: "SocialObjectProfile",

        methods:{
            closeCard(){
                this.$emit('close-profile-card')
            },

        },
        // private Integer id;
        // private String name;
        // private Float latitude;
        // private Float longitude;
        // private LocalDate start;
        // private LocalDate end;
        // private Integer category_type;

        props:{
            socialObject: {
                type: Object,
                default: () => null
            },
        },

        computed:{
            user:{
                get(){
                    return this.$store.state.user;
                },
                set (val) {
                    return this.$store.state.user = val
                }
            },

        },
    }
</script>

<style scoped>

</style>
