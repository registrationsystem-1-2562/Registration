<template>
    <v-container>    
        <v-container> <!--dense v-for="(message, i) in noticeState" :key="i"-->
          <form>
            <v-card class="mx-auto" max-width="70%" color="#ffe4c4"> 
                <v-responsive>
                    <v-card-title v-text="noticeState.title"></v-card-title>
                    <v-card-text v-text="noticeState.information">
                        &emsp;&emsp;
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed color="primary">Edit</v-btn>
                        <v-btn depressed color="error">Delete</v-btn>
                    </v-card-actions>
                         
                </v-responsive>
            </v-card>
          </form>
        </v-container>
        <v-container>
            <form>
                <v-responsive >
                    <v-flex>
                        <v-card class="mx-auto" max-width="70%" color="">
                            <v-toolbar color="primary">
                                <v-toolbar-title>สร้างประกาศ</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                <v-text-field 
                                    label="เรื่องประกาศ" 
                                    name="title" 
                                    type="text" 
                                    v-model="title">
                                </v-text-field>

                                <v-textarea
                                    outlined
                                    name="information"
                                    label="รายละเอียด"
                                    type="text"
                                    v-model="information"
                                ></v-textarea>
                                </v-form>
                            </v-card-text>
                            <v-card-actions><v-spacer></v-spacer>
                                <v-btn @click="clearMessage" color="#abb2b9">Clear</v-btn>
                                <v-btn @click="storeMessage" color="primary">Post</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-responsive>
            </form>
        </v-container>
    </v-container>
</template>


<script>

export default {
  data() {
    return {
        title: 'title Text',
        information: 'information Text',
    }
  },
    computed: {
      noticeState() {
        return this.$store.getters.getNotice
      }
    },
    methods:{
      storeMessage:function(){
        //this.messages.push({title:this.title,information:this.information})
        this.$store.dispatch('setNotice', { title: this.title, information: this.information })
        //   console.log(this.title,this.information);
        this.title='';
        this.information='';  
      },
      clearMessage:function(){
          this.title='';
          this.information='';
      },
    },
  
};
</script>