// main
import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from "vue-router";

// plugins
import createPersistedState from "vuex-persistedstate";

// components
import App from './App.vue'
import Main from "@/components/Main";
import Error from "@/components/Error";
import TodoAction from "@/components/Todo/TodoAction";

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const store = new Vuex.Store({
    state: {
        todo: [
            { id: 1, title: "Paint the fence near the house.", isDone: false,
                list: [
                    { id: 1, subj: "Buy paint.", isDone: false },
                    { id: 2, subj: "Paint the fence.", isDone: false }
                ],
            },
        ],
    },
    getters: {
        GET_TODO(state) {
            return state.todo;
        }
    },
    mutations: {
        ADD_TODO(state, payload) {
            state.todo.push(payload);
        },
        EDIT_TODO(state, payload) {
            state.todo.map(
                n => {
                    n.id === payload.id && (
                        state.todo.title = payload.title,
                        state.todo.list = payload.list,
                        state.todo.isDone = payload.isDone
                    );
                    return n;
                }
            );
        },
        REM_TODO(state, payload) {
            state.todo = state.todo.filter(n => n.id !== payload);
        },
        REM_TODO_LIST_ITEM(state, payload) {
            state.todo = state.todo.map(n => {
                n.id === payload.id && (
                    n.list = n.list.filter(
                        m => m.id !== payload.item
                    )
                );
                return n;
            });
        },
        CHK_TODO(state, payload) {
            state.todo = payload;
        }
    },
    actions: {
        ADD_TODO({ commit }, payload) {
            let id = this.getters.GET_TODO.length > 0 ? this.getters.GET_TODO[this.getters.GET_TODO.length - 1].id + 1 : 1;
            commit('ADD_TODO', { id: id, title: payload.title, list: payload.list, isDone: false});
        },
        EDIT_TODO({ commit }, payload) {
            commit('EDIT_TODO', { id: payload.id, title: payload.title, list: payload.list, isDone: false});
        },
        REM_TODO({ commit }, payload) {
            commit('REM_TODO', payload);
        },
        REM_TODO_LIST_ITEM({ commit }, payload) {
            commit('REM_TODO_LIST_ITEM', payload);
        },
        CHK_TODO({ commit }, payload) {
            let check = this.getters.GET_TODO.map(
                n => {
                    n.id === payload && (n.isDone = !n.isDone);
                    return n;
                }
            );
            commit('CHK_TODO', check);
        },
    },
    plugins: [createPersistedState()]
});

const routes = [
    { path: '*', component: Error },
    { path: '/', component: Main },
    { path: '/todo/:id', component: TodoAction },
    { path: '/todo', component: TodoAction }
    ];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
