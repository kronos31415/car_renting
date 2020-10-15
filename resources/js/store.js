import { isLoggedIn, logOut } from "./components/shared/utils/auth"
export default {
    state: {
        lastSearch: {
            from: null,
            to: null
        },
        basket: {
            items: [],
        },
        isLoggedin: false,
        user: {}
    },
    mutations: {
        setLastSearch(state, payload) {
            state.lastSearch = payload;
        },
        addToBasket(state, payload) {
            state.basket.items.push(payload);
        },
        removeFromBasket(state, payload) {
            state.basket.items = state.basket.items.filter(item => item.bookable.id !== payload);
        },
        setBasket(state, payload) {
            state.basket = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setLoggedin(state, payload) {
            state.isLoggedin = payload;
        }
    },
    actions: {
        setLastSearch({ commit }, payload) {
            commit('setLastSearch', payload);
            localStorage.setItem('lastSearch', JSON.stringify(payload))
        },
        loadStoredState(context) {
            const lastSearch = localStorage.getItem("lastSearch")
            if (lastSearch) {
                context.commit('setLastSearch', JSON.parse(lastSearch))
            }

            const basket = localStorage.getItem("basket")
            if (basket) {
                context.commit('setBasket', JSON.parse(basket))
            }
        },
        addToBasket({ commit, state }, payload) {
            commit('addToBasket', payload);
            localStorage.setItem('basket', JSON.stringify(state.basket));
        },
        removeFromBasket({ commit, state }, payload) {
            commit('removeFromBasket', payload);
            localStorage.setItem('basket', JSON.stringify(state.basket));
        },
        clearBasket({ commit, state }, payload) {
            commit('setBasket', { items: [] })
            localStorage.setItem("basket", JSON.stringify(state.basket))
        },
        async loadUser({ commit, dispatch }) {
            if (isLoggedIn()) {
                try {
                    const userr = (await axios.get('/user')).data;
                    commit('setUser', userr);
                    commit('setLoggedin', true)
                } catch (error) {
                    dispatch('logout')
                }
            }
        },
        logout({ commit }) {
            commit("setUser", {});
            commit("setLoggedin", false);
            logOut();
        }
    },
    getters: {
        itemsInBasket(state) {
            return state.basket.items.length;
        },
        isInBasketAlready(state) {
            return function(id) {
                return state.basket.items.reduce((result, item) => result || item.bookable.id == id, false);
            }
        },
        getTotalPrice(state) {
            return state.basket.items.reduce((result, item) => result + item.price.price, 0);
        }
    }
}