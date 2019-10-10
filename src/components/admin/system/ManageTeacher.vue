<template>
  <v-app>
    <v-container>
      <h6 class="title">จัดการอาจารย์ที่ปรึกษา {{ this.$store.getters.getSchoolYear }}</h6>
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <v-list-item-title justify-space-around align-baseline>
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  outlined
                  dark
                  v-on="on"
                  class="elevation-1 ml-3"
                >เลือกปีการศึกษา</v-btn>
              </template>
              <v-list>
                <v-list-item v-for="year in years" :key="year.id" @click="getYear(year.year)">
                  <v-list-item-title>{{ year.year }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-combobox :items="teachers" v-model="teacher" label="อาจารย์ที่ปรึกษา"></v-combobox>
            <v-text-field type="number" v-model="seat" label="จำนวนที่นั่ง"></v-text-field>
          </v-list-item-title>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="setSeat">จัดที่นั่ง</v-btn>
        </v-card-actions>
      </v-card>
      <h6 class="title">เพิ่ม - ลด อาจารย์ที่ปรึกษา</h6>
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="คำนำหน้า" required v-model="formTeacher.prefix"></v-text-field>
              <v-text-field label="ชื่อ" required v-model="formTeacher.firstname"></v-text-field>
              <v-text-field label="สกุล" required v-model="formTeacher.lastname"></v-text-field>
              <v-btn color="primary" @click="addTeacher">เพิ่ม</v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="username" required v-model="formTeacher.username"></v-text-field>
              <v-text-field label="password" required type="password" v-model="formTeacher.password"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-combobox :items="teachers" v-model="delTeacher" label="อาจารย์ที่ปรึกษา"></v-combobox>
              <v-btn color="error" @click="deleteTeacher">ลบ</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-data-table :items="teachers" :headers="headers"></v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-snackbar v-model="snackbar">
        {{ message }}
        <v-btn text @click="snackbar = false">ปิด</v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    teachers: [],
    years: [],
    seat: null,
    teacher: null,
    snackbar: false,
    message: "",
    headers: [
      {
        text: 'อาจารย์ที่ปรึกษา',
        value: 'text'
      }
    ],
    delTeacher: null,
    formTeacher: {
      prefix: null,
      firstname: null,
      lastname: null,
      username: null,
      password: null
    }
  }),
  created() {
    this.$store.dispatch("settingTeacher", this.teachers);
    this.$store.dispatch("settingYear", this.years);

    firebase.database().ref('teacher').on('child_removed', snapshot => {
      const del = this.teachers.find(teach => teach.value === snapshot.key)
      const index = this.teachers.indexOf(del)
      this.teachers.splice(index, 1)
    })
  },
  methods: {
    getYear: function(year) {
      this.$store.commit("setSchoolYear", year);
    },
    setSeat: function() {
      firebase
        .database()
        .ref(
          "teacher_register/" +
            this.$store.getters.getSchoolYear +
            "/" +
            this.teacher.value
        )
        .set({
          seat: this.seat,
          remain: this.seat
        })
        .then(() => {
          this.message = "จัดที่นั่งแล้ว";
          this.snackbar = !this.snackbar;
        });
    },
    addTeacher: async function() {
      await firebase.database().ref('teacher/' + this.formTeacher.username).set({
        firstname: this.formTeacher.firstname,
        lastname: this.formTeacher.lastname,
        prefix: this.formTeacher.prefix
      })
      await firebase.database().ref('teacher_login/' + this.formTeacher.username).set({
        username: this.formTeacher.username,
        password: this.formTeacher.password
      })
      this.message = 'เพิ่มข้อมูลอาจารย์ที่ปรึกษาแล้ว'
      this.snackbar = !this.snackbar
    },
    deleteTeacher: async function () {
      await firebase.database().ref('teacher').child(this.delTeacher.value).remove()
      await firebase.database().ref('teacher_login').child(this.delTeacher.value).remove()
      await firebase.database().ref('teacher_profile').child(this.delTeacher.value).remove()
      this.message = "ลบข้อมูลอาจารย์ที่ปรึกษาแล้ว"
      this.snackbar = !this.snackbar
    }
  }
};
</script>