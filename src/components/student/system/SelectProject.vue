<template>
  <v-container>
    <v-card max-width="510" class="mx-auto elevation-3">
      <v-card-title>เลือกอาจารย์ที่ปรึกษา</v-card-title>
      <v-card-text>
        <v-layout column>
          <v-flex>
            <v-select label="อันดับ 1" :items="teachers" v-model="first"></v-select>
            <v-select label="อันดับ 2" :items="teachers" v-model="second"></v-select>
            <v-select label="อันดับ 3" :items="teachers" v-model="third"></v-select>
            <v-select label="อันดับ 4" :items="teachers" v-model="forth"></v-select>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.prevent="notDuplicate">ยืนยันการเลือก</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="duplicateError" color="error">
      ยังไม่ได้เลือกหรือเลือกซ้ำ <v-btn text @click="duplicateError = false">ปิด</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      teachers: [],
      students: [],
      user: this.$store.getters.getUser,
      profile: {},
      first: null,
      second: null,
      third: null,
      forth: null,
      project: [],
      duplicateError: false
    };
  },
  methods: {
    // function validation of select lecturer non duplicate lecturer and non duplicate selected 
    notDuplicate: function () {
      this.project = [...new Set([this.first, this.second, this.third, this.forth])]
      if (this.project.length === 4) {
        firebase.database().ref('lecturer_register/' + 2560).set({
          teacher: this.project,
          student: this.user,
          gpax: this.profile.gpax,
          date: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() + ' '
          + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
        })
      }
      else {
        this.duplicateError = true
      }
    }
  },
  created() {
    this.$store.dispatch('settingStudent', this.students)
    this.$store.dispatch("settingTeacher", this.teachers);
    this.students.forEach(value => {
      if (value.id === this.user) {
        this.profile = {
          fullname: value.prefix + " " + value.firstname + " " + value.lastname,
          gpax: value.gpax,
          year: value.year,
          image: value.image
        };
        return;
      }
    })
  },
};
</script>
