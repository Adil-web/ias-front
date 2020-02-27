<template>
  <v-app id="inspire">
      <MainLayout/>
  </v-app>
<!--  <v-app v-else>-->
<!--    <router-view></router-view>-->
<!--&lt;!&ndash;        <Login/>&ndash;&gt;-->
<!--  </v-app>-->
</template>

<script>
  // import NavigationBar from '@/components/shared/NavigationBar';
  // import LeftSideMenu from '@/components/shared/LeftSideMenu';
  import MainLayout from "./components/shared/MainLayout";
  // import Login from "./views/Login";
export default {
  name: 'App',

  components:{
    MainLayout,
    // Login,
    // LeftSideMenu,
    // NavigationBar
  },

  data: () => ({
    //
  }),
};
</script>
