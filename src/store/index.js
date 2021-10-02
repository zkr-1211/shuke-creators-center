import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        userInfo: {}
    },
    mutations: {
        setToken(state, token) {
            if (token) {
                state.token = token;
                localStorage.setItem('token', token)
                // console.log("token", token)
                // Vue.$cookies.set(
                //     `${process.env.VUE_APP_SOURCE}.token`,
                //     token,
                //     '7d',
                //     '/',
                //     rootDomain
                // );
            }
        },
        clearToken(state) {
            state.token = '';
            localStorage.removeItem('token');
            // clearToken(state);
        },
        setUserInfo(state, payload) {
            state.userInfo = payload.userInfo;
        },
        clearUserInfo(state) {
            state.userInfo = {};
        }
    },
    getters: {
        getToken(state) {
            // console.log("statestatestatestate", state)
            if (!state.token) {
                const getCookieToken = localStorage.getItem('token')
                // const getCookieToken = Vue.$cookies.get(
                //     `${process.env.VUE_APP_SOURCE}.token`
                // );
                if (!getCookieToken) {
                    return null;
                }
                state.token = getCookieToken;
                // state.token = 123456;
            }
            return state.token;
        },
        getUserInfo(state) {
            return state.userInfo;
        }
    },
    actions: {},
    modules: {}
});

// function clearToken(state) {
//     state.token = '';
//     localStorage.removeItem('token');
//     // Vue.$cookies.remove(`${process.env.VUE_APP_SOURCE}.token`, '/', rootDomain);
// }