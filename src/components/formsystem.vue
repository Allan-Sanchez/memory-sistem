<template>
    <div class="card-init">

            <v-card-actions v-if="btnMemory">
                <v-btn large  dark color="teal lighten-2" @click="newBlock()">Blank block</v-btn>
                <v-btn large  dark color="deep-orange lighten-2" @click="newApp()">New Application</v-btn>
            </v-card-actions>

            <div v-if="formBlock">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                        v-model="name"
                        :counter="10" :rules="nameRules"
                        label="BLock Name" autofocus required>
                    </v-text-field>             
                               
                    <v-slider 
                        v-model="value" :rules="rules"
                        label="block size ?" step="1"
                        thumb-label="always" ticks>
                    </v-slider>             
                    <v-row>
                        <v-col sm="12" md="6">
                            <v-color-picker v-model="color" hide-inputs></v-color-picker>
                        </v-col>
                        <v-col sm="12" md="6">
                            <div class="mx-2 mb-2">
                              <v-btn large color="primary" block @click="addBlock()">Push</v-btn>
                            </div>              
                            
                        </v-col>
                    </v-row>                
                </v-form>
            </div>

            <div v-if="formApp">
                <v-form ref="form" v-model="valid" lazy-validation>
                                 
                    <v-text-field
                        v-model="nameApp" autofocus
                        :counter="10" :rules="nameRules"
                        label="App name" required>
                    </v-text-field>             
                    <v-slider 
                        v-model="value" :rules="rules"
                        label="block size ?" step="1"
                        thumb-label="always" ticks>
                    </v-slider>             
                    <v-row>
                        <v-col sm="12" md="6">
                            <v-color-picker v-model="color" hide-inputs></v-color-picker>
                        </v-col>
                        <v-col sm="12" md="6">
                                         
                            <div class="mx-2 mb-2">
                              <v-btn elevation="5" large color="blue accent-2" block  dark @click="firstSet()">first setting</v-btn>
                            </div>
                            <div class="mx-2 mb-2">
                              <v-btn elevation="5" large color="indigo accent-2" block dark @click="lastSet()">last setting</v-btn>
                            </div>
                            <div class="mx-2 mb-2">
                              <v-btn elevation="5"  large color="purple accent-2" block dark @click="bestSet()">best setting</v-btn>
                            </div>
                        </v-col>
                    </v-row>                
                </v-form>
            </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            // input nama
            valid: true,
            name: '',
            nameApp: '',
            nameRules: [
              v => !!v || 'Name is required',
              v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            // input range
            value: 30,
            rules: [
              v => v <= 80 || 'block too large, please choose a smaller range',
              v => v >= 25 || 'block too smal, please choose a biger range',
            ],
            btnMemory:true,
            formBlock: false,
            formApp: false,
            type: 'hex',
            hex: '#9c9c9c',
            icon : ''
        }
    },
    computed:{
        color: {
        get () {
          return this[this.type]
        },
        set (v) {
          this[this.type] = v
        },
      },
    },
    methods: {
        newBlock(){
            this.btnMemory = !this.btnMemory;
            this.formBlock = !this.formBlock;
        },
        newApp(){
            this.btnMemory = !this.btnMemory;
            this.formApp = !this.formApp;
        },
        addBlock(){
            this.formBlock = !this.formBlock;
            this.btnMemory = !this.btnMemory;

             var dataBackground = {backgroundColor: this.hex,height: `${this.value}px` };
            
             if(this.name === ''){
                 this.icon = 'mdi-close-circle'
             }
            this.icon = 'mdi-crop-free';
            var data = { 
                name : this.name, 
                nameApp : this.nameApp,
                size : `${this.value}kb`,
                sizeValue: this.value, 
                icon: this.icon,
                background: dataBackground
                };
            this.$store.commit('addBlock',data);
            this.resetValues();
        },
        firstSet(){
            this.formApp = !this.formApp;
            this.btnMemory = !this.btnMemory;

            var dataBackground = {backgroundColor: this.hex,height: `${this.value}px` };
            
            if(this.nameApp === ''){
                 this.icon = 'mdi-crop-free'
             }
             this.icon = 'mdi-close-circle';
             
            var data = { 
                name : this.name, 
                nameApp : this.nameApp,
                size : `${this.value}kb`,
                sizeValue: this.value, 
                icon: this.icon,
                background: dataBackground
                };

                this.$store.commit('fistSet',data);
                this.resetValues();
           
        },
        lastSet(){
            this.formApp = !this.formApp;
            this.btnMemory = !this.btnMemory;
            console.log('last setting')
        },
        bestSet(){
            this.formApp = !this.formApp;
            this.btnMemory = !this.btnMemory;
            console.log('first setting')
        },
        resetValues(){
            this.name = '',
            this.nameApp = ''
            this.value = 30,
            this.icon = 'mdi-crop-free'

        }
    },
}
</script>

<style >
    .card-init{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>