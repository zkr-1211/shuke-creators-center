import Vue from 'vue';
import Vuex from 'vuex';
import { getRootDomain } from '@/utils/getRootDomain';

const rootDomain = getRootDomain();

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
                Vue.$cookies.set(
                    `${process.env.VUE_APP_SOURCE}.token`,
                    token,
                    '7d',
                    '/',
                    rootDomain
                );
                // localStorage.setItem('token', token);
            }
        },
        clearToken(state) {
            clearToken(state);
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
            if (!state.token) {
                const getCookieToken = Vue.$cookies.get(
                    `${process.env.VUE_APP_SOURCE}.token`
                );
                if (!getCookieToken) {
                    return null;
                }
                state.token = getCookieToken;
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

function clearToken(state) {
    state.token = '';
    // localStorage.removeItem('token');
    Vue.$cookies.remove(`${process.env.VUE_APP_SOURCE}.token`, '/', rootDomain);
}
