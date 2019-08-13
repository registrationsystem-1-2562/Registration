<template>
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">ลงทะเบียน</v-btn>
    </template>
    <v-card>
      <v-card-title>ลงทะเบียน ปี {{ this.$store.getters.getSchoolYear }}</v-card-title>
      <v-card-text>
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
        <v-spacer></v-spacer>
        <v-text-field
          label="จำนวนที่นั่ง"
          hint="สามารถงดรับนักศึกษาได้โดยใส่เลข 0"
          v-model="register.seat"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn raised color="primary" @click.prevent="teacherRegister">ลงทะเบียน</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: ["dialog"],
  data() {
    return {
      years: [],
      register: {
        seat: 0,
        user: this.$store.getters.getUser,
        year: this.$store.getters.getSchoolYear
      }
    };
  },
  methods: {
    getYear: function(year) {
      this.$store.commit("setSchoolYear", year);
    },
    teacherRegister: function() {
      this.$store.dispatch("teacherRegister", this.register);
      this.dialog = !this.dialog;
    }
  },
  created() {
    this.$store.dispatch("settingYear", this.years);
  }
};
</script>