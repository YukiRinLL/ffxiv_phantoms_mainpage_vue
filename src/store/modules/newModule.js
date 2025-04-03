const state = {
    data: null
}

const mutations = {
    SET_DATA(state, payload) {
        state.data = payload
    }
}

const actions = {
    fetchData({ commit }) {
        // API调用等异步操作
        commit('SET_DATA', responseData)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}