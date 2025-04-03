import Vue from 'vue'
import Vuex from 'vuex'
import newModule from './modules/newModule'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        newModule
    }
})