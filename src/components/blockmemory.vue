<template>
    <div class="d-flex flex-column">
        <div :style="item.background"  class=" bloque-memory d-flex justify-space-around align-center mx-auto" v-for="(item, index) in blockMemory" :key="index">
            <span class="white--text d-block my-1">{{ item.name }}</span>
            <span class="white--text d-block my-1">{{ item.size }}
                <v-icon left class="mr-n6 btn-memory">{{ item.icon }}</v-icon>
            </span>
            
        </div>
  
    </div>
</template>

<script>
export default {
    data: ()=>({
        blockMemory: [
            {
                name : 'block Name 1',
                size : '10 kb',
                icon : 'mdi-crop-free',
                background :{backgroundColor:"#7fbd9e"} 
            },
            {
                name : 'block Name 2',
                size : '20kb',
                icon : 'mdi-close-circle',
                background :{backgroundColor:"#bd7f7f"} 
            },
        ],
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