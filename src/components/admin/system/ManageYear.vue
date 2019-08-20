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
    <v-data-table
      hide-default-header
      hide-default-footer
      :headers="headers"
      :items="records"
      class="elevation-1"
      :items-per-page="7"
    ></v-data-table>
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
      headers: [
        {
          text: "data",
          value: "data"
        },
        {
          text: "count",
          value: "count"
        }
      ],
      records: [
        {
          data: "นักศึกษา",
          count: 154
        },
        {
          data: "อาจารย์",
          count: 11
        },
        {
          data: "นักศึกษาลงทะเบียนแล้ว",
          count: 3
        },
        {
          data: "อาจารย์ลงทะเบียนแล้ว",
          count: 4
        },
        {
          data: "ยังไม่ลงทะเบียน",
          count: 151
        },
        {
          data: "จำนวนที่รับนักศึกษา",
          count: 100
        },
        {
          data: "ที่ว่างสำหรับลงทะเบียน",
          count: 100
        }
      ]
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
          let teacher = this.teacherRegister.find(teacher => 
            teacher.id === student.teacher[i]
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
          }
          else if (i === student.teacher.length - 1) {
            remainer = false;
          }
        }

        // if every teacher seat remain = 0
        if (!remainer) {
          this.teacherRegister.sort((a, b) => {
            return a['seat'] - b['seat']
          })
          this.result.push({
            student: student.id,
            teacher: this.teacherRegister[0].id,
            gpax: student.gpax
          })
          this.teacherRegister[0].seat++
        }
      });

      firebase.database().ref('result_register/' + this.$store.getters.getSchoolYear).set({
        ...this.result
      })
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
    /* eslint-disable */ 
    console.log(this.studentRegister)
    console.log(this.teacherRegister)
  }
};
</script>
