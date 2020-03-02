<template>
    <v-card width="700">
        <v-card-title class="blue darken-3 white--text">
            <span class="headline">Карточка пользователя</span>
            <v-row class="fill-height" justify="end">
                <v-btn dark icon class="mr-4">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn dark icon @click="closeCard">
                    <v-icon  class="mr-1">mdi-location-exit</v-icon>
                </v-btn>
            </v-row>
        </v-card-title>

        <v-list two-line>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="indigo">mdi-phone</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>(650) 555-1234</v-list-item-title>
                    <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                    <v-icon>mdi-message-text</v-icon>
                </v-list-item-icon>
            </v-list-item>

            <v-list-item>
                <v-list-item-action></v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>(323) 555-6789</v-list-item-title>
                    <v-list-item-subtitle>Work</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                    <v-icon>mdi-message-text</v-icon>
                </v-list-item-icon>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="indigo">mdi-email</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>aliconnors@example.com</v-list-item-title>
                    <v-list-item-subtitle>Personal</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-action></v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>ali_connors@example.com</v-list-item-title>
                    <v-list-item-subtitle>Work</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="indigo">mdi-map-marker</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>1400 Main Street</v-list-item-title>
                    <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: "UserCard",
        methods:{
            closeCard(){
                this.$emit('close-user-card')
            }
        },
    }
</script>

<style scoped>

</style>
