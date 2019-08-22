<template>
  <v-container>
    <v-container column>
      <h6 class="title">ข้อมูลปีการศึกษา {{ this.$store.getters.getSchoolYear }}</h6>
      <v-layout wrap align-center>
        <v-flex xs12 sm6 md4 d-flex>
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" outlined dark v-on="on" class="elevation-1">เลือกปีการศึกษา</v-btn>
            </template>
            <v-list>
              <v-list-item v-for="year in years" :key="year.id" @click="getYear(year.year)">
                <v-list-item-title>{{ year.year }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 sm6 md4 d-flex>
          <v-btn color="primary" class="mx-auto xs-auto" @click="resultRegister">จัดที่นักศึกษา</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-simple-table>
      <tbody>
        <tr>
          <td>นักศึกษา</td>
          <td>{{ register.studentCount }}</td>
        </tr>
        <tr>
          <td>อาจารย์</td>
          <td>{{ register.teacherCount }}</td>
        </tr>
        <tr>
          <td>นักศึกษาลงทะเบียน</td>
          <td>{{ register.studentReg }}</td>
        </tr>
        <tr>
          <td>อาจารย์ลงทะเบียน</td>
          <td>{{ register.teacherReg}}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      years: [],
      result: [],
      teacherRegister: [],
      studentRegister: [],
      students: [],
      teachers: [],
      register: {
        studentCount: 0,
        teacherCount: 0,
        studentReg: 0,
        teacherReg: 0
      }
    };
  },
  methods: {
    getYear: function(year) {
      this.$store.commit("setSchoolYear", year);
    },
    resultRegister: function() {
      /**
       * Very Difficult
       */
      // eslint-disable-next-line
      this.studentRegister.forEach(student => {
        let remainer = true;
        for (let i = 0; i < student.teacher.length; i++) {
          let teacher = this.teacherRegister.find(
            teacher => teacher.id === student.teacher[i]
          );
          if (teacher.remain !== 0) {
            this.result.push({
              student: student.id,
              teacher: teacher.id,
              gpax: student.gpax
            });
            // set remain decrease by 1
            teacher.remain--;
            break;
          } else if (i === student.teacher.length - 1) {
            remainer = false;
          }
        }

        // if every teacher seat remain = 0
        if (!remainer) {
          this.teacherRegister.sort((a, b) => {
            return a["seat"] - b["seat"];
          });
          this.result.push({
            student: student.id,
            teacher: this.teacherRegister[0].id,
            gpax: student.gpax
          });
          this.teacherRegister[0].seat++;
        }
      });

      firebase
        .database()
        .ref("result_register/" + this.$store.getters.getSchoolYear)
        .set({
          ...this.result
        });
    }
  },
  created() {
    this.$store.dispatch("settingYear", this.years);
    firebase
      .database()
      .ref("teacher_register/" + this.$store.getters.getSchoolYear)
      .on("child_added", snapshot => {
        this.teacherRegister.push({
          id: snapshot.key,
          ...snapshot.val()
        });
      });

    firebase
      .database()
      .ref("lecturer_register/" + this.$store.getters.getSchoolYear)
      .on("child_added", snapshot => {
        this.studentRegister.push({
          id: snapshot.key,
          ...snapshot.val()
        });
      });
    /*
     * multiple sort by GPAX and Date
     * GPAX greatest to least
     * Date before to after
     */
    this.studentRegister.sort((a, b) => {
      return b["gpax"] - a["gpax"] || a["date"] - b["date"];
    });
  },
  mounted() {
    this.$store.dispatch("settingStudent", this.students);
    this.$store.dispatch("settingTeacher", this.teachers);

    this.register.studentCount = this.students.length;
    this.register.teacherCount = this.teachers.length;
    this.register.studentReg = this.studentRegister.length
    this.register.teacherReg = this.teacherRegister.length
  }
};
</script>
