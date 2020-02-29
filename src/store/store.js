import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'



Vue.use(Vuex)

const store = new Vuex.Store({
    actions,
    mutations,
    modules: {
    //
    },
    state: {
        user: null,
        isAuthenticated:false,
        // emptyAvatar: require('@/assets/empty-avatar.png'),
        // first: null,
        langList: [
            {
                code: 'ru',
                shortName: 'РУС',
                name: 'Русский'
            },
            {
                code: 'kk',
                shortName: 'ҚАЗ',
                name: 'Қазақша'
            }
        ],
        drawer:true,
        // sidebar: true,
        // sbTemporary: false,
        // idxMenu: 0,
        // emptyItem: {
        //     title: 'Ошибка', path: '/error', icon: 'error'
        // },
    },

    // actions: {
    //     increment(context) {
    //         context.commit('increment');
    //     }
    // }
});

export default store

