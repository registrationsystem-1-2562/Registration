<template>
  <v-container>
    <v-container dense v-for="(message, index) in notices" :key="index">
      <!---->
      <form>
        <v-card class="mx-auto" max-width="70%">
          <!--color="#ffe4c4" -->
          <v-responsive>
            <v-card-title>{{message.title}}</v-card-title>
            <v-card-text>&emsp;&emsp;{{message.information}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!--<v-btn depressed color="primary">Edit</v-btn>-->
              <v-btn depressed color="error">Delete</v-btn>
            </v-card-actions>
          </v-responsive>
        </v-card>
      </form>
    </v-container>
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
                    <v-layout row>
                     <v-flex xs12 xm6 offset-sm1>
                      <v-btn raised class="primary" @click="onPickFile">Add Picture</v-btn>
                      <input 
                        type="file" 
                        style="display: none" 
                        ref="fileInput" 
                        accept="image/*"
                        @change="onFilePicked"
                      >
                     </v-flex>
                    </v-layout>
                    <v-layout row>
                     <v-flex xs12 xm6 offset-sm1>
                      <img :src="imageUrl" height="200">
                     </v-flex>
                    </v-layout>
               </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
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
    storeMessage: function() {
      if(!this.image){
          return
      }
      const messageData ={
          title: this.title,
          information: this.information,
          user: this.user,
          image: this.image
      }
      this.$store.dispatch("createNotice", messageData)
      this.title = ""
      this.information = ""
      this.imageUrl = ""
    },
    clearMessage: function() {
      this.title = ""
      this.information = ""
      this.imageUrl = ""
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
         this.image = files[0]
    }
  },
  created() {
    this.$store.dispatch("showNotice", this.notices);
    this.notices.forEach(value => {
      if (this.user === value.user) {
        this.notice = value
        // eslint-disable-next-line
        console.log("value user" + ' ' + value.user)
        console.log("This user" + ' ' + this.user)
        console.log("notice title" + ' ' + this.notice.title)
        console.log("notice information" + ' ' + this.notice.information)
        console.log("notice date" + ' ' + this.notice.date)
        console.log("notice user" + ' ' + this.notice.user)
        console.log("++++++++++++++++++++++++++++++++")
      }
    });    
  }
};
</script>
