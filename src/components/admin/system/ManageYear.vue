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
    <!-- data table -->
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      years: [],
      result: [],
      // teacher register
      teacherRegister: [],
      // lecturer register
      studentRegister: [],
      teacherCount: []
    };
  },
  methods: {
    getYear: function(year) {
      this.$store.commit("setSchoolYear", year);
    },
    statisticRegister: function() {
      // get all teacher
      this.result.forEach(snapshot => {
        this.teacherCount.push(snapshot.teacher);
      });
      // unique teacher
      this.teacherCount = [...new Set(this.teacherCount)];
      for (let i = 0; i < this.teacherCount; i++) {
        let maxGpax = 0,
          minGpax = 4,
          count = 0,
          mean = 0,
          teacher = "";
        this.result.forEach(snapshot => {
          if (snapshot.teacher === this.teacherCount[i]) {
            teacher = snapshot.teacher;
            if (maxGpax < snapshot.gpax) {
              maxGpax = snapshot.gpax;
            }
            if (minGpax > snapshot.gpax) {
              minGpax = snapshot.gpax;
            }
            mean += snapshot.gpax;
            count++;
          }
        });
        mean = mean / count;
        firebase
          .database()
          .ref("statistic/" + this.$store.getters.getSchoolYear + "/" + teacher)
          .set({
            register: count,
            max: maxGpax,
            min: minGpax,
            mean: mean
          });

        // *****************************************************************************
        
      }
    },
    resultRegister: function() {
      /**
       * Very Difficult
       */
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

      // finished and
      //  store statistic
      this.statisticRegister;
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
  }
};
</script>
