<template>
  <div class="container-fluid" style="width: 60vw;">
    <div class="row">
            <div class="dropdown offset-11">
            <button style="font-size: .7rem" class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Года
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a style="font-size: .7rem" @click="viewYear(i.year)" v-for="i in arrYears" :key="i.year" class="dropdown-item">{{ i.year }}</a>
            </div>
            </div>
    </div>
        <div class="row">
            <div class="col-4" v-if="arrRegions.length > 0">
                <FertilityRegion
                :chartData="arrRegions"
                :chartColors="regionsChartColors"
                label="РОЖДАЕМОСТЬ (на 1тыс)"
                />
            </div>
            <div class="col-4" v-if="arrRegions.length > 0">
                <RegionMortality
                :chartData="arrRegions"
                :chartColors="regionsChartColors"
                label="ОБЩИЙ УРОВЕНЬ СМЕРТНОСТИ (на 1тыс)"
                />
            </div>
            <div class="col-4" v-if="arrRegions.length > 0">
                <PopulationRegion
                :chartData="arrRegions"
                :chartColors="regionsChartColors"
                label="ПРИРОСТ НАСЕЛЕНИЯ"
                />
            </div>
            <div class="row col-12">
                <!-- <button  v-for="item in arrRegions" :key="item.region">{{ item.region }}</button> -->
            <div class="dropdown  offset-11">
            <button style="font-size: .7rem" class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Регионы
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a style="font-size: .7rem" v-for="i in arrRegions" :key="i.region" @click="viewRegion(i.region)" class="dropdown-item">{{ i.region === '' ? 'Атырауская область' : i.region }}</a>
            </div>
            </div>
            </div>
            <div style="width: 55vw" class="d-flex tab-pane fade show active" id="All" role="tabpanel" aria-labelledby="nav-home-tabs">
                <div class="col-4" v-if="arrYears.length > 0">
                    <FertilityYear
                    :chartData="arrYears"
                    :chartColors="regionsChartColors"
                    label="РОЖДАЕМОСТЬ(на 1к)"
                    />
                </div>
                <div class="col-4" v-if="arrYears.length > 0">
                    <MortalityYears
                    :chartData="arrYears"
                    :chartColors="regionsChartColors"
                    label="ОБЩИЙ УРОВЕНЬ СМЕРТНОСТИ"
                    />
                </div>
                <div class="col-4" v-if="arrYears.length > 0">
                    <PopulationYears
                    :chartData="arrYears"
                    :chartColors="regionsChartColors"
                    label="ПРИРОСТ НАСЕЛЕНИЯ"
                    />
                </div>
            </div>
        </div>
        <div class="row" v-if="arrYears.length > 0" >
            <div class="col-12">
                <ExpectancyYears
                :height="100"
                :chartData="arrExpectancy"
                :chartColors="regionsChartColors"
                label="ОЖИДАЕМАЯ ПРОДОЛЖИТЕЛЬНОСТЬ ЖИЗНИ"
                />
            </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";

import RegionMortality from "./RegionMortality";
import MortalityYears from "./MortalityYears";

import FertilityRegion from "./FertilityRegion";
import FertilityYear from "./FertilityYears";

import PopulationRegion from "./PopulationRegion";
import PopulationYears from "./PopulationYears";

import ExpectancyYears from "./ExpectancyYears";

export default {
  components: {
    RegionMortality,
    MortalityYears,
    FertilityRegion,
    FertilityYear,
    PopulationRegion,
    PopulationYears,
    ExpectancyYears
  },
  data() {
    return {
      arrRegions: [],
      regionsChartColors: {
        borderColor: "#077187",
        pointBorderColor: "#0E1428",
        pointBackgroundColor: "#AFD6AC",
        backgroundColor: "rgb(1, 184, 170)"
      },
      arrYears: [],
      arrExpectancy: []
    };
  },
  methods: {
    viewRegion(region) {
        console.log(region)
        axios.get('http://localhost:8070/api/zdrav-kpi/demography/years', {
            params: {
                region: region
            }
        }).then(d => {
            this.arrYears = d.data
            }).catch(err => console.log(err));
        // console.log(test)
        // console.log(this.arrYears)
    },
    viewYear(year) {
        console.log(year)
        axios.get('http://localhost:8070/api/zdrav-kpi/demography/regions', {
            params: {
                year: year
            }
        }).then(d => {
            this.arrRegions = d.data
            }).catch(err => console.log(err));
        // console.log(test)
        console.log(this.arrRegions)
    }
  },
  created() {
    axios.all([
        axios.get('http://localhost:8070/api/zdrav-kpi/demography/regions', {
            params: {
                year: '2016'
            }
        }),
        axios.get('http://localhost:8070/api/zdrav-kpi/demography/years', {
            params: {
                region: ''
            }
        }),
        axios.get('http://localhost:8070/api/zdrav-kpi/demography/life-expectancy')
      ])
    .then(axios.spread((arrRegions, arrYears, arrExpectancy) => {
        this.arrRegions = arrRegions.data
        this.arrYears = arrYears.data
        this.arrExpectancy = arrExpectancy.data
    }))
    .catch(error => console.log(error))
  }
};
</script>

<style scoped>
    .nav-link{
        font-size: .7rem;
    }
</style>