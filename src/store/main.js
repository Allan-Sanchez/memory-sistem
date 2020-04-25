import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        blockMemory: [
            {
                name : '',
                nameApp: 'App_name 1',
                size : '25 kb',
                sizeValue : 25,
                icon : 'mdi-close-circle',
                background :{
                    backgroundColor:"#7fbd9e",
                    height :"25px"
                    } 
            },
            {
                name : 'block name 1',
                nameApp: '',
                size : '35 kb',
                sizeValue : 35,
                icon : 'mdi-crop-free',
                background :{
                    backgroundColor:"#c4c4c4",
                    height :"35px"
                    } 
            },
            {
                name : 'block name 2',
                nameApp: '',
                size : '40 kb',
                sizeValue : 40,
                icon : 'mdi-crop-free',
                background :{
                    backgroundColor:"#c4c4c4",
                    height :"40px"
                    } 
            },
        ],
    },
    getters:{

    },
    mutations:{
        addBlock(state,data){
            
            state.blockMemory.push(data);
        },
        fistSet(state,data){
            var dataTest = true;

             var range = state.blockMemory.length;
             console.log(range);

            state.blockMemory.forEach((item,index) => {

                console.log(`${item.sizeValue} index ${index}`);

                if (item.sizeValue >= data.sizeValue && dataTest && item.nameApp  === '') {

                     var sizeData = item.sizeValue - data.sizeValue;
                     var sizeText = `${sizeData}kb`;
                     var sizeHeight = `${sizeData}px`;

                     var newData ={
                        name : item.name,
                        nameApp: item.nameApp,
                        size : sizeText,
                        sizeValue : sizeData,
                        icon : item.icon,
                        background :{
                            backgroundColor:item.background.backgroundColor,
                            height :sizeHeight
                            } 
                     };

                     state.blockMemory.splice(index,1,data,newData);


                    // console.log(newData);
                    // console.log(item);

                    // console.log(`aqui toca ${item.sizeValue} => ${data.sizeValue}`);
                    dataTest = false;
                    // console.log(`dataTest es igual a ${item.sizeValue} =>  ${dataTest}`);
                }
            });
            // console.log(state.blockMemory);
            // console.log(data.sizeValue);
            // state.blockMemory.push(data);
        },
        lastSet(){
            
            // state.blockMemory.push(data);
        },
        bestSet(){
            
            // state.blockMemory.push(data);
        }
    }
});