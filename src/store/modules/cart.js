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
    },
    // obj: { id: xxx, newCount: xxx }
    updateCount (state, obj) {
      const goods = state.list.find(item => item.id === obj.id)
      goods.count = obj.newCount
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
    },
    // 请求方式：PATCH
    // 请求地址：http://localhost:3000/cart/:id
    // 请求参数：{name[可选], price[可选], count[可选]}
    async updateCountAsync (context, obj) {
      // 将更新后的数据上传到服务器上
      await axios({
        url: `http://localhost:3000/cart/${obj.id}`,
        method: 'PATCH',
        data: {
          count: obj.newCount
        }
      })
      // 将修改更新同步到vuex
      context.commit('updateCount', {
        id: obj.id,
        newCount: obj.newCount
      })
    }
  },
  getters: {
    // 商品总数 累加count
    total (state) {
      return state.list.reduce((sum, item) => sum + item.count, 0)
    },
    // 商品总价 累加count * price
    totalPrice (state) {
      return state.list.reduce((sum, item) => sum + item.count * item.price, 0)
    }
  }
}
