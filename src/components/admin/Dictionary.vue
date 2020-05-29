<template>
    <v-simple-table dense>
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-left">NameRu</th>
                <th class="text-left"></th>
                <th class="text-left">NameKz</th>
            </tr>
            </thead>
            <tbody>

            <v-dialog v-model="dialog" max-width="400px">
                <v-card height="200">
                    <v-container>
                        <v-row align="stretch">
                            <v-col>
                                <v-form
                                        @submit.prevent="changeWords"
                                        ref="form"
                                        v-model="valid"
                                        :lazy-validation="lazy">
                                    <v-container>
                                        <v-row>

                                            <v-col>
                                                <v-text-field
                                                        v-model="newKey"
                                                        label="ru"
                                                        placeholder="Placeholder"
                                                        outlined
                                                        dense
                                                        required
                                                        :rules="rules"
                                                ></v-text-field>
                                            </v-col>

                                            <v-col>
                                                <v-text-field
                                                        v-model="newValue"
                                                        label="kz"
                                                        placeholder="Placeholder"
                                                        outlined
                                                        dense
                                                        required
                                                        :rules="rules"
                                                ></v-text-field>
                                            </v-col>

                                        </v-row>
                                    </v-container>
                                    <v-btn :disabled="!valid" color="success" class="mr-4" type="submit" @click.stop="dialog = false">
                                        добавить
                                    </v-btn>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-dialog>

            <tr v-for="(item, index) in Object.keys(words.ru)" :key="index">
                <td>{{ words.ru[item]}}</td>
                <td>
                    <v-icon
                            small
                            class="mr-2"
                            @click="openDialog( item, words.ru[item], 'ru' )"
                    >
                        mdi-pencil
                    </v-icon>
                </td>
<!--                <td>{{ words.kk[item] }}</td>-->
<!--                <td>-->
<!--                    <v-icon-->
<!--                            small-->
<!--                            class="mr-2"-->

<!--                    >-->
<!--                        mdi-pencil-->
<!--                    </v-icon>-->
<!--                </td>-->
            </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>


<script>
    import dictionary_api from "../../api/dictionary_api";

    export default {
        name: 'Dictionary',
        data() {
            return {
                dialog: false,

                currentKey:'',
                currentValue:'',
                currentLocale: '',

                newKey: '',
                newValue: '',

                rules: [v => !!v || 'Field is required'],
                valid: true,
                lazy:false
            }
        },
        methods: {

            openDialog(key, value, locale) {
                this.currentKey = key;
                this.currentValue = value;
                this.currentLocale = locale;
                this.dialog = true;
            },

            changeWords(){
                let wordsCopy = Object.assign({}, this.words);
                wordsCopy[this.currentLocale][this.currentKey] = this.newKey;
                console.log(wordsCopy[this.currentLocale][this.currentKey])
                // wordsCopy..[this.newKey] = this.newValue;
                // delete wordsCopy[this.currentKey];
                // dictionary_api.changeDictionary()
            }
        },

        computed: {
            words: {
                get() {
                    return this.$store.state.dictionary
                },
                set(val) {
                    return this.$store.state.dictionary = val
                }
            },
        },
        created() {
            console.log(this.words)

        }
    }
</script>