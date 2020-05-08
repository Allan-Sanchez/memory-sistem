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

                if (item.sizeValue > data.sizeValue && dataTest && item.nameApp  === '') {

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
                if(item.sizeValue == data.sizeValue && dataTest && item.nameApp  === ''){
                    state.blockMemory.splice(index,1,data);
                    dataTest = false;
                }
            });
            
        },
        worstFit(state,data){
            var dataTest = true;
            state.blockMemory.forEach((item,index) => {

    
                    if (item.sizeValue === data.sizeMax && dataTest && item.nameApp  === '') {
                         var sizeData = item.sizeValue - data.sizeValue;
                         var sizeText = `${sizeData}kb`;
                         var sizeHeight = `${sizeData}px`;

                         if (sizeData === 0) {
                            state.blockMemory.splice(index,1,data);
                            dataTest = false;
                            return false;
                         }
    
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

            let arraDate = state.blockMemory.filter((item) => {
                if(item.sizeValue >= data.sizeValue && item.nameApp  === ''){
                   return item;
                }
            });
            
            let sizeDataT =arraDate.map((item) => {
                return item.sizeValue;
            });

            let best = Math.min(...sizeDataT);

            state.blockMemory.forEach((item,index) => {

                if(item.sizeValue == data.sizeValue && dataTest && item.nameApp  === ''){
                    state.blockMemory.splice(index,1,data);
                    dataTest = false;
                }

                if (item.sizeValue === best && dataTest && item.nameApp  === '') {

                    let sizeData = item.sizeValue - data.sizeValue;
                    let sizeText = `${sizeData}kb`;
                    let sizeHeight = `${sizeData}px`;

                    if (sizeData <= 20 &&  sizeData > 0 ) {
                        sizeHeight ='20px';
                    }

                    let newData ={
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
                    dataTest = false;
                    state.blockMemory.splice(index,1,data,newData);
                    
                }
            });

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
        },
        cleanMemoryCompact(state,data){
            let firstBlock = state.blockMemory.filter((item,index) => {
                let tempdata = data - 1;
                if (tempdata == index) {
                    return item ;    
                }
            });
            let lastBlock = state.blockMemory.filter((item,index) => {
                let tempdata = data + 1;
                if (tempdata == index) {
                    return item ;
                }
            });

            if (lastBlock.length >= 1) {
                console.log(lastBlock[0].name);
                if (lastBlock[0].nameApp === '') {
                    console.log('aqui compacto asi abajo');
                    return false;
                }
            }
            if (firstBlock.length >= 1) {
                console.log(lastBlock[0].name);

                if (firstBlock[0].name !== '') {
                    console.log('aqui compacto asi arriba');
                    return false;
                }
            }
            return false;
            // console.log('no se pudo compactar');
            // console.log(firstBlock);
            // console.log(lastBlock);
        }
    }
});