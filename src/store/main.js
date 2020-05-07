import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        blockMemory: [],
    },
    getters:{
        arraySize: state => {
           var size_Name =  state.blockMemory.map((size) => {

               return  { size:size.sizeValue,name: size.name};
            } );

            return  size_Name.map((item) => {
                return  item.name !== '' ? item.size : '';
            });

          }

    },
    mutations:{
        addBlock(state,data){
            
            state.blockMemory.push(data);
        },
        fistFit(state,data){
            var dataTest = true;

            state.blockMemory.forEach((item,index) => {

                if (item.sizeValue >= data.sizeValue && dataTest && item.nameApp  === '') {

                     var sizeData = item.sizeValue - data.sizeValue;
                     var sizeText = `${sizeData}kb`;
                     var sizeHeight = `${sizeData}px`;

                     if (sizeData <= 20 &&  sizeData > 0 ) {
                         sizeHeight ='20px';
                     }

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

                    dataTest = false;
                }
            });
            
        },
        worstFit(state,data){
            var dataTest = true;
            // console.log(data);
            state.blockMemory.forEach((item,index) => {

                if (item.sizeValue === data.sizeMax && dataTest && item.nameApp  === '') {
                     var sizeData = item.sizeValue - data.sizeValue;
                     var sizeText = `${sizeData}kb`;
                     var sizeHeight = `${sizeData}px`;

                     if (sizeData <= 20 &&  sizeData > 0 ) {
                         sizeHeight ='20px';
                     }

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

                    dataTest = false;
                }
            });
        },
        bestFit(state,data){
            var dataTest = true;
            var dataTest2 = true;

            state.blockMemory.forEach((item,index) => {
                if (item.sizeValue === data.sizeValue  && dataTest && item.nameApp  === '') {
                    var sizeData = item.sizeValue - data.sizeValue;
                    var sizeText = `${sizeData}kb`;
                    var sizeHeight = `${sizeData}px`;

                    if (sizeData <= 20 &&  sizeData > 0 ) {
                        sizeHeight ='20px';
                    }

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

                    dataTest = false;
                    dataTest2 = false;
                    return true;
                }
                
            });

            if (dataTest2) {
                state.blockMemory.forEach((item, index) => {
                    if (item.sizeValue >= data.sizeValue && dataTest2 && item.nameApp  === '') {
                        var sizeData = item.sizeValue - data.sizeValue;
                        var sizeText = `${sizeData}kb`;
                        var sizeHeight = `${sizeData}px`;
                        
                        if (sizeData <= 20 &&  sizeData > 0 ) {
                            sizeHeight ='20px';
                        }
                     
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

                        dataTest2 = false;
                        return item;
                    }
                });
            }
            // state.blockMemory.push(data);
        },
        cleanItemMemory(state,data){

            var dataClean = state.blockMemory.filter((item, index) => {
                if (index === data) {
                    return item;
                }
            });

            if (dataClean[0].nameApp !== '') {

                var newData ={
                name : 'Memory Free',
                nameApp: '',
                size : dataClean[0].size,
                sizeValue :dataClean[0].sizeValue,
                icon : 'mdi-crop-free',
                background :{
                    backgroundColor:"#9c9c9c",
                    height :dataClean[0].background.height
                    } 
                };
                // console.log(newData);
                state.blockMemory.splice(data,1,newData);
            }
            return false;
        },
        cleanMemory(state){
            state.blockMemory = [];
        }
    }
});