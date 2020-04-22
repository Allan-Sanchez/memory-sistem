import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        blockMemory: [
            {
                name : '',
                nameApp: 'App_name 1',
                size : '10 kb',
                icon : 'mdi-crop-free',
                background :{
                    backgroundColor:"#7fbd9e",
                    height :"25px"
                    } 
            },
        ],
    },
    getters:{

    },
    mutations:{
        addBlock(state,data){
            
            state.blockMemory.push(data);
        }
    }
});