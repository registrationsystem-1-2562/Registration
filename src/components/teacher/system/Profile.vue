<template>
  <v-container>
    <v-card class="elevation-3 mx-auto" max-width="510">
      <v-card-title>โปรไฟล์</v-card-title>
      <v-card-text>
        <v-layout column wrap align-start>
          <v-flex xs12 sm6 >
            <v-img :src="profile.image"></v-img>
            <h6 class="title">ความเชี่ยวชาญ</h6>
            <v-list dense v-for="(pro, i) in profile.professional" :key="i">
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-checkbox-blank-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ pro }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <h6 class="title">หัวข้อโปรเจก</h6>
            <v-list dense v-for="(head, i) in profile.header" :key="i">
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-checkbox-blank-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ head }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
          <v-btn raised color="primary">แก้ไข</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      profiles: [],
      profile: {},
      user: this.$store.getters.getUser
    };
  },
  methods: {},
  created() {
    this.$store.dispatch("settingTeacherProfile", this.profiles);
    // eslint-disable-next-line
    console.log(this.profiles)
    this.profiles.forEach(value => {
        if (value.id === this.user) {
            this.profile = value
        }
    })
  }
};
</script>
