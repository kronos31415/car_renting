export default {
    state: {
        lastSearch: {
            from: null,
            to: null
        }
    },
    mutations: {
        setLastSearch(state, payload) {
            state.lastSearch = payload
        }
    },
    actions: {
        setLastSearchGlobaly({ commit }, payload) {
            commit('setLastSearch');
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