import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    value: '',
    btnS: 'all'
  },
  getters: {
    total(state) {
      return state.list.filter(item => item.done === false).length
    },
    infoList(state) {
      if (state.btnS === 'all') return state.list
      if (state.btnS === 'undone') return state.list.filter(item => !item.done)
      if (state.btnS === 'done') return state.list.filter(item => item.done)
      return state.list
    }
  },
  mutations: {
    setList(state, step) {
      state.list = step
    },
    changeVal(state, step) {
      state.value = step
    },
    addItem(state) {
      const obj = {
        id: state.list.length,
        info: state.value,
        done: false
      }
      state.list.push(obj)
      state.value = ''
    },
    removeItem(state, step) {
      state.list.splice(step, 1)
    },
    checkedBoxState(state, params) {
      const { done, id } = params
      state.list[id].done = done
    },
    cleanDone(state) {
      state.list = state.list.filter(item => item.done === false)
    },
    changeBtnStatus(state, s) {
      state.btnS = s
    }
  },
  actions: {
    async getList(context) {
      const { data } = await axios.get('/list.json')
      // console.log(data)
      context.commit('setList', data)
    }
  },
  modules: {}
})
