import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const Store = new Vuex.Store({
    state:{
        num:123,
        islogin:""
    },
    mutations:{
        login(state,msg) {
            state.islogin = msg;
            localStorage.setItem("islogin",JSON.stringify(msg))
        }
    }

})

export default Store