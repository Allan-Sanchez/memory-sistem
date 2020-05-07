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

                    <v-list-item @click.stop="dialog = true">
                      <v-list-item-title>Team</v-list-item-title>
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
               <!-- <p class="text--disabled">Allan Edrey Sanchez Rixtun 1590-13-10353.</p> -->
            </v-card>
          </v-col>
        </v-row>
        <!-- modal team -->
        <v-dialog
          v-model="dialog" max-width="490" >
          <v-card>
            <v-card-title class="headline">Team membes</v-card-title>
    
            <v-card-text>
              <div class="d-flex justify-space-between"> 
                 <span class="d-block">Allan Edrey Sanchez Rixtun</span> <span class="d-block font-weight-black">1590-13-10353.</span>
              </div>

              <div class="d-flex justify-space-between"> 
                 <span class="d-block">Danny Castañeda Montufar</span> <span class="d-block font-weight-black">1590-11-2066.</span>
              </div>

              <div class="d-flex justify-space-between"> 
                 <span class="d-block">Daniel Alejandro Meda Juárez</span> <span class="d-block font-weight-black">1590-16-2661.</span>
              </div>

              <div class="d-flex justify-space-between"> 
                 <span class="d-block">Juan pablo lopez montoya</span> <span class="d-block font-weight-black">1590-16-11594.</span>
              </div>

              <div class="d-flex justify-space-between"> 
                 <span class="d-block">Maico Rigoberto Victoriano Yuman</span> <span class="d-block font-weight-black">1590-14-1595.</span>
              </div>

              <div class="d-flex justify-space-between"> 
                 <span class="d-block">Estuardo Nehemías Aguilar Pineda</span> <span class="d-block font-weight-black">1590-12-15602.</span>
              </div>

              
              
              
            </v-card-text>
    
            <v-card-actions>
              <v-spacer></v-spacer>
   
              <v-btn
                color="primary"
                text
                @click="dialog = false"
              >
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    block : false,
    dialog: true,
    
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
    },
    
  },
  
};
</script>
