<template>
  <v-app>
    <v-content>
      <v-row>
          <v-col cols="12" sm="10" offset-sm="1" class="mt-10">
            <v-card height="auto" raised>
              <v-card-title class="blue white--text">
                <span class="headline">Memory System</span>

                <v-spacer></v-spacer>

                <v-menu bottom left >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      dark
                      icon
                      v-on="on"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                      
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item @click="cleanMemory()">
                      <v-list-item-title>{{ btnclean }}</v-list-item-title>
                    </v-list-item>

                    <v-list-item   @click="back()">
                      <v-list-item-title>{{ btnBacK }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>

              <v-card-text>
                <v-row>
                   <v-col  sm="12" md="6">
                       <FormSystem :propapp="app" :propblock="block" :propmemory="memory" 
                       v-on:newblock="newBlock()" v-on:newApp="newApp()"></FormSystem>
                   </v-col>
                   <v-col  sm="12" md="6">
                        <h3 class="text-center my-3">Memory State</h3>
                       <BlockMemory></BlockMemory>
                   </v-col>
                   
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
    </v-content>
  </v-app>
</template>

<script>
import FormSystem from './components/formsystem';
import BlockMemory from './components/blockmemory';

export default {
  name: 'App',

  components: {
    FormSystem,
    BlockMemory,
  },

  data: () => ({
    btnclean : 'Clean Memory',
    btnBacK : 'Back',
    memory : true,
    app: false,
    block : false
    
  }),
  methods: {
    back(){
      this.memory = true;
      this.app = false;
      this.block = false;
    },
    cleanMemory(){
      this.$store.commit('cleanMemory');
      this.back();
    },
    newBlock(){
      this.memory = !this.memory;
      this.block = !this.block;
    },
    newApp(){
      this.memory = !this.memory;
      this.app = !this.app;
    }
  },
  
};
</script>
