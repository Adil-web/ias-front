<template>
    <v-card
            class="mx-auto"
            color="blue darken-3"
            dark
            max-width="400"
    >
        <v-card-title>
            <v-icon large left></v-icon>
            <span class="headline font-weight-bold">Карточка пользователя</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
        </v-card-text>

        <v-card-actions>
            <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                    <v-img
                            class="elevation-6"
                            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>Evan You</v-list-item-title>
                </v-list-item-content>

                <v-row
                        align="center"
                        justify="end"
                >

                    <v-icon @click="closeCard" class="mr-1">mdi-location-exit</v-icon>
                </v-row>
            </v-list-item>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "UserCard",
        methods:{
            closeCard(){
                this.$emit('close-user-card')
            }
        }
    }
</script>

<style scoped>

</style>
