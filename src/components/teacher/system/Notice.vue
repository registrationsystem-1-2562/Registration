<template>
  <v-container>
    <v-container>
      <form>
        <v-responsive>
          <v-flex>
            <v-card class="mx-auto" max-width="70%" color>
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
                    v-model="title"
                  ></v-text-field>

                  <v-textarea
                    outlined
                    name="information"
                    label="รายละเอียด"
                    type="text"
                    v-model="information"
                  ></v-textarea>
                </v-form>
              <v-layout>
                <v-flex xs3 xm1 offset-sm1>
                  <v-btn raised class="green" @click="onPickFile">Add Picture</v-btn>
                    <input 
                      type="file" 
                      style="display: none" 
                      ref="fileInput" 
                      accept="image/*"
                      @change="onFilePicked"
                    ></v-flex>
                  <v-flex xs6 xm6 offset-sm1 v-if="image != null">
                    <v-btn raised class="red" @click="removeFile">remove</v-btn>
                  </v-flex>
              </v-layout>
              </v-card-text>
                <v-layout v-if="image != null">
                  <v-flex xs12 xm4 offset-sm2>
                    <img :src="imageUrl" height="200">
                  </v-flex>
                </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                 <v-btn @click="clearMessage" color="#abb2b9">Clear</v-btn>
                 <v-btn @click="selectPost" color="primary">Post</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-responsive>
      </form>
    </v-container>
    
    <v-container dense v-for="(message, index) in notices" :key="index">
      <!---->
      <div>
        <v-card class="mx-auto" max-width="70%">
          <!--color="#ffe4c4" -->
          <v-alert border="top" colored-border color="info accent-4" elevation="2">
          <v-responsive>
            <v-card-title>{{message.title}}</v-card-title>
             <v-card-text>&emsp;&emsp;{{message.information}}</v-card-text>
              <v-layout v-if="message.imageUrl != ''">
                <v-flex xs12 xm4 offset-sm1>
                  <img :src="message.imageUrl" height="400" width="600">
                </v-flex>
              </v-layout>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!--<v-btn depressed color="primary">Edit</v-btn>-->
              <v-btn depressed color="error">Delete</v-btn>
            </v-card-actions>
          </v-responsive>
          </v-alert>
        </v-card>
      </div>
    </v-container>
  </v-container>
</template>


<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      
      title: "",
      information: "",
      user: this.$store.getters.getUser,
      notices: [],
      notice:{},
      imageUrl: null,
      image: null
    };
  },
  methods: {
    selectPost: function(){
      if(this.image === null){
        this.storeMessage()
      }
      else{
        this.storeMessageAndImage()
      }
    },
    storeMessage: function() {
      const messageData ={
          title: this.title,
          information: this.information,
          user: this.user
      }
      this.$store.dispatch("createNotice", messageData)
      this.title = ""
      this.information = ""
    },
    storeMessageAndImage: function() {
      const messageData ={
          title: this.title,
          information: this.information,
          user: this.user,
          image: this.image
      }
      this.$store.dispatch("createNoticeWithImage", messageData)
      this.title = ""
      this.information = ""
      this.image = null
    },
    clearMessage: function() {
      this.title = ""
      this.information = ""
      this.image = null
    },
    removeFile: function(){
      this.image = null
    },
    onPickFile(){
        this.$refs.fileInput.click()
    },
    onFilePicked(event){
        const files = event.target.files
        let filesname = files[0].name
        if (filesname.lastIndexOf('.') <= 0){
            return alert("please add a valid file!")
        }
        const reader = new FileReader();
         reader.addEventListener('load', () => {
             this.imageUrl = reader.result
         })
         reader.readAsDataURL(files[0])
          if (files[0].size > 1024 * 1024) {
            alert('File too big (> 1 mb)');
            this.image = null
          }
          else{
          this.image = files[0]
          }
    }
  },
  created() {
    this.$store.dispatch("showNotice", this.notices);
    this.notices.forEach(value => {
      if (value.user === this.user) {
        this.notice = value
        //console.log(value.id)
        //console.log(this.notice.id)
        // eslint-disable-next-line
        // console.log("value user" + ' ' + value.user)
        // console.log("This user" + ' ' + this.user)
        // console.log("notice title" + ' ' + this.notice.title)
        // console.log("notice information" + ' ' + this.notice.information)
        // console.log("notice date" + ' ' + this.notice.date)
        // console.log("notice user" + ' ' + this.notice.user)
        // console.log("notice image url" + ' ' + this.notice.imageUrl)
        // console.log("++++++++++++++++++++++++++++++++")
      }
    });    
  }
};
</script>
