<template>
  <v-app>
  <v-app-bar app color="primary" dark>
      <v-toolbar-title>Project Registration System</v-toolbar-title>
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-content>
    <v-container row >
      <v-spacer></v-spacer>
      <h4 class="display-1">ประกาศข่าวทั้งหมด</h4>
      <v-spacer></v-spacer>
      <router-link link to='home'>ย้อนกลับ</router-link>
    </v-container>
    <v-container dense v-for="(message, i) in notices" :key="i">
      <v-card class="mx-auto" max-width="80%" > <!-- color="#ffe4c4" -->
        <v-responsive>
          <v-card-title>{{message.title}}</v-card-title>
          <v-card-text>&emsp;&emsp;{{message.information}}</v-card-text>
            <v-layout justify-end wrap>
              <v-flex xs12 sm4 text-center>
                <v-card-text v-text="message.date"></v-card-text>
              </v-flex>
            </v-layout>       
        </v-responsive>
      </v-card>
    </v-container>
  </v-content>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      drawer:null,
      notices:{}
    };
  },
  mounted () {
    firebase.database().ref('notice').once('child_added', snapshot => {
          this.notices = snapshot.val();  
            console.log(this.notices);
        })
  },
};
</script>
