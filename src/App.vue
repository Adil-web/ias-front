<template>
  <v-app id="inspire">

        <NavigationBar/>
        <LeftSideMenu/>
        <v-content>
            <router-view></router-view>

          <v-container
                  class="fill-height"
                  fluid
          >
            <v-row
                    align="center"
                    justify="center"
            >
            </v-row>
          </v-container>
        </v-content>


  </v-app>
</template>

<script>
  import NavigationBar from '@/components/shared/NavigationBar';
  import LeftSideMenu from '@/components/shared/LeftSideMenu';
export default {
  name: 'App',

  components:{LeftSideMenu, NavigationBar },

  data: () => ({
    //
  }),
};
</script>
