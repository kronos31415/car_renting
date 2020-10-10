export default {
    state: {
        lastSearch: {
            from: null,
            to: null
        },
        items: [],
    },
    mutations: {
        setLastSearch(state, payload) {
            state.lastSearch = payload;
        },
        addToBasket(state, payload) {
            state.items.push(payload);
        },
        removeFromBasket(state, payload) {
            state.items = this.state.items.filter(item => item !== payload);
        }
    },
    actions: {
        setLastSearch({ commit }, payload) {
            commit('setLastSearch', payload);
            localStorage.setItem('lastSearch', JSON.stringify(payload))
        },
        loadLastSearch(context) {
            const lastSearch = localStorage.getItem("lastSearch")
            if (lastSearch) {
                context.commit('setLastSearch', JSON.parse(lastSearch))
            }
        }

    }
}