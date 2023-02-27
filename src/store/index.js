import {createStore,useStore} from "vuex";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

const store = createStore({
  state:{
    cartList:[]
  },
  mutations,
  actions,
  getters,
  modules:{}
})
export default store
