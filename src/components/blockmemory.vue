<template>
    <div class="d-flex flex-column">
        <div :style="item.background" class=" bloque-memory d-flex justify-space-around align-center mx-auto" 
            v-for="(item, index) in $store.state.blockMemory" :key="index">

            <template v-if="item.sizeValue > 0">
                
                <span v-if="item.nameApp === ''" 
                    class="white--text d-block my-1 font-weight-bold">
                    {{ item.name }}
                </span>

                <span v-if="item.name === ''" 
                    class="white--text d-block my-1 font-weight-bold">
                    {{ item.nameApp }}
                </span>
                <span class="white--text d-block my-1 font-weight-bold">{{ item.size }}
                    <v-icon left class="mr-n6 btn-memory" @click="cleanMemory(index)">{{ item.icon }}</v-icon>
                    <!-- <v-icon left class="mr-n6 btn-memory" @click="cleanMemoryCompact(index)">{{ item.icon }}</v-icon> -->
                </span>
            </template>
            
        </div>
  
    </div>
</template>

<script>
export default {
    
    data: ()=>({

    }),
    methods: {
        cleanMemory(e){
        this.$store.commit('cleanItemMemory',e);

        },
        cleanMemoryCompact(e){
          this.$store.commit('cleanMemoryCompact',e);
        }
    },

    
}
</script>

<style >
    .bloque-memory{
        width: 300px;
        border: 1px solid rgba(255, 255, 255, 0.5) !important;
    }
    .btn-memory{
        cursor: pointer;
        color: #fff !important;
    }
    .btn-memory:hover{
        color: rgba(0, 0, 0, 0.6) !important;
    }
</style>