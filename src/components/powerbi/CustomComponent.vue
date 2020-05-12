<template>
    <div style="display: flex; height:100%; width:100%; ">

        <div style="height: 100%; width: 80%; margin=0;">
            <l-map
                    :zoom="zoom"
                    :center="center"
                    :options="mapOptions"
                    style="height: 100%; z-index: 0;"
            >
                <l-tile-layer
                        :url="url"
                        :attribution="attribution"
                />
                <l-marker v-for="item in filteredObjects"  :key="item.id" :lat-lng="latLngWrapper(item.latitude, item.longitude)">
                    <l-popup>
                        <div @click="openCloseProfile(item)">
                            {{item.name}}
                        </div>
                    </l-popup>
                </l-marker>
            </l-map>
            <v-dialog style="z-index:9999;" v-if="socialObject" v-model="socialObject" persistent width="500">
                <social-object-profile
                        :socialObject="socialObject"
                        v-on:close-profile-card="openCloseProfile"
                ></social-object-profile>
            </v-dialog>
        </div>
        <div style="width: 20%;">
            <v-container fluid>
                <p>{{ filteredObjects.length}}</p>
                <p>{{ selectedRanges }}</p>
                <p>{{ selectedCategories }}</p>


                <v-checkbox v-for="(item,i) in dateRanges" :key="i"
                            :value="item"
                            v-model="selectedRanges"
                            :label="item.start+' - '+item.end"
                ></v-checkbox>

                <v-checkbox
                        :multiple="false"
                        v-for="(item,i) in categoryTypes" :key="i"
                        :value="item.id"
                        v-model="selectedCategory"
                        :label="item.name"
                ></v-checkbox>

            </v-container>
        </div>
    </div>
</template>

<script>
    import SocialObjectProfile from "@/components/shared/SocialObjectProfile";

    import social_object_api from "../../api/social_object_api";
    import { latLng } from "leaflet";
    import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";

    export default {
        name: "CustomComponent",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
            SocialObjectProfile
        },
        data:() => ({
            zoom: 7,
            center: latLng(47.52462, 52.487173),
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            mapOptions: {
                zoomSnap: .5
            },
            socialObjects:[],
            socialObject: null,



            //Фильтрация
            selectedRanges:[],
            dateRanges:[
                { start:2018, end:2021 },
                { start:2019, end:2020 },
                { start:2019, end:2019 }
            ],

            selectedCategory: null,
            categoryTypes:[ { name: 'Культура' , id:1 }, { name: 'Здравоохранение', id: 2 }, { name: 'Спорт', id:3 } ]

        }),

        methods: {

            openCloseProfile(socialObj) {
                if(socialObj===undefined){
                    this.socialObject = null;
                }
                else{
                    this.socialObject = socialObj;
                }
            },
            //Обертка для работы в разметке с методом latLng
            latLngWrapper(latitude,longitude){
                return latLng(latitude, longitude)
            },

            getMinMaxYear(arr){
                let min = 999999;
                let max = 0;
                arr.forEach(item => {
                    if( item.start < min ){
                        min = item.start;
                    }
                    if(item.end > max){
                        max = item.end;
                    }
                });
                return {
                    min: min,
                    max: max
                }
            }
        },
        created() {
            social_object_api.getSocialObjects().then(rs=>{
                this.socialObjects= rs.data
            });
        },




        computed:{

            filteredObjects(){
                let resultArray = this.socialObjects;
                if(this.selectedRanges.length > 0){
                    let { min, max} = this.getMinMaxYear(this.selectedRanges);
                    resultArray = resultArray.filter(item => item.start >= min && item.end <= max);
                }
                if(this.selectedCategory){
                    resultArray = resultArray
                        .filter(item => item.category_type === this.selectedCategory  && item.category_type === this.selectedCategory);
                }
                return resultArray;

            }
        },
    };
</script>

<style scoped>

</style>
