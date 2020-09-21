import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    setList(state, step) {
      state.list = step
    }
  },
  actions: {
    async getList(context) {
      const { data } = await axios.get('/list.json')
      console.log(data)
      context.commit('setList', data)
    }
  },
  modules: {}
})
