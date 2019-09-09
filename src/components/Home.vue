<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-container>
        <h6 class="title">เข้าสู่ระบบ</h6>
      </v-container>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link to="/slogin">
          <v-list-item-action>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>สำหรับนักศึกษา</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/tlogin">
          <v-list-item-action>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>สำหรับอาจารย์</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Project Registration System</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
       <v-container row>
            <h4 class="display-1">ประกาศข่าว</h4>
            <v-spacer></v-spacer>
            <router-link link to='allNotice'>ดูประกาศข่าวทั้งหมด</router-link>
        </v-container>
        <v-container dense v-for="(message, i) in notices" :key="i">
            <v-card class="mx-auto" max-width="80%" > <!-- color="#ffe4c4" -->
                <v-responsive>
                    <v-card-title>{{message.title}}</v-card-title>
                    <v-card-text>
                        &emsp;&emsp;{{message.information}}
                    </v-card-text>
                    <v-layout justify-end wrap>
                        <v-flex xs12 sm4 text-center>
                            <v-card-text v-text="message.date"></v-card-text>
                        </v-flex>
                        <!-- <v-flex xs12 sm2 text-center>
                            <v-card-text>01-01-0001</v-card-text>
                        </v-flex> -->
                    </v-layout>       
                </v-responsive>
            </v-card>
        </v-container>
      </v-container>
    </v-content>
  </v-app>
</template>

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
            console.log(snapshot.val());
        })
  },
};
</script>


