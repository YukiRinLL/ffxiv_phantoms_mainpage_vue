import { createStore } from 'vuex'
import newModule from './modules/newModule'

export default createStore({
    modules: {
        newModule
    }
})