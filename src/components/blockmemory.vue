<template>
    <div class="d-flex flex-column">
        <div :style="item.background" class=" bloque-memory d-flex justify-space-around align-center mx-auto" 
            v-for="(item, index) in $store.state.blockMemory" :key="index">
            <span v-if="item.nameApp === ''" 
                class="white--text d-block my-1 font-weight-bold">
                {{ item.name }}
            </span>
            <span v-if="item.name === ''" 
                class="white--text d-block my-1 font-weight-bold">
                {{ item.nameApp }}
            </span>
            <span class="white--text d-block my-1 font-weight-bold">{{ item.size }}
                <v-icon left class="mr-n6 btn-memory">{{ item.icon }}</v-icon>
            </span>
            
        </div>
  
    </div>
</template>

<script>
export default {
    data: ()=>({

    }),

    
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