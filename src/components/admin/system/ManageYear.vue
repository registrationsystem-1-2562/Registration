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
          <v-btn color="primary" class="mx-auto xs-auto">จัดที่นักศึกษา</v-btn>
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
export default {
  data() {
    return {
      years: [],
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
      this.$store.commit('setSchoolYear', year)
    }
  },
  created() {
    this.$store.dispatch('settingYear', this.years)
  }
};
</script>
