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
                <p>{{ selectedRange }}</p>
                <p>{{ selectedCategory }}</p>


                <v-checkbox
                            :multiple="false"
                            v-for="(item,i) in dateRanges" :key="i"
                            :value="item"
                            v-model="selectedRange"
                            :label="item.start+' - '+item.end"
                ></v-checkbox>

                <v-checkbox
                        :multiple="false"
                        v-for="(item,i) in categoryTypes" :key="i"
                        :value="item.id"
                        v-model="selectedCategory"
                        :label="item.name + '--'+ getCategoriesCount(item.id)"
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
            groupedCategories:null,



            //Фильтрация
            selectedRange:null,
            dateRanges:[
                { start:2018, end:2020 },
                { start:2018, end:2021 },
                { start:2019, end:2019 },
                { start:2019, end:2020 },
                { start:2019, end:2021 }
            ],

            selectedCategory: null,
            categoryTypes:[ { name: 'Здравоохранение' , id:1 }, { name: 'Культура', id: 2 }, { name: 'Спорт', id:3 } , { name: 'Дороги', id:4 }]

        }),

        methods: {

            groupByWrapper( arr, key){
                this.groupedCategories = this.groupBy(arr, key);
            },

            getCategoriesCount(id){
                if(this.groupedCategories[id]){
                    return this.groupedCategories[id].length
                }
                else{
                    return 0;
                }
            },

            groupBy( arr, key ){
                 return  arr.reduce(function (rv,x) {
                    (rv[x[key]]=rv[x[key]] || [] ).push(x);
                    return rv;
                 },{});
            },

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

            // getMinMaxYear(arr){
            //     let min = 999999;
            //     let max = 0;
            //     arr.forEach(item => {
            //         if( item.start < min ){
            //             min = item.start;
            //         }
            //         if(item.end > max){
            //             max = item.end;
            //         }
            //     });
            //     return {
            //         min: min,
            //         max: max
            //     }
            // }
        },
        created() {
            social_object_api.getSocialObjects().then(rs=>{
                this.socialObjects= rs.data
            });
        },




        computed:{

            filteredObjects(){
                let resultArray = this.socialObjects;
                if(this.selectedRange){
                    let { start, end} = this.selectedRange;
                    resultArray = resultArray.filter(item => item.start === start && item.end === end);
                }
                if(this.selectedCategory){
                    resultArray = resultArray
                        .filter(item => item.category_type === this.selectedCategory  && item.category_type === this.selectedCategory);
                }

                this.groupByWrapper( resultArray, 'category_type');
                return resultArray;

            }
        },
    };
</script>

<style scoped>

</style>
