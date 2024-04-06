import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      // 购物车的数据 [{}, {}]
      list: []
    }
  },
  mutations: {
    updateList (state, newList) {
      state.list = newList
    }
  },
  actions: {
    // 请求方式：GET
    // 请求地址：http://localhost:3000/cart
    async getList (context) {
      const res = await axios({
        url: 'http://localhost:3000/cart',
        method: 'GET'
      })
      context.commit('updateList', res.data)
    }
  },
  getters: {}
}
