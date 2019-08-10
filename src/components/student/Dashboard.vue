<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list danse>
        <v-list-item link :to="routes.profile">
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ this.$store.getters.getUser }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link :to="routes.project">
          <v-list-item-action>
            <v-icon>mdi-account-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ผลการลงทะเบียน</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="routes.select">
          <v-list-item-action>
            <v-icon>mdi-account-search-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>เลือกอาจารย์ที่ปรึกษา</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="routes.teacher">
          <v-list-item-action>
            <v-icon>mdi-account-search</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ข้อมูลอาจารย์ที่ปรึกษา</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-container>
        <h6 class="title">ระบบ</h6>
      </v-container>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link replace to="/home">
          <v-list-item-action>
            <v-icon>mdi-account-off</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ออกจากระบบ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Project Registration System</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      routes: {
        project: "/student/ " + this.$store.getters.getUser + "/project",
        select: "/student/" + this.$store.getters.getUser + "/select",
        profile: "/student/" + this.$store.getters.getUser + "/profile",
        teacher: "/student/" + this.$store.getters.getUser + "/teacher"
      }
    };
  }
};
</script>


