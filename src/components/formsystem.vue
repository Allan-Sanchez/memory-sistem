<template>
    <div class="card-init">

            <v-card-actions v-if="propmemory">
                <v-btn large  dark color="teal lighten-2" @click="newBlock()">Blank block</v-btn>
                <v-btn large  dark color="deep-orange lighten-2" @click="newApp()">New Application</v-btn>
            </v-card-actions>

            <div v-if="propblock">
                <v-form ref="form" v-model="valid" :lazy-validation="true">
                    <v-text-field
                        v-model="name"
                        :counter="20" :rules="nameRules"
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

            <div v-if="propapp">
                <v-form ref="form" v-model="valid" >
                                 
                    <v-text-field
                        v-model="nameApp" autofocus
                        :counter="20" :rules="nameRules"
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
                              <v-btn elevation="5" large color="blue accent-2" block  dark @click="firstFit()">first fit</v-btn>
                            </div>
                            <div class="mx-2 mb-2">
                              <v-btn elevation="5" large color="indigo accent-2" block dark @click="worstFit()">worst fit</v-btn>
                            </div>
                            <div class="mx-2 mb-2">
                              <v-btn elevation="5"  large color="purple accent-2" block dark @click="bestFit()">best fit</v-btn>
                            </div>
                        </v-col>
                    </v-row>                
                </v-form>
            </div>

            <v-snackbar
              v-model="snackbar"
              :timeout="timeout"
              :color= "'error'"
              :top="'top'"
            >
              {{ text }}
              <v-btn
                dark
                text
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </v-snackbar>

    </div>
</template>

<script>
export default {
    props:['propmemory','propblock','propapp'],
    data() {
        return {
            // input nama
            valid: true,
            name: 'Memory free',
            nameApp: '',
            nameRules: [
              v => !!v || 'Name is required',
              v => (v && v.length <= 20) || 'Name must be less than 2   0 characters',
            ],
            // input range
            value: 50,
            rules: [
              v => v <= 99 || 'block too large, please choose a smaller range',
              v => v >= 25 || 'block too small, please choose a bigger range',
            ],
            snackbar: false,
            text: 'process too big to put into memory.',
            timeout: 4000,
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
            this.$emit('newblock');
        },
        newApp(){
            this.$emit('newApp');
        },
        addBlock(){
            if (this.name !== '') {         
    
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

                return false
            }
            this.text = 'Please give me the block name.';
            this.snackbar = true;
        },
        firstFit(){
            // validacion que si tenga suficiente espacio y que sea bloque en blanco
            var range = this.$store.getters.arraySize;
            var validaSize = Math.max(...range);

            if (this.value <= validaSize && this.nameApp !== '') {

                var dataBackground = {backgroundColor: this.hex,height: `${this.value}px` };
                
                if(this.nameApp === ''){
                     this.icon = 'mdi-crop-free'
                 }
                 this.icon = 'mdi-close-circle';
            
                if (this.value < 20) {
                    dataBackground.height = "20px";
                }

                var data = { 
                    name : '', 
                    nameApp : this.nameApp,
                    size : `${this.value}kb`,
                    sizeValue: this.value, 
                    icon: this.icon,
                    background: dataBackground
                    };
    
                    this.$store.commit('fistFit',data);
                    this.resetValues();
            }
            else{
                if (this.nameApp === '') {
                    this.text = 'Please give me the process name.';
                    this.snackbar = true;
                    return false
                }
                this.text = 'process too big to put into memory.';
                this.snackbar = true;
            }
        },
        worstFit(){
            var sizeData = this.$store.getters.arraySize;
            var validaSize = Math.max(...sizeData);

             if (this.value <= validaSize && this.nameApp !== '') {
                 
                var dataBackground = {backgroundColor: this.hex,height: `${this.value}px` };
                
                if(this.nameApp === ''){
                     this.icon = 'mdi-crop-free'
                 }
                 this.icon = 'mdi-close-circle';
            
                if (this.value < 20) {
                    dataBackground.height = "20px";
                }
                var data = { 
                    name : '', 
                    nameApp : this.nameApp,
                    sizeMax : validaSize, 
                    size : `${this.value}kb`,
                    sizeValue: this.value, 
                    icon: this.icon,
                    background: dataBackground
                    };

                    this.$store.commit('worstFit',data);
                    this.resetValues();


             }
             else{
                if (this.nameApp === '') {
                    this.text = 'Please give me the process name.';
                    this.snackbar = true;
                    return false
                }
                this.text = 'process too big to put into memory.';
                this.snackbar = true;
            }
        },
        bestFit(){
            var sizeData = this.$store.getters.arraySize;
            var validaSize = Math.max(...sizeData);

            if (this.value <= validaSize && this.nameApp !== '') {
                 
                var dataBackground = {backgroundColor: this.hex,height: `${this.value}px` };
                
                if(this.nameApp === ''){
                     this.icon = 'mdi-crop-free'
                 }
                 this.icon = 'mdi-close-circle';
            
                if (this.value < 20) {
                    dataBackground.height = "20px";
                }
                var data = { 
                    name : '', 
                    nameApp : this.nameApp,
                    sizeMax : validaSize, 
                    size : `${this.value}kb`,
                    sizeValue: this.value, 
                    icon: this.icon,
                    background: dataBackground
                    };

                    this.$store.commit('bestFit',data);
                    this.resetValues();


             }
             else{
                if (this.nameApp === '') {
                    this.text = 'Please give me the process name.';
                    this.snackbar = true;
                    return false
                }
                this.text = 'process too big to put into memory.';
                this.snackbar = true;
            }
        },
        resetValues(){
            this.name = 'Memory Free',
            this.nameApp = ''
            this.value = 50,
            this.hex = "#9c9c9c";
            this.icon = 'mdi-crop-free'

        },
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